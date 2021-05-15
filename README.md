
## [Serotracker.com](https://serotracker.com/)

### Getting Started

#### Required Software
| Name | Version |  Link |  Description |
|--|--|--|--|
| Node | v12.16.0 | https://nodejs.org/en/ | Open source server environment for javascript |
| NPM | 6.13.4 | https://docs.npmjs.com/cli/v7/commands/npm-install | Software Package Manager |
| VS Code | 6.13.4 | https://code.visualstudio.com/ | Code IDE, not required but popular choice for this project |

#### Starting Application Locally
First, the following environment variables, `REACT_APP_MAPBOX_API_KEY` and `REACT_APP_ROUTE` must be set. Talk to a team member to get the keys.

Second, install npm packages:
```bash
npm install
```
*Note: This needs to be run when you initially setup the repository and when packages are updated/added/removed.*

Third, to start the local server, use:
```bash
npm start
```
The app should then open in a browser window as `http://localhost:3000`

### VS  Code Startup Configurations
We can set launch configurations in VS Code for an improved development experience. This allows us to set breakpoints directly in the editor, and launch the app from the debug tab in VS Code. Multiple configurations can be added. Here is an example that launches the app with the Chrome browser:
```
{
"version": "0.2.0",
"configurations": [
	{
		"type": "pwa-chrome",
		"request": "launch",
		"name": "Launch Chrome against localhost",
		"url": "http://localhost:3000",
		"webRoot": "${workspaceFolder}",
		"env": {
		"REACT_APP_ROUTE": "KEY",
		"REACT_APP_MAPBOX_API_KEY": "KEY"
		}
	}]
}
```

### Github Pages/Heroku Deployment
Deployment of static assets for the application occurs as follows:
- Each push to `master` triggers a deployment to GitHub Pages. The GH action used is: `JamesIves/github-pages-deploy-action@releases/v3`
- Each push to `staging-1`, `staging-2`, and `staging-3` triggers a deployment to Heroku. The GH action used is: `akhileshns/heroku-deploy@v3.0.4`

The full configurations can be viewed [here](.github/workflows).   

#### Adding Secrets
Refer to [_creating encrypted secrets for a repository_](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
After adding secrets, they can be accessed in a deployment configuration in the following manner: `${{ secrets.<SECRET_NAME> }}`. 
For example, see how the Mapbox API key is referenced [here](https://github.com/serotracker/sero-can-webapp/blob/master/.github/workflows/deploy-gh-pages.yml#L25).

#### Staging Deployment  
As mentioned above, there are three staging instances. Their corresponding links are outlined in the table below.

| Instance  | Link                                        |
|-----------|---------------------------------------------|
| staging-1 | http://serotracker-staging-1.herokuapp.com  |
| staging-2 | http://serotracker-staging-2.herokuapp.com  |
| staging-3 | http://serotracker-staging-3.herokuapp.com  |


### Continuous Integration
The following commands with GitHub Actions:  
```
npm install
npm run build  

npm test
```  
The CI configuration can be viewed [here](https://github.com/serotracker/sero-can-webapp/blob/master/.github/workflows/ci.yml).  
Job results can be viewed [here](https://github.com/serotracker/sero-can-webapp/actions?query=workflow%3ACI).  
  
___
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.