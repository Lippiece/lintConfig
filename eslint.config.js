import {
  combine,
  ignores,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  toml,
  typescript,
  vue,
  yaml,
} from "@antfu/eslint-config"
import { fixupPluginRules } from "@eslint/compat"
import js from "@eslint/js"
import html from "@html-eslint/eslint-plugin"
import pluginMicrosoftSdl from "@microsoft/eslint-plugin-sdl"
import stylistic from "@stylistic/eslint-plugin-ts"
import astroParser from "astro-eslint-parser"
import biome from "eslint-config-biome"
import alignAssignments from "eslint-plugin-align-assignments"
import arrayFunc from "eslint-plugin-array-func"
import eslintPluginAstro from "eslint-plugin-astro"
import boundaries from "eslint-plugin-boundaries"
import canonical from "eslint-plugin-canonical"
import compat from "eslint-plugin-compat"
import functional from "eslint-plugin-functional"
import eslintPluginImportX from "eslint-plugin-import-x"
import nodePlugin from "eslint-plugin-n"
import onlyWarn from "eslint-plugin-only-warn"
import oxlint from "eslint-plugin-oxlint"
import perfectionist from "eslint-plugin-perfectionist"
import preferArrow from "eslint-plugin-prefer-arrow-functions"
import pluginPromise from "eslint-plugin-promise"
import readableTailwind from "eslint-plugin-readable-tailwind"
import pluginSecurity from "eslint-plugin-security"
import sonarjs from "eslint-plugin-sonarjs"
import sortKeysFix from "eslint-plugin-sort-keys-fix"
import svelte from "eslint-plugin-svelte"
import treeShaking from "eslint-plugin-tree-shaking"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import pluginVue from "eslint-plugin-vue"
import eslintPluginVueScopedCSS from "eslint-plugin-vue-scoped-css"
import pluginVueA11y from "eslint-plugin-vuejs-accessibility"
import { configs as wc } from "eslint-plugin-wc"
import writeGoodComments from "eslint-plugin-write-good-comments"
import globals from "globals"
import tseslint from "typescript-eslint"

