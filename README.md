
## [Serotracker.com](https://serotracker.com/)

### Getting Started

#### Required Software
| Name | Version |  Link |  Description |
|--|--|--|--|
| Node | v12.16.0 | https://nodejs.org/en/ | Open source server environment for javascript |
| NPM | 6.13.4 | https://docs.npmjs.com/cli/v7/commands/npm-install | Software Package Manager |
| VS Code | 6.13.4 | https://code.visualstudio.com/ | Code IDE, not required but popular choice for this project |

#### Starting Application Locally
First, the the following environment variables, `REACT_APP_MAPBOX_API_KEY` and `REACT_APP_ROUTE` must be set. Talk to a team member to get the keys.

Then install Npm packages:
```bash
npm install
```
*Note: This needs to be run when you initially setup the repository and when packages are updated/added/removed.*

Finally, to start the local server, use:
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


### Github Pages Deployment

Deployment of static assets for the application occurs on each push to master. The full configuration can be viewed [here](.github/workflows/deploy-gh-pages.yml).

  

### Continuous Integration

The following commands with GitHub Actions:

```bash

npm install

npm run build

```

Job results can be viewed [here](https://github.com/serotracker/sero-can-webapp/actions?query=workflow%3ACI).