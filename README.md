
## [Serotracker.com](https://serotracker.com/)

### Prerequisites

#### Required Software
| Name | Version |  Link |  Description |
|--|--|--|--|
| Node | v12.16.0 | https://nodejs.org/en/ | Open source server environment for javascript |
| NPM | 6.13.4 | https://docs.npmjs.com/cli/v7/commands/npm-install | Software Package Manager |
| VS Code | 6.13.4 | https://code.visualstudio.com/ | Code IDE, not required but popular choice for this project |

#### Installing Node & NPM 

We recommend using Node Version Manager (nvm), which is a command line tool that allows you to quickly install, use and switch between different versions of node. If you're using a bash shell (default shell for Mac OS), simply execute the following steps:

1. Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash` 
2. Check that `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm` has been written into your `~/.bash_profile`, if not then add it in.
3. Restart your terminal or run `source ~/.bash_profile` 
4. Check that nvm has been installed properly by running `nvm -v`. If successful, this command should output the version of nvm that you've just installed.
5. Run `nvm install 12.16.0` to install the version of node that's compatible with this project
6. Run `node -v`, ensure that the output indicates that you're running node version 12.16.0

### Local Development Setup 

#### Starting Application Locally

1. Clone the sero-can-webapp repo
2. Navigate to the root directory of sero-can-webapp
3. Install project dependencies via `npm install`. Note, this only needs to be run  when you initially setup the repository and when packages are updated/added/removed.
4. Set the following environment variables: `REACT_APP_ROUTE`, `REACT_APP_MAPBOX_API_KEY`. Ask a member of the dev team for these values.
5. Run the application locally via `npm start`. This should cause the app to open in a browser window at `http://localhost:3000`

#### VS Code Startup Configurations
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
##### GitHub
Refer to [_creating encrypted secrets for a repository_](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
After adding secrets, they can be accessed in a deployment configuration in the following manner: `${{ secrets.<SECRET_NAME> }}`.
For example, see how the Mapbox API key is referenced [here](https://github.com/serotracker/sero-can-webapp/blob/master/.github/workflows/deploy-gh-pages.yml#L25).

##### Heroku
Secrets are added via the Heroku Dashboard. Message Austin to get access to the account.  
Refer to this [article](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) to add secrets via the Dashboard.


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