const antfu = await combine(
  // comments(),
  ignores(),
  javascript(),
  typescript(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  sortPackageJson(),
  sortTsconfig(),
  toml(),
  vue(),
  yaml(),
)

export default [
  // NOTE: Opinionated
  ...antfu,

  // NOTE: Global
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.all,
  js.configs.all,

  eslintPluginUnicorn.configs.all,
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      "unicorn/expiring-todo-comments": 0,
      "unicorn/filename-case": 0,
      "unicorn/prevent-abbreviations": [
        1,
        {
          replacements: {
            props: false,
            ref: false,
            refs: false,
          },
        },
      ],
    },
  },

  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/no-unknown-property": 0,
      "sonarjs/prefer-nullish-coalescing": 0,
      "sonarjs/rules-of-hooks": 0,
    },
  },

  perfectionist.configs["recommended-natural"],
  ...eslintPluginAstro.configs.all,
  pluginSecurity.configs.recommended,

  // NOTE: Web Components
  wc["flat/recommended"],
  wc["flat/best-practice"],

  {
    plugins: {
      "@stylistic/ts": stylistic,
    },

    rules: {
      "@stylistic/ts/key-spacing": [1, { align: {}, multiLine: {} }],

      "@stylistic/ts/padding-line-between-statements": [
        1,
        { blankLine: "always", next: "return", prev: "*" },
        { blankLine: "always", next: "*", prev: ["const", "let", "var"] },
        {
          blankLine: "any",
          next: ["const", "let", "var"],
          prev: ["const", "let", "var"],
        },
      ],
      "@stylistic/ts/member-delimiter-style": 1,
    },
  },

  {
    plugins: {
      "tree-shaking": fixupPluginRules(treeShaking),
    },
    rules: {
      "tree-shaking/no-side-effects-in-initialization": 1,
    },
  },

  nodePlugin.configs["flat/recommended-script"],
  {
    rules: {
      "n/prefer-promises/fs": 1,
      "n/prefer-promises/dns": 1,
      "n/prefer-node-protocol": 1,
      "n/prefer-global/url": 1,
      "n/prefer-global/url-search-params": 1,
      "n/prefer-global/text-encoder": 1,
      "n/prefer-global/text-decoder": 1,
      "n/prefer-global/process": 1,
      "n/prefer-global/buffer": 1,
      "n/no-sync": 1,
      "n/no-missing-import": 0,
    },
  },

  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginImportX.flatConfigs.errors,
  eslintPluginImportX.flatConfigs.warnings,
  {
    rules: {
      "import-x/no-namespace": 1,
      "import-x/no-relative-packages": 1,
      "import-x/no-relative-parent-imports": 1,
      "import-x/no-cycle": 1,
      "import-x/no-commonjs": 1,
      "import-x/no-amd": 1,
      "import-x/order": 1,
      "import-x/newline-after-import": 1,
      "import-x/no-useless-path-segments": 1,
      "import-x/no-import-module-exports": 1,
      "import-x/no-empty-named-blocks": 1,
      "import-x/no-deprecated": 1,
      "import-x/no-unresolved": 0,
    },
  },

  canonical.configs["flat/recommended"],
  {
    rules: {
      "canonical/destructuring-property-newline": 0,
      "canonical/export-specifier-newline": 0,
      "canonical/import-specifier-newline": 0,
      "canonical/no-barrel-import": 1,
      "canonical/no-export-all": 1,
      "canonical/prefer-import-alias": 1,
      "canonical/prefer-inline-type-import": 1,
    },
  },

  pluginPromise.configs["flat/recommended"],

  // NOTE: Remove redundant rules
  biome,
  ...oxlint.configs["flat/all"],

  // NOTE: SDL (security and performance)
  ...pluginMicrosoftSdl.configs.typescript,
  ...pluginMicrosoftSdl.configs.common,

  // NOTE: `Array` functions
  {
    plugins: {
      "array-func": arrayFunc,
    },
    rules: {
      "array-func/prefer-flat": 1,
      "array-func/from-map": 1,
      "array-func/no-unnecessary-this-arg": 1,
      "array-func/prefer-array-from": 1,
      "array-func/avoid-reverse": 1,
      "array-func/prefer-flat-map": 1,
    },
  },

  // NOTE: Browser compatibility
  compat.configs["flat/recommended"],

  // NOTE: Functional style
  functional.configs.all,
  {
    rules: {
      "functional/no-throw-statements": [1, { allowToRejectPromises: true }],
    },
  },

  // NOTE: MVC architecture
  {
    plugins: {
      boundaries,
    },
    rules: { ...boundaries.configs.recommended.rules },
  },

  // NOTE: Main config
  {
    languageOptions: {
      ecmaVersion: "latest",

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
        ...globals.es2025,
      },

      parserOptions: {
        ecmaFeatures: {
          arrowFunctions: true,
          modules: true,
        },

        extraFileExtensions: "vue",
        projectService: true,
      },

      sourceType: "module",
    },

    plugins: {
      "@stylistic/ts": stylistic,
      "align-assignments": alignAssignments,
      "only-warn": onlyWarn,
      "prefer-arrow-functions": fixupPluginRules(preferArrow),
      "readable-tailwind": readableTailwind,
      "sort-keys-fix": fixupPluginRules(sortKeysFix),
      "write-good-comments": fixupPluginRules(writeGoodComments),
    },

    rules: {
      "promise/always-return": 0,
      "promise/no-return-in-finally": 0,
      "promise/no-multiple-resolved": 0,
      "max-statements": [0, { max: 15 }],
      "no-warning-comments": 0,

      "prefer-arrow-functions/prefer-arrow-functions": [
        1,
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          returnStyle: "implicit",
          singleReturnOnly: false,
        },
      ],

      "vue/valid-v-for": 0,

      ...readableTailwind.configs.warning.rules,
      "@microsoft/sdl/no-html-method": 0,

      // Disable
      "@typescript-eslint/consistent-type-imports": 0,
      "@typescript-eslint/explicit-function-return-type": 0,

      "@typescript-eslint/explicit-member-accessibility": 0,

      "@typescript-eslint/naming-convention": [
        1,
        {
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allowSingleOrDouble",
          selector: ["function", "variable"],
          trailingUnderscore: "allowSingleOrDouble",
        },
      ],

      "align-assignments/align-assignments": 1,
      camelcase: 0,
      "capitalized-comments": 0,
      "comma-dangle": 0,
      "compat/compat": 0,
      "drizzle/enforce-delete-with-where": 0,
      "etc/no-misused-generics": 0,
      "func-style": [1, "expression"],
      "functional/no-classes": 0,
      "functional/no-this-expressions": 0,
      "import/no-unused-modules": "off",
      "import/unambiguous": 0,
      indent: 0,
      "jest/prefer-expect-assertions": 0,
      "jest/require-hook": 0,
      "key-spacing": 0,
      "linebreak-style": 0,
      "max-lines": 0,
      "no-multi-spaces": 0,
      "no-ternary": 0,
      "no-undef": 0,
      "no-underscore-dangle": [
        1,
        {
          allowFunctionParams: true,
        },
      ],

      "no-unused-vars": 0,
      "one-var": 0,
      parse: 0,
      "prettier/prettier": 0,
      "putout/putout": 0,
      quotes: 0,
      semi: 0,
      "sort-keys": 0,
      "sort-keys-fix/sort-keys-fix": 1,
      "style/quotes": 0,
      "total-functions/require-strict-mode": 0,
      "typescript-eslint/naming-convention": 0,

      "unused-imports/no-unused-imports": 0,
      "unused-imports/no-unused-vars": 0,
      "write-good-comments/write-good-comments": 1,
      "xss/no-mixed-html": 0,

      "ts/adjacent-overload-signatures": 1,
      "ts/array-type": [
        1,
        {
          default: "array-simple",
        },
      ],
      "ts/explicit-module-boundary-types": 0,
      "ts/no-magic-numbers": 0,
      "ts/promise-function-async": 0,
      "ts/strict-boolean-expressions": 0,
      "ts/no-non-null-assertion": 0,
      "ts/no-unsafe-argument": 0,
      "ts/no-unsafe-assignment": 0,
      "ts/no-unsafe-call": 0,
      "ts/no-unsafe-member-access": 0,
      "ts/no-unused-expressions": 0,
      "ts/no-unused-vars": 0,
      "ts/prefer-nullish-coalescing": 0,
      "ts/prefer-readonly-parameter-types": 0,
      "ts/consistent-generic-constructors": 1,
      "ts/consistent-indexed-object-style": 1,
      "ts/consistent-type-assertions": 1,
      "ts/consistent-type-exports": 1,
      "ts/default-param-last": 1,
      "ts/dot-notation": 1,
      "ts/await-thenable": 1,
      "ts/explicit-member-accessibility": 1,
      "ts/no-array-delete": 1,
      "ts/no-unnecessary-qualifier": 1,
      "ts/no-unsafe-type-assertion": 1,
      "ts/no-useless-empty-export": 1,
      "ts/prefer-destructuring": 1,
      "ts/require-array-sort-compare": 1,
      "ts/switch-exhaustiveness-check": 1,
      "ts/typedef": 1,

      "antfu/import-dedupe": 1,

      "jsdoc/check-line-alignment": 1,
      "jsdoc/match-name": 1,
      "jsdoc/no-bad-blocks": 1,
      "jsdoc/no-blank-block-descriptions": 1,
      "jsdoc/no-blank-blocks": 1,
      "jsdoc/no-missing-syntax": 1,
      "jsdoc/no-types": 1,
      "jsdoc/require-description-complete-sentence": 1,
      "jsdoc/require-description": 1,
      "jsdoc/require-example": 1,
      "jsdoc/require-hyphen-before-param-description": 1,
      "jsdoc/require-jsdoc": 1,
      "jsdoc/require-template": 1,
      "jsdoc/sort-tags": 1,
      "jsdoc/tag-lines": 1,
      "jsdoc/text-escaping": 1,

      "jsonc/auto": 1,
    },
  },

  {
    files: ["**/*.test*"],

    rules: {
      "max-lines-per-function": 0,
    },
  },

  // HTML
  {
    ...html.configs["flat/all"],
    files: ["**/*.html"],
    rules: {
      "@html-eslint/no-inline-styles": 1,
      "@html-eslint/no-extra-spacing-text": 1,
      "@html-eslint/no-skip-heading-levels": 1,
      "@html-eslint/id-naming-convention": 1,
      "@html-eslint/require-attrs": 1,
      "@html-eslint/require-meta-description": 1,
      "@html-eslint/require-frame-title": 1,
      "@html-eslint/no-non-scalable-viewport": 1,
      "@html-eslint/no-positive-tabindex": 1,
      "@html-eslint/require-meta-viewport": 1,
      "@html-eslint/require-meta-charset": 1,
      "@html-eslint/no-target-blank": 1,
      "@html-eslint/no-abstract-roles": 1,
      "@html-eslint/require-button-type": 1,
      "@html-eslint/no-aria-hidden-body": 1,
      "@html-eslint/no-multiple-empty-lines": 1,
      "@html-eslint/no-accesskey-attrs": 1,
      "@html-eslint/no-heading-inside-button": 1,
      "@html-eslint/no-invalid-role": 1,
      "@html-eslint/no-nested-interactive": 1,
      "@html-eslint/lowercase": 1,
      "@html-eslint/require-open-graph-protocol": 1,
      "@html-eslint/require-form-method": 1,
      "@html-eslint/sort-attrs": 1,
      "@html-eslint/prefer-https": 1,
      "@html-eslint/require-input-label": 1,
      "@html-eslint/max-element-depth": 1,
      "@html-eslint/require-explicit-size": 1,
    },
  },

  {
    files: ["**/*.astro"],

    languageOptions: {
      ecmaVersion: "latest",
      parser: astroParser,

      parserOptions: {
        extraFileExtensions: [".astro"],
        parser: "@typescript-eslint/parser",
        projectService: true,
      },

      sourceType: "script",
    },
  },

  // Vue
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],
  ...pluginVueA11y.configs["flat/recommended"],
  ...eslintPluginVueScopedCSS.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],

    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        projectService: true,
      },
    },

    rules: {
      "functional/immutable-data": 0,
      "import/first": 0,
      "readable-tailwind/multiline": 0,
      "sonarjs/pluginRules-of-hooks": 0,
      "sonarjs/sonar-no-fallthrough": 0,
      "vue/html-comment-content-newline": 1,
      "vue/html-comment-indent": 1,
      "vue/define-emits-declaration": 1,
      "vue/component-api-style": 1,
      "vue/define-props-declaration": 1,
      "vue/html-button-has-type": 1,
      "vue/max-template-depth": 1,
      "vue/max-props": 1,
      "vue/max-lines-per-block": 1,
      "vue/new-line-between-multi-line-property": 1,
      "vue/next-tick-style": 1,
      "vue/no-bare-strings-in-template": 1,
      "vue/no-boolean-default": 1,
      "vue/no-duplicate-attr-inheritance": 1,
      "vue/no-implicit-coercion": 1,
      "vue/no-import-compiler-macros": 1,
      "vue/no-multiple-objects-in-class": 1,
      "vue/no-multiple-template-root": 1,
      "vue/no-ref-object-reactivity-loss": 1,
      "vue/no-root-v-if": 1,
      "vue/no-static-inline-styles": 1,
      "vue/no-template-target-blank": 1,
      "vue/no-undef-components": 1,
      "vue/no-undef-properties": 1,
      "vue/no-unused-emit-declarations": 1,
      "vue/no-unused-properties": 1,
      "vue/no-use-v-else-with-v-for": 1,
      "vue/no-useless-concat": 1,
      "vue/no-useless-mustaches": 1,
      "vue/no-v-text": 1,
      "vue/padding-line-between-tags": 1,
      "vue/padding-lines-in-component-definition": 1,
      "vue/prefer-define-options": 1,
      "vue/prefer-true-attribute-shorthand": 1,
      "vue/prefer-use-template-ref": 1,
      "vue/require-emit-validator": 1,
      "vue/require-macro-variable-name": 1,
      "vue/require-typed-object-prop": 1,
      "vue/require-typed-ref": 1,
      "vue/slot-name-casing": 1,
      "vue/static-class-names-order": 1,
      "vue/v-for-delimiter-style": 1,
      "vue/v-if-else-key": 1,
      "vue/v-on-handler-style": 1,
    },
  },

  // Svelte
  ...svelte.configs.all,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    // See more details at: https://typescript-eslint.io/packages/parser/
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"], // Add support for additional file extensions, such as .svelte
        parser: tseslint.parser,
        // Specify a parser for each language, if needed:
        // parser: {
        //   ts: ts.parser,
        //   js: espree,    // Use espree for .js files (add: import espree from 'espree')
        //   typescript: ts.parser
        // },

        // We recommend importing and specifying svelte.config.js.
        // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
        // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
        // explicitly specifying it ensures better compatibility and functionality.
        // svelteConfig
      },
    },
  },
  {
    rules: {
      // Override or add rule settings here, such as:
      // 'svelte/rule-name': 'error'
    },
  },
]
