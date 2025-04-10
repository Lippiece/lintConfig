import path from "node:path"
import { fileURLToPath } from "node:url"
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
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import html from "@html-eslint/eslint-plugin"
import stylistic from "@stylistic/eslint-plugin-ts"
import astroParser from "astro-eslint-parser"
import biome from "eslint-config-biome"
import alignAssignments from "eslint-plugin-align-assignments"
import eslintPluginAstro from "eslint-plugin-astro"
import canonical from "eslint-plugin-canonical"
import onlyWarn from "eslint-plugin-only-warn"
import oxlint from "eslint-plugin-oxlint"
import perfectionist from "eslint-plugin-perfectionist"
import preferArrow from "eslint-plugin-prefer-arrow-functions"
import readableTailwind from "eslint-plugin-readable-tailwind"
import pluginSecurity from "eslint-plugin-security"
import sonarjs from "eslint-plugin-sonarjs"
import sortKeysFix from "eslint-plugin-sort-keys-fix"
import eslintPluginSvelte from "eslint-plugin-svelte"
import svelte from "eslint-plugin-svelte"
import treeShaking from "eslint-plugin-tree-shaking"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import pluginVue from "eslint-plugin-vue"
import { configs as wc } from "eslint-plugin-wc"
import writeGoodComments from "eslint-plugin-write-good-comments"
import globals from "globals"
import neostandard from "neostandard"
import * as svelteParser from "svelte-eslint-parser"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
})

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
  // Opinionated
  ...antfu,

  // Global
  ...tseslint.configs.all,
  js.configs.all,
  {
    ...eslintPluginUnicorn.configs.all,
    rules: {
      "unicorn/expiring-todo-comments": 0,
      "unicorn/filename-case": 0,
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            props: false,
            ref: false,
            refs: false,
          },
        },
      ],
    }
  },
  {
    ...sonarjs.configs.recommended,
    rules: {
      "sonarjs/no-unknown-property": 0,
      "sonarjs/prefer-nullish-coalescing": 0,
      "sonarjs/rules-of-hooks": 0,
    }
  },
  perfectionist.configs["recommended-natural"],
  canonical.configs["flat/recommended"],
  ...eslintPluginAstro.configs.all,
  pluginSecurity.configs.recommended,
  ...neostandard(),

  // Web Components
  wc["flat/recommended"],
  wc["flat/best-practice"],

  ...fixupConfigRules(
    compat.extends(
      // "eslint-config-auto",
      // "eslint-config-hardcore",
      // "hardcore/fp",
      // "hardcore/ts",
    ),
  ),

  // Remove redundant rules
  biome,
  ...oxlint.configs["flat/all"],

  {
    // Files: ['**/*.ts, **/*.js, **/*.vue, **/*.astro'],
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

        // Project: "tsconfig.json",
        // Project: "/home/lippiece/tsconfig.json",
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
      "tree-shaking": fixupPluginRules(treeShaking),
      "write-good-comments": fixupPluginRules(writeGoodComments),
    },

    rules: {
      "promise/always-return": 0,
      "promise/no-return-in-finally": 0,
      "promise/no-multiple-resolved": 0,
      "import/export": 0,
      "import/no-deprecated": 0,
      "import/no-relative-packages": 0,
      "import/no-import-module-exports": 0,
      "import/no-empty-named-blocks": 0,
      "import/no-useless-path-segments": 0,
      "import/no-extraneous-dependencies": 0,
      "import/named": 0,
      "import/newline-after-import": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-magic-numbers": 0,
      "@typescript-eslint/promise-function-async": 0,
      "@typescript-eslint/strict-boolean-expressions": 0,
      "import/extensions": 0,
      "import/no-unresolved": 0,
      "max-statements": [0, { max: 15 }],
      "no-underscore-dangle": 0,
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

      "@stylistic/quotes": 0,

      "@stylistic/ts/key-spacing": [
        1,
        {
          align: "colon",
        },
      ],

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

      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-unsafe-argument": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/prefer-nullish-coalescing": 0,
      "@typescript-eslint/prefer-readonly-parameter-types": 0,
      "align-assignments/align-assignments": 1,
      camelcase: 0,
      "canonical/destructuring-property-newline": 0,
      "canonical/export-specifier-newline": 0,
      "canonical/import-specifier-newline": 0,
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
    ...html.configs["flat/recommended"],
    files: ["**/*.html"],
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
    },
  },

  // Svelte
  ...svelte.configs.all,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    // See more details at: https://typescript-eslint.io/packages/parser/
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'], // Add support for additional file extensions, such as .svelte
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
      }
    }
  },
  {
    rules: {
      // Override or add rule settings here, such as:
      // 'svelte/rule-name': 'error'
    }
  }
]
