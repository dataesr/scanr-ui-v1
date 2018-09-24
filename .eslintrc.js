module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/destructuring-assignment": ["always", { "ignoreClassFields": true }],
      "react/require-default-props": [1, { forbidDefaultForRequired: true }],
      "react/forbid-prop-types": [1],
      "import/no-extraneous-dependencies": [
        "error", {
           "devDependencies": false,
           "optionalDependencies": false,
           "peerDependencies": false,
           "packageDir": "./"
        }],
        "prefer-destructuring": [1, {
        "array": true,
        "object": true
      }],
      "react/prefer-stateless-function": [
        1, { "ignorePureComponents": false }],
      "max-len": [1, 120, 2, {ignoreComments: true}],
      "import/no-named-as-default": 0,
    },
    "parser": "babel-eslint",
};
