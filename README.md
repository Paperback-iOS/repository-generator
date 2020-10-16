# Paperback Source Generator
Creating a source repository for the [Paperback](https://paperback.moe) Manga iOS app doesn't need to be difficult. Paperback supports users creating their own sources, and seamlessly slotting it into the app without any updates required.

This generator helps take care of all the background overhead such as dependencies, github workflow actions, and templates out your first source!

## Usage
### Step 1: Installing Yeoman and the Paperback Generator
The source template system uses a [Yeoman Generator](https://yeoman.io/) to create your repository. First, you must install Yeoman as a NPM script

`npm install -g yo` 

After you have installed Yeoman, you then must install the paperback generator

`npm install -g generator-paperback-repository`

If you do not wish to install these globally, you may initialize a npm project, and install them as local packages. The following steps will work just as well.

### Step 2: Creating your Project
Create a directory which your repository is going to live in.

Inside of this directory, run the paperback generator you have downloaded in Step 1:

`npx yo paperback-repository`

The system will then ask you some questions about what your first source is going to be about. Fill all of these in to the best of your ability. 

![Choices](https://github.com/Paperback-iOS/Repository-Generator/blob/master/readme-content/yo-questions.PNG?raw=true)

### Step 3: Complete your Source

### Step 4: Setting up Source Publishing
Your project will be published through Github, and sent to the Paperback application through their service. After you make your first commit and push to your Github Repository, it will generate a `gh-pages` branch, provided that the bundle process from step 3 has not failed.

In Github, navigate to your Repository Settings, and scroll down to the bottom for the section labeled `GitHub Pages` 

Set this to publish your `gh-pages` branch. 

### Step 5: Adding your repository into Paperback
Provided there were no failures in the above steps, you can now load your repository into Paperback!

The repository URL is depenedent on your github username, but fits the format of:

`https://<github-username>.github.io/<repository-name>`

Meaning that if your username is 'Developer' and your repository name is 'Extensions' on Github, your link will be:

`https://developer.github.io/extensions`

To add this repository into your application, follow the below steps:

* Open up Paperback on your iOS device
* Navigate to the **Settings** tab of the Application
* Navigate to the **Sources** tab inside of Settings
* At the bottom of the page, specify the repository URL as described in this above step, and give it a name
* Tap "Add"

After this process has been completed, by tapping on the name you gave the repository, you should see your source!
