module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "jest": true,
    },
    "rules": {
      "import/no-extraneous-dependencies": [
        "error", {
           "devDependencies": false,
           "optionalDependencies": false,
           "peerDependencies": false,
           "packageDir": "./"
        }],
      "import/no-named-as-default": 0,
      "jsx-a11y/anchor-is-valid": [0],
      "max-len": [1, 120, 2, {ignoreComments: true}],
      "no-param-reassign": [
        "error", {
          "props": true,
          "ignorePropertyModificationsFor": ["dataRow", "request"] }],
      "prefer-destructuring": [1, {
        "array": true,
        "object": true
      }],
      "react/destructuring-assignment": ["always", { "ignoreClassFields": true }],
      "react/forbid-prop-types": [0],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/no-did-update-set-state": 0,
      "react/prefer-stateless-function": [
        1, { "ignorePureComponents": false }],
      "react/require-default-props": [0, { forbidDefaultForRequired: true }],
    },
    "parser": "babel-eslint",
};
