// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    { files: "*.svelte", options: { parser: "svelte" } },
  ],
  semi: false,
  tabWidth: 2,
  arrowParens: "avoid",
  bracketSameLine: false,
  htmlWhitespaceSensitivity: "ignore",
}
