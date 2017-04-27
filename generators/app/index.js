'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('generator-weather-wx') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (weather_wx):',
        default: 'weather_wx'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (chenjinxinlvoe):',
        default: 'chenjinxinlvoe'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTpl({
      generatorName: 'generator-weather-wx',
      yoName: 'weather-wx'
    }));

    var pkg = this.fs.readJSON(this.templatePath('package_tmpl.json'), {});
    extend(pkg, {
      devDependencies: {
        del: '^2.2.2',
        gulp: '^3.9.1',
        'gulp-babel': '^6.1.2',
        'gulp-base64': '^0.1.3',
        'gulp-if-else': '^1.0.3',
        'gulp-less': '^3.1.0',
        'gulp-notify': '^2.2.0',
        'gulp-plumber': '^1.1.0',
        'gulp-postcss': '^6.2.0',
        'gulp-rename': '^1.2.2',
        'gulp-replace': '^0.5.4',
        'gulp-sass': '^2.3.2',
        'gulp-uglify': '^2.0.0',
        'gulp-watch': '^4.3.9',
        'gulp-watch-path': '^0.1.0',
        'vinyl-named': '^1.1.0',
        'babel-core': '^6.14.0',
        'babel-eslint': '^6.1.2',
        'babel-loader': '^6.2.5',
        'babel-plugin-transform-runtime': '^6.15.0',
        'babel-preset-es2015': '^6.14.0',
        'babel-preset-stage-2': '^6.13.0',
        'babel-runtime': '^6.11.6',
        webpack: '^1.12.14',
        'webpack-stream': '^3.2.0'
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('generator-weather-wx');

    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.author = this.props.projectAuthor;
    pkg.license = this.props.projectLicense;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    mkdirp('dist');
    mkdirp('src');
    mkdirp('src/pages');
    mkdirp('src/utils');

    this.fs.copy(
      this.templatePath('gitignore_tmpl.txt'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('gulpfile_tmpl.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('./src/app_tmpl.js'),
      './src/app.js'
    );
    this.fs.copy(
      this.templatePath('./src/app_tmpl.json'),
      './src/app.json'
    );
    this.fs.copy(
      this.templatePath('./src/app_tmpl.scss'),
      './src/app.scss'
    );

    this.fs.copy(
      this.templatePath('./src/pages/index_tmpl.wxml'),
      './src/pages/index.wxml'
    );
  }

  install() {
    this.installDependencies();
  }
};
