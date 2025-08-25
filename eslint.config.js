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
  yaml,
} from "@antfu/eslint-config"
import { fixupPluginRules } from "@eslint/compat"
import js from "@eslint/js"
import html from "@html-eslint/eslint-plugin"
import pluginMicrosoftSdl from "@microsoft/eslint-plugin-sdl"
import stylistic from "@stylistic/eslint-plugin"
import biome from "eslint-config-biome"
import alignAssignments from "eslint-plugin-align-assignments"
import arrayFunc from "eslint-plugin-array-func"
import eslintPluginAstro from "eslint-plugin-astro"
// import betterTailwindCss from "eslint-plugin-better-tailwindcss"
import boundaries from "eslint-plugin-boundaries"
import canonical from "eslint-plugin-canonical"
import compat from "eslint-plugin-compat"
// import functional from "eslint-plugin-functional"
import eslintPluginImportX from "eslint-plugin-import-x"
import nodePlugin from "eslint-plugin-n"
import onlyWarn from "eslint-plugin-only-warn"
import oxlint from "eslint-plugin-oxlint"
import perfectionist from "eslint-plugin-perfectionist"
import preferArrow from "eslint-plugin-prefer-arrow-functions"
import pluginPromise from "eslint-plugin-promise"
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
  // vue(),
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
      "unicorn/filename-case"         : 0,
      "unicorn/prefer-includes"       : 1,
      "unicorn/prevent-abbreviations" : [
        1,
        {
          replacements: {
            props: false,
            ref  : false,
            refs : false,
          },
        },
      ],
    },
  },

  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/no-unknown-property"      : 0,
      "sonarjs/prefer-nullish-coalescing": 0,
      "sonarjs/rules-of-hooks"           : 0,
    },
  },

  perfectionist.configs["recommended-natural"],
  pluginSecurity.configs.recommended,

  // NOTE: Web Components
  wc["flat/recommended"],
  wc["flat/best-practice"],

  {
    plugins: {
      "tree-shaking": fixupPluginRules(treeShaking),
    },
    rules: {
      "tree-shaking/no-side-effects-in-initialization": 0,
    },
  },

  nodePlugin.configs["flat/recommended-script"],
  {
    rules: {
      "n/no-missing-import"                  : 0,
      "n/no-sync"                            : 1,
      "n/no-unsupported-features/es-builtins": [
        1,
        {
          version: ">=22.0.0",
        },
      ],
      "n/no-unsupported-features/es-syntax": [
        1,
        {
          version: ">=22.0.0",
        },
      ],
      "n/no-unsupported-features/node-builtins": [
        1,
        {
          version: ">=22.0.0",
        },
      ],
      "n/prefer-global/buffer"           : 1,
      "n/prefer-global/process"          : 1,
      "n/prefer-global/text-decoder"     : 1,
      "n/prefer-global/text-encoder"     : 1,
      "n/prefer-global/url"              : 1,
      "n/prefer-global/url-search-params": 1,
      "n/prefer-node-protocol"           : 1,
      "n/prefer-promises/dns"            : 1,
      "n/prefer-promises/fs"             : 1,
    },
  },

  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginImportX.flatConfigs.errors,
  eslintPluginImportX.flatConfigs.warnings,
  {
    rules: {
      "import-x/newline-after-import"      : 1,
      "import-x/no-amd"                    : 1,
      "import-x/no-commonjs"               : 1,
      "import-x/no-cycle"                  : 1,
      "import-x/no-deprecated"             : 1,
      "import-x/no-duplicates"             : 0,
      "import-x/no-empty-named-blocks"     : 1,
      "import-x/no-import-module-exports"  : 1,
      "import-x/no-namespace"              : 1,
      "import-x/no-relative-packages"      : 1,
      "import-x/no-relative-parent-imports": 0,
      "import-x/no-unresolved"             : 0,
      "import-x/no-useless-path-segments"  : 1,
      "import-x/order"                     : 0,
    },
  },

  canonical.configs["flat/recommended"],
  {
    rules: {
      "canonical/destructuring-property-newline": 0,
      "canonical/export-specifier-newline"      : 0,
      "canonical/import-specifier-newline"      : 0,
      "canonical/no-barrel-import"              : 1,
      "canonical/no-export-all"                 : 1,
      "canonical/prefer-import-alias"           : 1,
      "canonical/prefer-inline-type-import"     : 0,
    },
  },

  pluginPromise.configs["flat/recommended"],

  // NOTE: SDL (security and performance)
  ...pluginMicrosoftSdl.configs.typescript,
  ...pluginMicrosoftSdl.configs.common,

  // NOTE: `Array` functions
  {
    plugins: {
      "array-func": arrayFunc,
    },
    rules: {
      "array-func/avoid-reverse"          : 1,
      "array-func/from-map"               : 1,
      "array-func/no-unnecessary-this-arg": 1,
      "array-func/prefer-array-from"      : 1,
      "array-func/prefer-flat"            : 1,
      "array-func/prefer-flat-map"        : 1,
    },
  },

  // NOTE: Browser compatibility
  compat.configs["flat/recommended"],

  // NOTE: Functional style
  // functional.configs.recommended,
  // {
  //   rules: {
  //     "functional/no-throw-statements": [1, { allowToRejectPromises: true }],
  //     "functional/prefer-immutable-types": 0,
  //     "functional/no-classes": 0,
  //     "functional/no-this-expressions": 0,
  //     "functional/no-conditional-statements": 0,
  //     "functional/no-expression-statements": 0,
  //   },
  // },

  // NOTE: MVC architecture
  {
    plugins: {
      boundaries,
    },
    rules: { ...boundaries.configs.recommended.rules },
  },

  // NOTE: Remove redundant rules
  biome,
  ...oxlint.buildFromOxlintConfigFile('/home/lippiece/.config/lintConfig/.oxlintrc.json'),


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
          modules       : true,
        },

        extraFileExtensions: [".vue", ".json"],
        projectService     : {
          allowDefaultProject: ['*.json'],
        },
      },

      sourceType: "module",
    },

    plugins: {
      "@stylistic"            : stylistic,
      "align-assignments"     : alignAssignments,
      // "better-tailwindcss": betterTailwindCss,
      "only-warn"             : onlyWarn,
      "prefer-arrow-functions": fixupPluginRules(preferArrow),
      "sort-keys-fix"         : fixupPluginRules(sortKeysFix),
      "write-good-comments"   : fixupPluginRules(writeGoodComments),
    },

    rules: {
      // ...betterTailwindCss.configs["recommended-warn"].rules,
      "@microsoft/sdl/no-html-method"    : 0,
      "@stylistic/indent"                : 0,
      "@stylistic/key-spacing"           : [1, { align: {}, multiLine: {} }],
      "@stylistic/member-delimiter-style": [
        1,
        {
          multiline: {
            delimiter: "none",
          },
        },
      ],
      "@stylistic/padding-line-between-statements": [
        1,
        { blankLine: "always", next: "return", prev: "*" },
        { blankLine: "always", next: "*", prev: ["const", "let", "var"] },
        {
          blankLine: "any",
          next     : ["const", "let", "var"],
          prev     : ["const", "let", "var"],
        },
      ],

      "@stylistic/quotes": 0,

      "@typescript-eslint/adjacent-overload-signatures": 1,

      "@typescript-eslint/array-type": [
        1,
        {
          default: "array-simple",
        },
      ],

      "@typescript-eslint/await-thenable"                 : 1,
      "@typescript-eslint/consistent-generic-constructors": 1,
      "@typescript-eslint/consistent-indexed-object-style": 1,
      "@typescript-eslint/consistent-type-assertions"     : 1,
      "@typescript-eslint/consistent-type-exports"        : 1,
      "@typescript-eslint/consistent-type-imports"        : 0,
      "@typescript-eslint/default-param-last"             : 1,
      "@typescript-eslint/dot-notation"                   : 1,
      "@typescript-eslint/explicit-function-return-type"  : 0,
      "@typescript-eslint/explicit-member-accessibility"  : 0,
      "@typescript-eslint/explicit-module-boundary-types" : 0,
      "@typescript-eslint/naming-convention"              : [
        1,
        {
          format            : ["camelCase", "PascalCase"],
          leadingUnderscore : "allowSingleOrDouble",
          selector          : ["function", "variable"],
          trailingUnderscore: "allowSingleOrDouble",
        },
      ],
      "@typescript-eslint/no-array-delete"                             : 1,
      "@typescript-eslint/no-confusing-non-null-assertion"             : 1,
      "@typescript-eslint/no-confusing-void-expression"                : 1,
      "@typescript-eslint/no-deprecated"                               : 1,
      "@typescript-eslint/no-duplicate-type-constituents"              : 1,
      "@typescript-eslint/no-floating-promises"                        : 1,
      "@typescript-eslint/no-inferrable-types"                         : 1,
      "@typescript-eslint/no-magic-numbers"                            : 0,
      "@typescript-eslint/no-meaningless-void-operator"                : 1,
      "@typescript-eslint/no-misused-promises"                         : 1,
      "@typescript-eslint/no-misused-spread"                           : 1,
      "@typescript-eslint/no-non-null-assertion"                       : 0,
      "@typescript-eslint/no-redundant-type-constituents"              : 1,
      "@typescript-eslint/no-unnecessary-boolean-literal-compare"      : 1,
      "@typescript-eslint/no-unnecessary-condition"                    : 1,
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": 1,
      "@typescript-eslint/no-unnecessary-qualifier"                    : 1,
      "@typescript-eslint/no-unnecessary-template-expression"          : 1,
      "@typescript-eslint/no-unnecessary-type-arguments"               : 1,
      "@typescript-eslint/no-unnecessary-type-assertion"               : 1,
      "@typescript-eslint/no-unnecessary-type-parameters"              : 1,
      "@typescript-eslint/no-unsafe-argument"                          : 0,
      "@typescript-eslint/no-unsafe-assignment"                        : 0,
      "@typescript-eslint/no-unsafe-call"                              : 0,
      "@typescript-eslint/no-unsafe-enum-comparison"                   : 1,
      "@typescript-eslint/no-unsafe-member-access"                     : 0,
      "@typescript-eslint/no-unsafe-return"                            : 1,
      "@typescript-eslint/no-unsafe-type-assertion"                    : 1,
      "@typescript-eslint/no-unused-expressions"                       : 0,
      "@typescript-eslint/no-unused-vars"                              : 0,
      "@typescript-eslint/no-useless-empty-export"                     : 1,
      "@typescript-eslint/non-nullable-type-assertion-style"           : 1,
      "@typescript-eslint/prefer-destructuring"                        : 1,
      "@typescript-eslint/prefer-find"                                 : 1,
      "@typescript-eslint/prefer-for-of"                               : 1,
      "@typescript-eslint/prefer-includes"                             : 1,
      "@typescript-eslint/prefer-nullish-coalescing"                   : 0,
      "@typescript-eslint/prefer-optional-chain"                       : 1,
      "@typescript-eslint/prefer-promise-reject-errors"                : 1,
      "@typescript-eslint/prefer-readonly-parameter-types"             : 0,
      "@typescript-eslint/prefer-reduce-type-parameter"                : 1,
      "@typescript-eslint/prefer-regexp-exec"                          : 1,
      "@typescript-eslint/prefer-string-starts-ends-with"              : 1,
      "@typescript-eslint/promise-function-async"                      : 0,
      "@typescript-eslint/require-array-sort-compare"                  : 1,
      "@typescript-eslint/return-await"                                : 1,
      "@typescript-eslint/strict-boolean-expressions"                  : 0,
      "@typescript-eslint/switch-exhaustiveness-check"                 : 1,
      "align-assignments/align-assignments"                            : 1,
      "antfu/import-dedupe"                                            : 1,
      "antfu/no-top-level-await"                                       : 0,
      // "better-tailwindcss/no-unregistered-classes": 0,
      camelcase                                                        : 0,

      "capitalized-comments"             : 0,
      "comma-dangle"                     : 0,
      "compat/compat"                    : 0,
      "drizzle/enforce-delete-with-where": 0,
      "etc/no-misused-generics"          : 0,
      "exports-last"                     : 0,
      "func-style"                       : [1, "expression"],
      "import/no-unused-modules"         : "off",
      "import/unambiguous"               : 0,
      indent                             : 0,
      "jest/prefer-expect-assertions"    : 0,
      "jest/require-hook"                : 0,
      "jsdoc/check-line-alignment"       : 1,
      "jsdoc/match-name"                 : 1,
      "jsdoc/no-bad-blocks"              : 1,
      "jsdoc/no-blank-block-descriptions": 1,
      "jsdoc/no-blank-blocks"            : 1,
      "jsdoc/no-types"                   : 1,
      "jsdoc/require-description"        : 1,

      "jsdoc/require-description-complete-sentence"  : 1,
      "jsdoc/require-example"                        : 1,
      "jsdoc/require-hyphen-before-param-description": 1,
      "jsdoc/require-jsdoc"                          : 1,
      "jsdoc/require-template"                       : 1,
      "jsdoc/sort-tags"                              : 1,
      "jsdoc/tag-lines"                              : 1,
      "jsdoc/text-escaping"                          : 1,
      "jsonc/auto"                                   : 1,
      "linebreak-style"                              : 0,
      "max-lines"                                    : 0,
      "max-statements"                               : [0, { max: 15 }],
      "no-inline-comments"                           : 0,
      "no-multi-spaces"                              : 0,
      "no-ternary"                                   : 0,
      "no-undef"                                     : 0,

      "no-underscore-dangle": [
        1,
        {
          allowFunctionParams: true,
        },
      ],
      "no-unused-vars"       : 0,
      "no-useless-assignment": 0,
      "no-warning-comments"  : 0,

      "one-var": 0,
      parse    : 0,

      "prefer-arrow-functions/prefer-arrow-functions": [
        1,
        {
          allowNamedFunctions   : false,
          classPropertiesAllowed: false,
          disallowPrototype     : true,
          returnStyle           : "implicit",
          singleReturnOnly      : false,
        },
      ],
      "prettier/prettier"                  : 0,
      "promise/always-return"              : 0,
      "promise/no-multiple-resolved"       : 0,
      "promise/no-return-in-finally"       : 0,
      "putout/putout"                      : 0,
      quotes                               : 0,
      semi                                 : 0,
      "sort-keys"                          : 0,
      "sort-keys-fix/sort-keys-fix"        : 1,
      "style/quotes"                       : 0,
      "total-functions/require-strict-mode": 0,
      "typescript-eslint/naming-convention": 0,
      "unused-imports/no-unused-imports"   : 0,
      "unused-imports/no-unused-vars"      : 0,

      "vue/v-on-handler-style": 0,

      "vue/valid-v-for"                        : 0,
      "write-good-comments/write-good-comments": 1,
      "xss/no-mixed-html"                      : 0
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
      "@html-eslint/id-naming-convention"       : 1,
      "@html-eslint/lowercase"                  : 1,
      "@html-eslint/max-element-depth"          : 1,
      "@html-eslint/no-abstract-roles"          : 1,
      "@html-eslint/no-accesskey-attrs"         : 1,
      "@html-eslint/no-aria-hidden-body"        : 1,
      "@html-eslint/no-extra-spacing-text"      : 1,
      "@html-eslint/no-heading-inside-button"   : 1,
      "@html-eslint/no-inline-styles"           : 1,
      "@html-eslint/no-invalid-role"            : 1,
      "@html-eslint/no-multiple-empty-lines"    : 1,
      "@html-eslint/no-nested-interactive"      : 1,
      "@html-eslint/no-non-scalable-viewport"   : 1,
      "@html-eslint/no-positive-tabindex"       : 1,
      "@html-eslint/no-skip-heading-levels"     : 1,
      "@html-eslint/no-target-blank"            : 1,
      "@html-eslint/prefer-https"               : 1,
      "@html-eslint/require-attrs"              : 1,
      "@html-eslint/require-button-type"        : 1,
      "@html-eslint/require-explicit-size"      : 1,
      "@html-eslint/require-form-method"        : 1,
      "@html-eslint/require-frame-title"        : 1,
      "@html-eslint/require-input-label"        : 1,
      "@html-eslint/require-meta-charset"       : 1,
      "@html-eslint/require-meta-description"   : 1,
      "@html-eslint/require-meta-viewport"      : 1,
      "@html-eslint/require-open-graph-protocol": 1,
      "@html-eslint/sort-attrs"                 : 1,
    },
  },

  ...eslintPluginAstro.configs.all,
  {
    // Don't attempt to use typescript rules in astro files
    // <https://github.com/ota-meshi/eslint-plugin-astro/issues/447> 😔
    files: ["**/*.astro"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      'astro/semi': 0
    }
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
        parser             : "@typescript-eslint/parser",
        projectService     : true,
      },
    },

    rules: {
      // "better-tailwindcss/multiline": 1,
      "functional/immutable-data"                : 0,
      "import/first"                             : 0,
      "parse"                                    : 0,
      "sonarjs/pluginRules-of-hooks"             : 0,
      "sonarjs/sonar-no-fallthrough"             : 0,
      "vue/component-api-style"                  : 1,
      "vue/define-emits-declaration"             : 1,
      "vue/define-macros-order"                  : 1,
      "vue/define-props-declaration"             : 1,
      "vue/dot-notation"                         : 1,
      "vue/eqeqeq"                               : 1,
      "vue/html-button-has-type"                 : 1,
      "vue/html-comment-content-newline"         : 1,
      "vue/html-comment-content-spacing"         : 1,
      "vue/html-comment-indent"                  : 1,
      "vue/max-lines-per-block"                  : 1,
      "vue/max-props"                            : 1,
      "vue/max-template-depth"                   : 1,
      "vue/new-line-between-multi-line-property" : 1,
      "vue/next-tick-style"                      : 1,
      "vue/no-bare-strings-in-template"          : 0,
      "vue/no-boolean-default"                   : 1,
      "vue/no-duplicate-attr-inheritance"        : 1,
      "vue/no-implicit-coercion"                 : 1,
      "vue/no-import-compiler-macros"            : 1,
      "vue/no-multiple-objects-in-class"         : 1,
      "vue/no-ref-object-reactivity-loss"        : 1,
      "vue/no-root-v-if"                         : 1,
      "vue/no-setup-props-reactivity-loss"       : 1,
      "vue/no-static-inline-styles"              : 1,
      "vue/no-template-target-blank"             : 1,
      "vue/no-undef-components"                  : 0,
      "vue/no-undef-properties"                  : 1,
      "vue/no-unused-emit-declarations"          : 1,
      "vue/no-unused-properties"                 : 1,
      "vue/no-unused-refs"                       : 1,
      "vue/no-use-v-else-with-v-for"             : 1,
      "vue/no-useless-concat"                    : 1,
      "vue/no-useless-mustaches"                 : 1,
      "vue/no-useless-v-bind"                    : 1,
      "vue/no-v-text"                            : 1,
      "vue/object-shorthand"                     : 1,
      "vue/padding-line-between-blocks"          : 1,
      "vue/padding-line-between-tags"            : 1,
      "vue/padding-lines-in-component-definition": 1,
      "vue/prefer-define-options"                : 1,
      "vue/prefer-separate-static-class"         : 1,
      "vue/prefer-template"                      : 1,
      "vue/prefer-true-attribute-shorthand"      : 1,
      "vue/prefer-use-template-ref"              : 1,
      "vue/require-emit-validator"               : 1,
      "vue/require-macro-variable-name"          : 1,
      "vue/require-typed-object-prop"            : 1,
      "vue/require-typed-ref"                    : 1,
      "vue/slot-name-casing"                     : 1,
      "vue/static-class-names-order"             : 0,
      "vue/v-for-delimiter-style"                : 1,
      "vue/v-if-else-key"                        : 1,
      "vue/v-on-handler-style"                   : 0,
      "vuejs-accessibility/label-has-for"        : [1, {
        "required": {
          "some": ["nesting", "id"]
        }
      }]
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
    files          : ["**/*.svelte"],
    // See more details at: https://typescript-eslint.io/packages/parser/
    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".svelte"],
        // Add support for additional file extensions, such as .svelte
        parser             : tseslint.parser,
        projectService     : true,

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
      "functional/no-let"          : 0,
      "svelte/block-lang"          : [1, { script: "ts" }],
      "svelte/no-trailing-spaces"  : 0,
      "svelte/no-unused-class-name": 0,
    },
  },

  {
    files: ['**/*.json'],
    ...tseslint.configs.disableTypeChecked
  }
]
