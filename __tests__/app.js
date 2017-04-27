'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-weather-wx:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'gulpfile.js', 'package.json', 'src/app.js', 'src/app.json', 'src/app.scss', 'src/pages/index.wxml'
    ]);
  });
});
