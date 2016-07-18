import typescript from "rollup-plugin-typescript";

export default {
  entry: "./Index.ts",
  dest: "build/game.js",

  plugins: [
    typescript()
  ]
}