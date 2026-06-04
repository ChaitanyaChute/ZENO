import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["app/(workspace)/_components/_dashboard-new.tsx"],
  },
  ...nextJsConfig,
];
