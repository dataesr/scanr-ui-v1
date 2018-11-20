

## Steps to deploy React App on Github Pages with Circle CI

### Prerequisites
- Node and npm installed
- App created with [create-react-app](https://github.com/facebook/create-react-app)
- Git installed
- Github repository for your app

If you don't have a github repository yet, you can create one following the [github website](https://github.com/new) steps or in your terminal by running: 

```
#create a new git repository
$ git init
#add all changed file paths to staged changes
$ git add .
#commit all staged changes
$ git commit -m 'initial commit'
#add remote repository
$ git remote add origin https://github.com/{username}/{repo-name}.git
#pushed local repository to remote repository on GitHub
$ git push origin master
```
### Deploy your app on github Pages

1. Install gh-pages as a dev-dependency

 `npm install gh-pages --save-dev`
 
2. - In your `package.json` file, add a `homepage` property. Define its value to be the string `http://{username}.github.io/{repo-name}.`
  - In the existing scripts property, add a predeploy property and a deploy property, each having the values shown below:
```
"scripts": {
  //...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Generate a production build of your app, and deploy it to GitHub Pages by running :
```npm run deploy```

If you check your repository, you will notice that a second branch “gh-pages” is created. It contains the static code for the React app for the website. 

Finally, you can check the url [https://{username}.github.io/{repo-name}](https://{username}.github.io/{repo-name}) and make sure your website is exactly the same as in development mode !

Not the case ? These sections might help you
- [npm run build failed](#npm-run-build-failed)
- [Client routing broken in production](#Client-routing-broken-in-production)
- [styles not loaded](#styles-not-loaded)
- [images not imported correctly](#images-not-imported-correctly)

### Automate your deployment with CircleCI

Having your website so simply deployed on Github pages is great but running the deployment command in your terminal each time you change something in your app is pretty annoying. That's where CircleCI (or Travis) becomes usefull ! It will simply plug in your workflow and trigger a configurable set of commands, like testing, linting or building your app each time you commit on your master branch.

#### Set up our projet in CircleCI

1. sign up with github https://circleci.com/signup/
2. Create a directory called .circleci in the root directory of your local repository.
3. Go to circleCI dashboard and add set up your project https://circleci.com/add-projects/gh/{github-username}. 
4. Copy the sample.yml file in a config.yml file in your .circleci directory. Adjust the node version to suit your need.
5. Add the file, commit and push to branch master.If you go back to CircleCI dashboard, you should that see a new job is triggered

Now we have something running everytime we push on master, but we are still not deploying our app. The naive way would be to simple add a new step in config.yml file with `npm run deploy` command, since that's how it worked locally. But cirlceCI is not able to make git command on our behalf. 

#### Add variables to Circle CI

First thing we need to do is to add our Github information. 
1. In CircleCI project settings, click on `Add variables` and add following variables : 

```
- GH_EMAIL #your github email
- GH_NAME #your github username
```
2. Add the following step in `config.yml`:

```
run:
    name: Deploy
    command: |
      git config --global user.email $GH_EMAIL
      git config --global user.name $GH_NAME
      npm run deploy
```

If you commit and push your changes, you will get another error, specifying that the key you're registered with is a readOnly... Hence we need to create a new key, add it to Github with read & write access and add it as well in CircleCI

#### Create a ssh key

You probably already have an ssh key but you might want to create another one to these specific purpose. 

1. Paste text below to generate a new ssh key:

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
`
2. When you're prompted to "Enter a file in which to save the key," change the location, otherwise your previous ssh key would be overwritten
 Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Change location]

3. At the prompt, press enter (**DO NOT** set a passphrase)

`Enter passphrase (empty for no passphrase): [Press enter]`

#### Add your public key in github

1. Go to https://github.com/you/{repo-name}/settings/keys
2. Click on `Add deploy key`. 
3. Enter a title in the `Title` field
4. Paste the public key you created  Check “Allow write access”
5. Click “Add key”.

#### Add your private key in circleCI

1. Go to https://circleci.com/gh/you/test-repo/edit#ssh, 
2. In the “Hostname” field, enter “github.com”
3. Add the private key (make sure to copy header and footer as well)
4. Press the submit button.
5. Copy the fingerprint on the screen
6. in `config.yml` add following lines before the deployment command by adjusting to your own fingerprint :

```
- add_ssh_keys:
    fingerprints:
      - "YO:UR:FI:NG:ER:PR:IN:T"
```

Now you have a continous deployment integrated with your Github repository !

### Deployment issues

#### npm run build failed

I first got the error 'Cannot read property 'thisCompilation' of undefined' which was a problem of incompatible webpack versions. The following steps resolved the error : 
1. remove webpack from package.json
2. delete node_modules and package-lock.json
3. install earlier webpack version : `npm install webpack@3.11.0`
4. You might need to install other packages when trying to run build or start command. And eventually it should work.

#### Client routing broken in production

Your routing can be broken because you have your repo-name as a basename url. If you're using react router you can pass as a props a basename in BrowserRouter: 

`<BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL} />`

You should be able to create easily environement variable in a .env file if you created your project with create-react-app. Note that the variable name has to start with 'REACT_APP_'.
If it's not working, you can checkout dotenv package to add your own environement variable, it's not very complicated.

Note: Changing any environment variables will require you to restart the development server if it is running.


#### styles not loaded

If you have enabled modules, make sure your config in env and prod mode are pretty similar. If you scss file, you need to have sccs loader as well and process all the file .scss.
You can debug through chrome console by checking directly the source code and see if your css or scss file are properly loaded as static resources.

#### problem with logo url

I had a logo image rendered through a relative url and it didn't work in production, so I switched and imported it as a webpack module to solve the problem

```
import Logo from './logo.svg';
...
<img src={Logo} alt="logo" />
```