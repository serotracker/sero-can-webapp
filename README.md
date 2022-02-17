# Sero-can-webapp

Code for [Serotracker.com](https://serotracker.com/).

# Table of contents

- [Sero-can-webapp](#sero-can-webapp)
- [Table of contents](#table-of-contents)
- [Set up](#set-up)
  - [Installing Node & NPM](#installing-node--npm)
    - [macOS/ Linux / WSL](#macos-linux--wsl)
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

### macOS/ Linux / WSL
We recommend using Node Version Manager ([nvm](https://github.com/nvm-sh/nvm)), which is a command line tool that allows you to quickly install, use, and switch between different versions of node. Using your terminal, follow these instructions:

1. Install cURL (a tool used for downloading content from the internet in the command-line)

- macOS (homebrew) `brew install  curl`
- Ubuntu/WSL (apt) `sudo apt-get install curl`

2. Install NVM. The following command will download version 0.39.1 of nvm. Check nvm's [official GitHub projects page](https://github.com/nvm-sh/nvm) for the latest release of NVM.

- Bash: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
- Zsh: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | zsh`

3. To verify your installation, run `nvm -v`. You may need to source your shell's config file using `source ~/.bash_profile` or `source ~/.zshrc`
4. You can list which versions of Node are currently installed (should be none at this point) with `nvm ls`.
5. Install version 12.16.0 of Node.js using `nvm install 12.16.0`. You can also install the LTS release using `nvm install --lts` and the current release using `nvm install node`.
6. List what versions of Node are installed with `nvm ls`.
7.  You can specify which version of NVM you'd like to use by running `nvm use <VERSION>`. For this project, we want to use version 12.16.0, so run `nvm use v12.16.0`

### Windows
Node.js suffers from extreme performance issues on [native Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows), so we recommend installing it on Windows Subsystem for Linux (WSL). Using your WSL terminal, follow the steps outlined in the [macOS / Linux / WSL](#macos--linux--wsl) section. Once you've completed these steps, follow the *Install Visual Studio Code* section of [Microsoft's Official Guide to installing Node.js on WSL](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-visual-studio-code) to configure Visual Studio Code for working with WSL.

## Local Development Setup

### Setting up the Application
1. In your terminal, clone the sero-can-webapp repo by running `git clone https://github.com/serotracker/sero-can-webapp.git`
2. Navigate to the root directory of sero-can-webapp with `cd sero-can-webapp`
3. Install project dependencies with `npm install`. Note, this only needs to be run when you initially setup the repository and when packages are updated/added/removed.

### Running the Application Locally
#### Alternative 1: Using the Terminal
1. Set the following environment variables: `REACT_APP_ROUTE`, `REACT_APP_MAPBOX_API_KEY`. Ask a member of the dev team for these values. Read the following guides for instructions on how to set environment variables on [macOS / Linux / WSL](https://blog.doppler.com/how-to-set-environment-variables-in-linux-and-mac#how-to-change-and-set-environment-variables).
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
        "type": "node",
        "request": "launch",
        "name": "Run app pointing to prod",
        "runtimeVersion": "12.16.0",
        "runtimeExecutable": "npm",
        "runtimeArgs": ["start"],
        "port": 3000,
        "env": {
          "REACT_APP_ROUTE": "KEY",
          "REACT_APP_MAPBOX_API_KEY": "KEY"
        }
      }
    ]
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
Refer to [creating encrypted secrets for a repository](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
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
