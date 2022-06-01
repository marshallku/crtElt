import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const basePlugins = [
    babel({
        babelHelpers: "bundled",
        plugins: ["transform-object-rest-spread"],
    }),
    typescript(),
];

export default [
    {
        input: "src/index.ts",
        output: {
            file: pkg.module,
            format: "es",
        },
        plugins: [...basePlugins],
    },
    {
        input: "src/index.ts",
        output: {
            name: "Zoom",
            file: pkg.main.replace(".min", ""),
            format: "umd",
        },
        plugins: [...basePlugins],
    },
    {
        input: "src/index.ts",
        output: {
            name: "Zoom",
            file: pkg.main,
            format: "umd",
        },
        plugins: [...basePlugins, terser()],
    },
];
