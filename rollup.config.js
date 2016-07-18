import typescript from "rollup-plugin-typescript";

export default {
  entry: "./index.ts",
  dest: "build/game.js",

  plugins: [
    typescript()
  ]
}