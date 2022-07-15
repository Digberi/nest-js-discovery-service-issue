module.exports = {
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "import", "prettier", "sonarjs"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/order": [
      "error",
      {
        "pathGroups": [
          {
            "pattern": "@nestjs/**",
            "group": "internal",
            "position": "before"
          }
        ],
        "groups": [["external", "builtin"], "internal", ["parent", "sibling", "index"]],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always"
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-magic-numbers": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "import/no-unresolved":[
      "off", 
      { "caseSensitive": false }
   ]
  },
};
