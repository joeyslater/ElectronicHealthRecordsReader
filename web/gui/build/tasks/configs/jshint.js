  /**
   * `jshint` defines the rules of our linter as well as which files we should check. This file, all javascript sources, and all our unit tests are linted
   * based on the policies listed in `options`. But we can also specify exclusionary patterns by prefixing them with an exclamation point (!); this is
   * useful when code comes from a third party but is nonetheless inside `src/`.
   */
  module.exports = {
      src: ['<%= buildConfig.appFiles.js %>'],
      test: ['<%= buildConfig.appFiles.jsunit %>'],
      options:
      {
          "predef": [
              "console",
              "$",
              "jQuery",
              "Ricola",
              "angular",
              "Mobicola",
              "describe",
              "it",
              "expect",
              "jasmine",
              "loadFixtures",
              "xit",
              "beforeEach",
              "afterEach"
          ],
          "node": true,
          "browser": true,
          "devel": true,
          "jquery": true,
          "bitwise": true,
          "camelcase": true,
          "curly": true,
          "eqeqeq": true,
          "forin": true,
          "immed": true,
          "latedef": true,
          "newcap": true,
          "noarg": true,
          "noempty": true

      },
      globals:
      {}
  };
