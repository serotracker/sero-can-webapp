# Sero-can-webapp

Code for [Serotracker.com](https://serotracker.com/).

# Table of contents

- [Sero-can-webapp](#sero-can-webapp)
- [Table of contents](#table-of-contents)
- [Set up](#set-up)
	- [Installing Node & NPM](#installing-node--npm)
		- [Mac OS / Linux / WSL](#mac-os--linux--wsl)
		- [Windows](#windows)
	- [Local Development Setup](#local-development-setup)
		- [Setting up the Application](#setting-up-the-application)
		- [Running the Application Locally](#running-the-application-locally)
			- [Alternative 1: Using the Terminal](#alternative-1-using-the-terminal)
			- [Alternative 2: Using VS Code Configurations](#alternative-2-using-vs-code-configurations)
- [Github Pages/Heroku Deployment](#github-pagesheroku-deployment)
	- [Adding Secrets](#adding-secrets)
		- [GitHub](#github)
		- [Heroku](#heroku)
	- [Staging Deployment](#staging-deployment)
- [Continuous Integration](#continuous-integration)

# Set up
## Installing Node & NPM 

### Mac OS / Linux / WSL
We recommend using Node Version Manager ([nvm](https://github.com/nvm-sh/nvm)), which is a command line tool that allows you to quickly install, use and switch between different versions of node. If you're using a bash shell (default shell for Mac OS), simply execute the following steps:

1. Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash` 
2. Check that `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm` has been written into your `~/.bash_profile`, if not then add it in.
3. Restart your terminal or run `source ~/.bash_profile` 
4. Check that nvm has been installed properly by running `nvm -v`. If successful, this command should output the version of nvm that you've just installed.
5. Run `nvm install 12.16.0` to install the version of node that's compatible with this project
6. Run `node -v`, ensure that the output indicates that you're running node version 12.16.0

For zsh users, step 1 becomes `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | zsh` and use `~/.zshrc` instead of `~/.bash_profile` everywhere.

### Windows
We recommend using nvm-windows. Please see the (linked guide)[https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows] for detailed instructions.

## Local Development Setup 

### Setting up the Application
1. Clone the sero-can-webapp repo by running `git clone https://github.com/serotracker/sero-can-webapp.git`
2. Navigate to the root directory of sero-can-webapp
3. Install project dependencies via `npm install`. Note, this only needs to be run  when you initially setup the repository and when packages are updated/added/removed.

### Running the Application Locally
#### Alternative 1: Using the Terminal
1. Set the following environment variables: `REACT_APP_ROUTE`, `REACT_APP_MAPBOX_API_KEY`. Ask a member of the dev team for these values. Read the following guides for instructions on how to set environment variables on (MacOS / Linux / WSL)[https://blog.doppler.com/how-to-set-environment-variables-in-linux-and-mac#how-to-change-and-set-environment-variables] and on (Windows)[https://phoenixnap.com/kb/windows-set-environment-variable] 
2. Run the application locally via `npm start`. This should cause the app to open in a browser window at `http://localhost:3000`

#### Alternative 2: Using VS Code Configurations
1. Open the repo in VS Code
2. Create a folder in the root directory of this repo called `.vscode`
3. Create a `launch.json` file within that folder and paste the following into it
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
4. Simply click on the green triangle button highlighted in the image below to run the application

![image](https://user-images.githubusercontent.com/21212898/153516550-f3531027-4400-4fc1-952a-dccc997b0b8d.png)

# Github Pages/Heroku Deployment
Deployment of static assets for the application occurs as follows:
- Each push to `master` triggers a deployment to GitHub Pages. The GH action used is: `JamesIves/github-pages-deploy-action@releases/v3`
- Each push to `staging-1`, `staging-2`, and `staging-3` triggers a deployment to Heroku. The GH action used is: `akhileshns/heroku-deploy@v3.0.4`

The full configurations can be viewed [here](.github/workflows).   

## Adding Secrets
### GitHub
Refer to [_creating encrypted secrets for a repository_](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
After adding secrets, they can be accessed in a deployment configuration in the following manner: `${{ secrets.<SECRET_NAME> }}`.
For example, see how the Mapbox API key is referenced [here](https://github.com/serotracker/sero-can-webapp/blob/master/.github/workflows/deploy-gh-pages.yml#L25).

### Heroku
Secrets are added via the Heroku Dashboard. Message Austin to get access to the account.  
Refer to this [article](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) to add secrets via the Dashboard.


## Staging Deployment  
As mentioned above, there are three staging instances. Their corresponding links are outlined in the table below.

| Instance  | Link                                        |
|-----------|---------------------------------------------|
| staging-1 | http://serotracker-staging-1.herokuapp.com  |
| staging-2 | http://serotracker-staging-2.herokuapp.com  |
| staging-3 | http://serotracker-staging-3.herokuapp.com  |


# Continuous Integration
The following commands with GitHub Actions:  
```
npm install
npm run build  

npm test
```  
The CI configuration can be viewed [here](https://github.com/serotracker/sero-can-webapp/blob/master/.github/workflows/ci.yml).  
Job results can be viewed [here](https://github.com/serotracker/sero-can-webapp/actions?query=workflow%3ACI).
