import {
  FeedbackMap,
  FeedbackNode,
  SequentNode,
  FeedbackMessage,
  CheckerFeedbackSuccess,
  Checker,
} from '../typings/Checker'
import { FormulaNode, JustificationMap, TreeForm } from '../typings/TreeState'
import { firstRow } from './nodes'

export const convertToSequent = (
  { formulas: newFormulas, forest, id }: FormulaNode,
  justifications: JustificationMap,
  previousFormulas: TreeForm[] = []
): SequentNode => {
  const formulas = previousFormulas.concat(newFormulas)
  if (forest.length === 0) {
    return { label: convertFormulas(formulas), rule: '', forest: [], id }
  } else {
    const [child] = forest
    if (child.nodeType === 'formulas') {
      const justification = justifications[firstRow(child)]
      const { rule } = justification
      const parentRow = Number(justification.parentRow)
      if (!validRow(parentRow)) {
        throw new Error(
          `Cited row must be a positive integer. Got "${parentRow}"`
        )
      }
      if (parentRow >= firstRow(child)) {
        throw new Error(
          `Row cited (${parentRow}) must be less than current row (${firstRow(
            child
          )}).`
        )
      }
      return {
        label: convertFormulas(formulas),
        rule: 'St',
        forest: [
          {
            label: rearrangeFormulas(formulas, parentRow),
            rule,
            id,
            forest: forest.map((node) =>
              convertToSequent(
                node as FormulaNode,
                justifications,
                formulas.filter((form) => !form.resolved)
              )
            ),
          },
        ],
      }
    } else if (child.nodeType === 'contradiction') {
      // We expect parentRow to be "<number>,<number>"
      const [row1, row2] = child.contradictoryRows.split(',').map(Number)
      if (![row1, row2].every(validRow)) {
        throw new Error(
          `Contradiction must cite 2 rows, separated by a comma. Got "${child.contradictoryRows}"`
        )
      }
      const [form1, form2] = formulas
        .filter((form) => [row1, row2].includes(form.row))
        // this sort is a hack to avoid parsing for negation symbol, which may vary
        .sort((a, b) => b.value.length - a.value.length)
      if (!(form1 && form2)) {
        throw new Error('Contradiction cites non-existent row')
      }
      const contradictionSequent: string = convertFormulas([
        ...formulas.filter((form) => ![row1, row2].includes(form.row)),
        form1,
        form2,
      ])
      return {
        label: convertFormulas(formulas),
        rule: 'St',
        id,
        forest: [
          {
            label: contradictionSequent,
            rule: 'Ax',
            id: child.id,
            forest: [{ label: '', rule: '', forest: [] }],
          },
        ],
      }
    } else if (child.nodeType === 'finished') {
      return {
        label: convertFormulas(formulas),
        rule: 'St',
        id,
        forest: [
          {
            label: convertFormulas(formulas),
            rule: 'Lit',
            id: child.id,
            forest: [
              {
                label: '',
                rule: '',
                forest: [],
              },
            ],
          },
        ],
      }
    } else {
      throw new Error('this was supposed to be exhaustive')
    }
  }
}

export const processFeedback = (
  sequentRoot: SequentNode,
  feedbackRoot: FeedbackNode
): FeedbackMap => {
  const feedbackMap: FeedbackMap = {}
  if (sequentRoot.forest.length) {
    // close over (mutable) feedback map for recursive calls
    const rec = (
      sequent: SequentNode,
      feedbackNode: FeedbackNode,
      parentFeedback: FeedbackMessage
    ): void => {
      // detect dummy nodes inserted to pad tree
      if (typeof sequent.id === 'string') {
        if (sequent.rule === 'Ax' || sequent.rule === 'Lit') {
          feedbackMap[sequent.id] = extractMessage(feedbackNode)
          return
        } else {
          feedbackMap[sequent.id] = parentFeedback
          sequent.forest.forEach((childSequent, idx) => {
            rec(
              childSequent,
              feedbackNode.forest[idx],
              extractMessage(feedbackNode)
            )
          })
        }
      } else {
        sequent.forest.forEach((childSequent, idx) => {
          rec(childSequent, feedbackNode.forest[idx], parentFeedback)
        })
      }
    }
    // recursive call
    rec(sequentRoot, feedbackRoot, {
      class: 'correct',
      info: 'Assumptions',
    })
  }
  return feedbackMap
}

// Promisified checker
const checkSequent = async (
  sequent: SequentNode,
  checker: Checker
): Promise<FeedbackNode> => {
  return new Promise((resolve, reject) => {
    try {
      checker(sequent, (result: FeedbackNode) => {
        resolve(result)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const checkTree = async (
  tree: FormulaNode,
  justifications: JustificationMap,
  checker: Checker
): Promise<CheckerFeedbackSuccess> => {
  const sequent = convertToSequent(tree, justifications)
  console.info(sequent)
  const feedback: FeedbackNode = await checkSequent(sequent, checker)
  return {
    success: true,
    feedback: processFeedback(sequent, feedback),
  }
}

const rearrangeFormulas = (
  forms: TreeForm[],
  mainFormulaRow: number
): string => {
  const idx = forms.findIndex((form) => form.row === mainFormulaRow)
  const mainFormula = forms[idx]
  const formulasWithoutMain = forms.slice(0, idx).concat(forms.slice(idx + 1))
  const newList = [...formulasWithoutMain, mainFormula]
  return convertFormulas(newList)
}

const convertFormulas = (forms: TreeForm[]) =>
  forms
    .map(({ value }) => value)
    .join(',')
    .concat(':|-:')

const validRow = (maybeRow: number): boolean => maybeRow > 0

// returns the non-recursive properties of the FeedbackNode
const extractMessage = ({
  forest,
  ...feedback
}: FeedbackNode): FeedbackMessage => translateFeedback(feedback)

const feedbackMessages: { [message: string]: string } = {
  'WRONG NUMBER OF PREMISES': 'Wrong number of branches.',
  "THIS DOESN'T FOLLOW BY THIS RULE": 'Incorrect use of resolution rule.',
}

const translateFeedback = (feedback: FeedbackMessage): FeedbackMessage => ({
  ...feedback,
  info: feedbackMessages[feedback.info.toLocaleUpperCase()] ?? feedback.info,
})
