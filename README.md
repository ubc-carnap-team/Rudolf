# README

This project is built for use with the [Carnap](https://github.com/Carnap/Carnap) framework for teaching formal logic.

## Usage

To use this script in an html page, you must have already included the Carnap script which globally defines `Carnap` and `Carnap.checkIchikawaJenkinsSLTableau`.

Then, somewhere below the script tag which imports Carnap, you add the imports for this project's javascript bundle and stylesheet. This example uses the files which are available on unpkg.

```html
<script
  crossorigin
  src="https://unpkg.com/truth-tree/dist/lib.js"
  type="application/javascript"
></script>
<link rel="stylesheet" href="https://unpkg.com/truth-tree/dist/lib.css" />
```

Suppose we want to set up an exercise for a widget initialized with the
initial formula set needed to prove "modus tollens". I'll put a div here
which has the id "element-one", and then in a script tag, I'll call `Rudolf.createTree` with the appropriate arguments.
The complete code needed to insert a truth-tree widget is, in full:

```html
<div id="element-one">Widget one goes here.</div>
<script>
  ;<code type>Rudolf.createTree('element-one', "P->Q,~Q,~~P")</code>
</script>
```

We can do this multiple times on the same page as long as we use a different id each time.

```html
<div id="element-two">Widget two goes here.</div>
<script>
  Rudolf.createTree('element-two', 'F\\/G,~G\\/H,~F,H->G')
</script>
```

## Development Environment Setup

- Install `yarn` 1.x [following the installation documentation](https://classic.yarnpkg.com/en/docs/install).

- Install the project's dependencies with `yarn install`.

You can now run a development server with `yarn start`, which will automatically start a browser and open the app. It is also accessible by going to [http://localhost:3000/Rudolf](http://localhost:3000/Rudolf).

### Run the Demo Page in Development Mode

```sh
yarn start
```

**(from `react-scripts`)**
Runs the demo page in development mode.
Open [http://localhost:3000/Rudolf](http://localhost:3000/Rudolf) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Deploy demo to Github Pages

```sh
yarn deploy
```

**_This uses the built-in build script from Create React App, which has been moved from `build` to `build-demo`. It is now only used for packaging up the demo page for `gh-pages` deployment._**

## Deploy library script to NPM and UNPKG

If you have publish access on NPM, you can publish the module. (This is separate from contributor access to this github repo.)

```sh
yarn publish
```

### Run Tests

```sh
yarn test
```

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Acknowledgements

Rudolf has been developed under the auspices of the Department of Philosophy at the University of British Columbia.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Some of the available commands come from that scaffold.
