import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

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
            name: "crtElt",
            file: pkg.types,
            format: "es",
        },
        plugins: [dts()],
    },
    {
        input: "src/index.ts",
        output: {
            name: "crtElt",
            file: pkg.main.replace(".min", ""),
            format: "umd",
        },
        plugins: [...basePlugins],
    },
    {
        input: "src/index.ts",
        output: {
            name: "crtElt",
            file: pkg.main,
            format: "umd",
        },
        plugins: [...basePlugins, terser()],
    },
];
