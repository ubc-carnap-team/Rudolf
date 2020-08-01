(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{73:function(e,t,n){e.exports=n(88)},75:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);n(74),n(75);var r=n(0),a=n.n(r),o=n(7),i=n.n(o),c=n(54),l=n(19),u=n(14),s=n(113),d=n(114),f=n(115),m=n(57),p=n(58),h=n(66),v=n(65),b=n(46),w=n(59),g=function(e){var t=e.formulas,n=void 0===t?[]:t,r=e.forest;return{nodeType:"formulas",formulas:n,forest:void 0===r?[]:r,id:e.id}},y=function e(t,n){"contradiction"!==t.nodeType&&("finished"!==t.nodeType?0===t.forest.length?t.forest=n(t.id):t.forest.forEach((function(t){return e(t,n)})):console.warn("shouldn't try to append to finished branch"))},E=function(e){return g({formulas:e.map((function(e,t){return k(e,t+1)})),forest:[],id:""})},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return{value:e,resolved:!1,row:t}},j=function(e){return null!=e&&"formulas"===e.nodeType&&0===e.forest.length},x=function(e){return e.formulas[0].row},C=function(e,t){for(var n=[];e-- >0;)n.push(k("",t++));return n},O=function(e,t){var n,r=function(e){return e.split("").map((function(t){if("0"===t||"1"===t)return Number(t);throw new Error("invalid character in node id: ".concat(t," in ").concat(e))}))}(t),a=e,o=Object(w.a)(r);try{for(o.s();!(n=o.n()).done;){var i=n.value;if("formulas"!==a.nodeType)throw new Error("Failed to get node path");a=a.forest[i]}}catch(c){o.e(c)}finally{o.f()}return a},S=function(e){return"formulas"===e.nodeType},R=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"updateFormula",value:function(e,t,n){O(this.draftState.tree,e).formulas[t].value=n}},{key:"updateJustification",value:function(e,t){Object.assign(this.draftState.justifications[e],t)}},{key:"updateContradiction",value:function(e,t){Object.assign(O(this.draftState.tree,e),{contradictoryRows:t})}},{key:"updateFeedback",value:function(e){this.draftState.feedback=e}},{key:"toggleResolved",value:function(e,t){var n=O(this.draftState.tree,e);n.formulas[t].resolved=!n.formulas[t].resolved}},{key:"createTree",value:function(e){this.draftState.tree=E(e),this.draftState.nextRow=e.length+1,this.draftState.justifications={}}},{key:"continueBranch",value:function(e,t){var n=this,r=O(this.draftState.tree,e);y(r,(function(e){return[g({id:"".concat(e,"0"),formulas:C(t,n.draftState.nextRow)})]})),this.draftState.justifications[this.draftState.nextRow]={rule:"",parentRow:""},this.draftState.nextRow+=t}},{key:"splitBranch",value:function(e,t){var n=this,r=O(this.draftState.tree,e);y(r,(function(e){var r=C(t,n.draftState.nextRow);return[g({id:"".concat(e,"0"),formulas:r}),g({id:"".concat(e,"1"),formulas:r})]})),this.draftState.justifications[this.draftState.nextRow]={rule:"",parentRow:""},this.draftState.nextRow+=t}},{key:"markContradiction",value:function(e){var t,n=O(this.draftState.tree,e);n.forest=[(t=n.id,{nodeType:"contradiction",formulas:[],contradictoryRows:"",id:"".concat(t,"0")})]}},{key:"markFinished",value:function(e){var t;O(this.draftState.tree,e).forest=[(t=e,{nodeType:"finished",formulas:[],id:"".concat(t,"0")})]}},{key:"reopenBranch",value:function(e){O(this.draftState.tree,e).forest=[]}}]),n}(b.ImmerReducer),T="P->Q,P,~Q".split(","),N={tree:E(T),nextRow:T.length+1,justifications:{},feedback:{errorMessage:"Nothing yet."}},B=Object(b.createReducerFunction)(R),P=Object(b.createActionCreators)(R),I=P.continueBranch,A=P.createTree,D=P.markContradiction,M=P.markFinished,z=P.reopenBranch,F=P.splitBranch,J=P.toggleResolved,Q=P.updateContradiction,G=P.updateFeedback,V=P.updateFormula,L=P.updateJustification,W=n(51),U=n(108),q=n(29),H=Object(q.a)({Bounder:{minWidth:"100%",position:"fixed",bottom:0,display:"flex",flexDirection:"column",zIndex:10},TextArea:{overflow:"hidden scroll",fontSize:"16px"},Toggle:{backgroundColor:"black",color:"white",fontSize:"13px",alignSelf:"flex-end","&:hover":{cursor:"pointer"},padding:"2px 10px"}}),X=n(45),$=n(36),K=n.n($),Y=n(53),Z=function e(t,n){var r=t.formulas,a=t.forest,o=t.id,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],c=i.concat(r);if(0===a.length)return{label:re(c),rule:"",forest:[],id:o};var s=Object(u.a)(a,1),d=s[0];if("formulas"===d.nodeType){var f=n[x(d)],m=f.rule,p=Number(f.parentRow);if(!ae(p))throw new Error('Cited row must be a positive integer. Got "'.concat(p,'"'));if(p>=x(d))throw new Error("Row cited (".concat(p,") must be less than current row (").concat(x(d),")."));return{label:re(c),rule:"St",forest:[{label:ne(c,p),rule:m,id:o,forest:a.map((function(t){return e(t,n,c.filter((function(e){return!(e.row===p)})))}))}]}}if("contradiction"===d.nodeType){var h=d.contradictoryRows.split(",").map(Number),v=Object(u.a)(h,2),b=v[0],w=v[1];if(![b,w].every(ae))throw new Error('Contradiction must cite 2 rows, separated by a comma. Got "'.concat(d.contradictoryRows,'"'));var g=c.filter((function(e){return[b,w].includes(e.row)})).sort((function(e,t){return t.value.length-e.value.length})),y=Object(u.a)(g,2),E=y[0],k=y[1];if(!E||!k)throw new Error("Contradiction cites non-existent row");var j=re([E].concat(Object(l.a)(c.filter((function(e){return![b,w].includes(e.row)}))),[k]));return{label:re(c),rule:"St",id:o,forest:[{label:j,rule:"Ax",id:d.id,forest:[{label:"",rule:"",forest:[]}]}]}}if("finished"===d.nodeType)return{label:re(c),rule:"St",id:o,forest:[{label:re(c),rule:"Lit",id:d.id,forest:[{label:"",rule:"",forest:[]}]}]};throw new Error("this was supposed to be exhaustive")},_=function(e,t){var n={};if(e.forest.length){!function e(t,r,a){if("string"===typeof t.id){if("Ax"===t.rule||"Lit"===t.rule)return void(n[t.id]=oe(r));n[t.id]=a,t.forest.forEach((function(t,n){e(t,r.forest[n],oe(r))}))}else t.forest.forEach((function(t,n){e(t,r.forest[n],a)}))}(e,t,{class:"correct",info:"Assumptions"})}return n},ee=function(){var e=Object(Y.a)(K.a.mark((function e(t){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){try{Carnap.checkIchikawaJenkinsSLTableau(t,(function(t){e(t)}))}catch(r){n(r)}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(Y.a)(K.a.mark((function e(t,n){var r,a;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Z(t,n),e.next=3,ee(r);case 3:return a=e.sent,e.abrupt("return",{sequent:r,feedback:_(r,a)});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ne=function(e,t){var n=e.findIndex((function(e){return e.row===t})),r=e[n],a=e.slice(0,n).concat(e.slice(n+1)),o=[].concat(Object(l.a)(a),[r]);return re(o)},re=function(e){return e.map((function(e){return e.value})).join(",").concat(":|-:")},ae=function(e){return e>0},oe=function(e){e.forest;return Object(X.a)(e,["forest"])},ie=function(e){var t=e.tree,n=e.justifications,o=e.feedback,i=e.dispatch;Object(r.useEffect)((function(){window.Carnap&&te(t,n).then((function(e){var t=e.sequent,n=e.feedback;return i(G({feedback:n,sequent:t}))})).catch((function(e){var t=e.message;return i(G({errorMessage:t}))}))}),[i,n,t]);var c=H(),l=Object(r.useState)(!1),s=Object(u.a)(l,2),d=s[0],f=s[1];return a.a.createElement("div",{className:c.Bounder},a.a.createElement("div",{className:c.Toggle,onClick:function(){f(!d)}},d?"close":"open"),a.a.createElement(U.a,{className:c.TextArea,value:JSON.stringify({tree:t,justifications:n,feedback:o}),style:{maxHeight:d?"50vh":"0vh"}}))},ce=n(41),le=n.n(ce),ue=function(e){var t=e.onSubmit,n=e.premises,r=e.setPremises;return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t(n)}},a.a.createElement(le.a,{type:"text",name:"premises","aria-label":"Enter Premises",value:n,onChange:function(e){return r(e.target.value)}}),a.a.createElement("button",{className:"submit-premises",type:"submit"},"Declare Premises"))},se=[["P->Q,P,~Q","Modus Ponens"],["~(~(P\\/Q)<->(~P/\\~Q))","De Morgen's Law"]],de=function(e){var t=e.onChange;return a.a.createElement("label",null,"Example premise:",a.a.createElement("select",{onChange:function(e){var n=e.currentTarget.value;t(n)}},se.map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return(a.a.createElement("option",{value:n,key:n},r))}))))},fe=n(33),me=Object(q.a)({AppBounder:{background:"#ffffff",textAlign:"center",color:"black",fontSize:"calc(10px + 2vmin)",width:"100vw",height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"},TopItemsBounder:{display:"flex",flexDirection:"column",alignItems:"center"},TreeBounder:{display:"flex",flexDirection:"column",alignItems:"center",width:"80vw",height:"70vh",position:"absolute",borderColor:"black",borderStyle:"solid",overflow:"scroll","&::-webkit-scrollbar":{height:"6px",width:"6px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"black"}},Tree:{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",left:"50%",transform:"translate(max(-50%, -40vw), 0px)"}}),pe=n(117),he=n(112),ve=n(116),be=n(119),we=function(e){var t=e.open,n=e.dispatch,r=e.index,o=e.anchorEl,i=e.onClose,c=e.node,l=c.formulas[r];return a.a.createElement(ve.a,{open:t,anchorEl:o,onClose:i},a.a.createElement(be.a,{onClick:function(){n(I(c.id,1)),i()}},"Continue Branch w/ 1 formula"),a.a.createElement(be.a,{onClick:function(){n(F(c.id,1)),i()}},"Split Branch w/ 1 formula"),a.a.createElement(be.a,{onClick:function(){n(I(c.id,2)),i()}},"Continue Branch w/ 2 formulas"),a.a.createElement(be.a,{onClick:function(){n(F(c.id,2)),i()}},"Split Branch w/ 2 formulas"),a.a.createElement(be.a,{onClick:function(){n(J(c.id,r)),i()}},"Mark as ",l.resolved?"Un":"","Resolved"),j(c)&&a.a.createElement(be.a,{onClick:function(){n(D(c.id)),i()}},"Close Branch With Contradiction"),j(c)&&a.a.createElement(be.a,{onClick:function(){n(M(c.id)),i()}},"Mark Branch Finished"),"contradiction"===c.nodeType&&a.a.createElement(be.a,{onClick:function(){n(z(c.id)),i()}},"Reopen Branch"))},ge=Object(q.a)({NodeViewBaseContainer:{display:"grid",padding:"0.2em",gridTemplateColumns:"[rowNumber] auto [nodeView] auto [justification] auto",placeItems:"center",columnGap:"3vmin",rowGap:"3vmin"},RowNumber:{gridColumn:"rowNumber"},Justification:{gridColumn:"justification",display:"flex",alignSelf:"start"},NodeView:{display:"grid",textAlign:"center",columnGap:"3vmin",rowGap:"3vmin"}});var ye=function(e){var t=e.onChange,n=e.value,r=e.placeholder,o=e.style;return(a.a.createElement(le.a,{style:o,inputStyle:{padding:"0vmin .5vmin",backgroundColor:"transparent",borderStyle:"none"},onChange:t,value:n,placeholder:r}))},Ee=function(e){var t=e.index,n=e.dispatch,o=e.node,i=o.formulas[t],c=i.value,l=i.resolved,s=Object(r.useState)(!1),d=Object(u.a)(s,2),f=d[0],m=d[1],p=Object(r.useRef)(null);return a.a.createElement("div",{style:{height:"1.5em",marginBottom:"3vmin"},ref:p,onContextMenu:function(e){e.preventDefault(),m(!0)}},a.a.createElement(ye,{onChange:function(e){n(V(o.id,t,e.currentTarget.value))},value:c,placeholder:"formula"}),a.a.createElement(we,{open:f,onClose:function(){return m(!1)},dispatch:n,anchorEl:p.current,index:t,node:o}),l?a.a.createElement(he.a,null):"")},ke=function e(t){var n=t.node,r=t.dispatch,o=t.justifications,i=t.feedbackMap,c=t.nextRow,l=Object(X.a)(t,["node","dispatch","justifications","feedbackMap","nextRow"]),u=ge(),s="",d="";if(i){var f,m,p=null!==(f=i[n.id])&&void 0!==f?f:"";s=null!==(m=p.info)&&void 0!==m?m:"",d="correct"===p.class?"correct":"incorrect"}if(S(n)){var h=n.id,v=n.formulas,b=n.forest;return(a.a.createElement("div",{className:u.NodeView,style:{gridTemplateRows:"repeat(".concat(c-x(n),", ").concat("1.5em",")"),gridTemplateColumns:"repeat(".concat(b.length,", auto)")}},a.a.createElement("div",{style:{gridRow:"1",gridColumn:"1 / span ".concat(b.length)}},a.a.createElement(pe.a,{title:s,PopperProps:{style:{fontSize:16}}},a.a.createElement(fe.ArcherElement,{id:h,relations:b.map((function(e){return{targetId:e.id,targetAnchor:"top",sourceAnchor:"bottom"}}))},a.a.createElement("div",Object.assign({style:{borderStyle:i?"solid":"none",borderColor:"correct"===d?"green":"red",borderWidth:"1.5px"}},l),v.map((function(e,t){return a.a.createElement(Ee,Object.assign({key:"".concat(e,"-").concat(t),node:n,index:t,dispatch:r},e))})))))),b.map((function(t,l){return a.a.createElement("div",{key:t.id,style:{gridColumn:"".concat(l," / span 1"),gridRow:t.formulas[0]?"".concat(t.formulas[0].row-x(n)+1):2}},a.a.createElement(e,{node:t,dispatch:r,justifications:o,nextRow:c,feedbackMap:i}))}))))}if("contradiction"===n.nodeType)return a.a.createElement(pe.a,{title:s,PopperProps:{style:{fontSize:16}}},a.a.createElement(fe.ArcherElement,{id:n.id},a.a.createElement("div",Object.assign({className:"closed-branch-marker node ".concat(d)},l),"X",a.a.createElement(ye,{onChange:function(e){var t=e.currentTarget.value;return r(Q(n.id,t))},value:n.contradictoryRows,placeholder:"rows"}))));if("finished"===n.nodeType)return a.a.createElement(pe.a,{title:s,PopperProps:{style:{fontSize:16}}},a.a.createElement(fe.ArcherElement,{id:n.id},a.a.createElement("div",Object.assign({className:"finished-branch-marker ".concat(d)},l),"O"," ")));throw new Error("Invariant violation: Invalid nodeType on node: ".concat(JSON.stringify(n)))},je=function(e){var t=e.currentState,n=e.dispatch,r=ge(),o=t.nextRow,i=t.tree,c=t.justifications,u=t.feedback,s=function e(t,n){return t<n?[t].concat(Object(l.a)(e(t+1,n))):[]}(1,o);return a.a.createElement("div",{className:r.NodeViewBaseContainer,style:{gridTemplateRows:"repeat(".concat(o-1,", ").concat("1.5em",")")}},s.map((function(e){return a.a.createElement("div",{className:r.RowNumber,key:e,style:{gridRow:e}},"".concat(e,"."))})),a.a.createElement("div",{style:{gridColumn:"nodeView",gridRow:"1 / span ".concat(s.length)}},a.a.createElement(ke,{node:i,dispatch:n,justifications:c,feedbackMap:u.feedback,nextRow:o})),Object.keys(c).map((function(e){var t=Number(e),o=c[t],i=o.parentRow,l=o.rule;return a.a.createElement("div",{className:r.Justification,key:t,style:{gridRow:t}},a.a.createElement(ye,{style:{marginRight:".5vmin"},onChange:function(e){var r=e.currentTarget.value;return n(L(t,{parentRow:r}))},value:i,placeholder:"row"}),a.a.createElement(ye,{onChange:function(e){var r=e.currentTarget.value;return n(L(t,{rule:r}))},value:l,placeholder:"rule"}))})))},xe=function(){var e,t,n=Object(r.useState)("P->Q,P,~Q"),o=Object(u.a)(n,2),i=o[0],m=o[1],p=r.useReducer.apply(void 0,Object(l.a)((t=B,[function(e,n){var r=Object(u.a)(e,3),a=r[0],o=r[1],i=r[2];switch(n.type){case"UNDO":var c=Object(W.a)(a),s=c[0];return[c.slice(1),s,[o].concat(Object(l.a)(i))];case"REDO":var d=Object(W.a)(i),f=d[0],m=d.slice(1);return[[o].concat(Object(l.a)(a)),f,m];default:return[[o].concat(Object(l.a)(a)),t(o,n),[]]}},[[],N,[]]]))),h=Object(u.a)(p,2),v=Object(u.a)(h[0],3),b=v[0],w=v[1],g=v[2],y=h[1],E=function(e){m(e);var t=e.split(",");y(A(t))},k=me(),j=Object(r.useRef)(null);return a.a.createElement("main",{className:k.AppBounder},a.a.createElement("div",{className:k.TopItemsBounder,ref:j},a.a.createElement(de,{onChange:E}),a.a.createElement(ue,{premises:i,onSubmit:E,setPremises:m}),a.a.createElement("span",{className:"tree-buttons"},a.a.createElement(s.a,{"aria-label":"Undo",className:"undo-button",onClick:function(){y({type:"UNDO"})},disabled:!b.length},a.a.createElement(d.a,null)),a.a.createElement(s.a,{"aria-label":"Redo",className:"redo-button",onClick:function(){y({type:"REDO"})},disabled:!g.length},a.a.createElement(f.a,null)))),a.a.createElement("div",{className:k.TreeBounder,style:{top:null===(e=j.current)||void 0===e?void 0:e.offsetHeight,position:j.current?"absolute":"static"}},a.a.createElement("div",{className:k.Tree},a.a.createElement(fe.ArcherContainer,{arrowLength:0,style:{zIndex:1},svgContainerStyle:{zIndex:-1},strokeColor:"black",noCurves:!1},a.a.createElement(je,{currentState:w,dispatch:y})))),a.a.createElement(ie,Object(c.a)(Object(c.a)({},w),{},{dispatch:y})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(xe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[73,1,2]]]);
//# sourceMappingURL=main.f936d3eb.chunk.js.map