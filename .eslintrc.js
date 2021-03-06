module.exports = {
  parser: 'babel-eslint',
  "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        'airbnb',
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prefer-stateless-function":0,
        "react/jsx-filename-extension":0,
        "no-unused-expressions":0,
        "camelcase":0,
        "no-use-before-define":0,
        "quotes": 0,
        "no-console": 1,
        "no-debugger": 1,
        "no-var": 1,
        "no-trailing-spaces": 0,
        "eol-last": 0,
        "no-unused-vars": 0,
        "no-underscore-dangle": 0,
        "no-alert": 0,
        "no-lone-blocks": 0,
        "jsx-quotes": 1,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-curly-spacing": 1,
        "react/jsx-indent-props": 0,
        "react/jsx-key": 1,
        "react/jsx-max-props-per-line": 0,
        "react/jsx-no-bind": 0,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-literals": 0,
        "react/jsx-no-undef": 1,
        "react/jsx-pascal-case": 1,
        "react/jsx-sort-prop-types": 0,
        "react/jsx-sort-props": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-danger": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 1,
        "react/no-multi-comp": 1,
        "react/no-set-state": 0,
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 1,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 1,
        "react/jsx-wrap-multilines": 1,
        "react/no-unescaped-entities": 0,
        "react/destructuring-assignment": 0,
        "react/jsx-indent": [1, 2],
        "react/jsx-tag-spacing": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-props-no-spreading": 0,
        "indent": [1, 2],
        // "camelcase": 0,
        "arrow-parens": 0,
        "object-curly-spacing": 0,
        // "no-param-reassign": 0,
        "comma-dangle": 0,
        // "max-len": [2, {"code": 140}],
        "operator-linebreak": [0, "after"],
        // "no-else-return": 0,
        // "no-confusing-arrow": 0,
    //    "semi": [1, "always"],
    //    "react/display-name": [ 1, {"acceptTranspilerName": true }],
    //    "react/forbid-prop-types": [1, {"forbid": "any"}],
    //    "react/require-extension": 1,
    }
};