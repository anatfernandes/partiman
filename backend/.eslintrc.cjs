module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:boundaries/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    extends: ["plugin:boundaries/recommended"],
    "boundaries/ignore": ["**/tests/"],
    "boundaries/elements": [
      {
        type: "controllers",
        pattern: "src/controllers",
      },
      {
        type: "services",
        pattern: "src/services",
      },
      {
        type: "middlewares",
        pattern: "src/middlewares",
      },
      {
        type: "repositories",
        pattern: "src/repositories",
      },
      {
        type: "routers",
        pattern: "src/routers",
      },
      {
        type: "database",
        pattern: "src/database",
      },
    ],
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "semi-spacing": ["error", { before: false, after: true }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { beforeColon: false }],
    "padded-blocks": ["error", "never"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-before-blocks": ["error", "always"],
    "eol-last": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "warn",
    "boundaries/element-types": [
      2,
      {
        default: "disallow",
        message: "${file.type} não podem importar ${dependency.type}",
        rules: [
          {
            from: ["controllers"],
            allow: ["services", "middlewares"],
          },
          {
            from: ["middlewares"],
            allow: ["services", "controllers", "database", "repositories"],
          },
          {
            from: ["services"],
            allow: ["repositories"],
          },
          {
            from: ["routers"],
            allow: ["controllers", "middlewares"],
          },
          {
            from: ["repositories"],
            allow: ["database"],
          },
        ],
      },
    ],
  },
};
