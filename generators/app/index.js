var Generator = require('yeoman-generator')
var fs = require('fs')
var path = require('path')

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "The name for your paperback repository"
            },
            {
                type: "input",
                name: "sourceName",
                message: "What is the title of your first source?"
            },
            {
                type: "input",
                name: "sourceBasePath",
                message: "What is the URL to the main page of your source? (Eg: https://mangadex.org)"
            },
            {
                type: "input",
                name: "sourceDescription",
                message: "Enter a description for your first source"
            },
            {
                type: "input",
                name: "author",
                message: "What author should this source be attributed to"
            },
            {
                type: "input",
                name: "authorWebsite",
                message: "What website should the author be attributed to? (Leave blank if none)"
            },
            {
                type: "confirm",
                name: "hentaiSource",
                message: "Is this source a hentai source?"
            }
        ]);
    }

    installDependencies() {

        // NPM gulp build script
        const json = {
            "scripts": {
                "start": "tsc && node dist/api.js",
                "build": "tsc",
                "test": "node_modules/.bin/mocha --timeout 300000 -r ts-node/register src/**/*.test.ts",
                "coverage": "nyc -r lcov -e .ts -x \"*.test.ts\" npm run test",
                "bundle": "gulp bundle --gulpfile node_modules/paperback-extensions-common/src/repo-gulpfile.js"
            }
        }

        this.fs.extendJSON(this.destinationPath('package.json'), json)

        //Non-save-dev
        this.npmInstall(
            ['chai', 'chai-as-promised', 'cheerio', 'paperback-extensions-common', 'ts-mocha', 'tsify', 'typescript'],
            { 'save-dev': false }
        )

        // Save-dev
        this.npmInstall(
            ['@types/cheerio', '@types/mocha', 'mocha', 'nyc'],
            { 'save-dev': true }
        )
    }

    writing() {

        let file = fs.readFileSync(this.templatePath('sourceTemplate.txt'), { encoding: 'utf8', flag: 'r' })

        file = file.replace('DOMAINMARK', this.answers.sourceBasePath)
        file = file.replace('SOURCENAME', this.answers.sourceName)
        file = file.replace('SOURCEDESC', this.answers.sourceDescription)
        file = file.replace('SOURCEAUTHOR', this.answers.author)
        file = file.replace('ISHENTAIMARKER', String(this.answers.hentaiSource))
        file = file.replace('AUTHORWEBSITEMARK', this.answers.authorWebsite)
        file = file.replace('CLASSNAME', this.answers.sourceName.replace(' ', ''))

        fs.mkdirSync(this.destinationPath('src'))
        let dirPath = this.destinationPath('src/' + this.answers.sourceName.replace(' ', '') + "/")
        fs.mkdirSync(dirPath)
        fs.writeFileSync(path.join(dirPath, this.answers.sourceName + ".ts"), file)

        // Write includes file data
        this.fs.copy(
            this.templatePath('logo.png'),
            this.destinationPath('src/' + this.answers.sourceName.replace(' ', '') + "/includes/logo.png")
        )

        // Write the TSConfig file
        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json')
        )

        // Write the git workflow file
        this.fs.copy(
            this.templatePath('main.yml'),
            this.destinationPath('.github/workflows/main.yml')
        )
    }


}

