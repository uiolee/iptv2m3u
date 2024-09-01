/* 
NOTICE:

This is the eslint config of this project itself. 
Not the part of this package.

 */

import { ts, js } from "eslint-config-uiolee";
export default [
  js,
  ...ts.map((config) => {
    if (config.files == null) {
      config.files = ["**/*.{mts,cts,ts}"];
    }
    if (config.rules) {
      config.rules["no-unused-vars"] = "warn";
    }
    return config;
  }),

  { ignores: ["lib/**", "dist/**", "bin/**"] },
];
