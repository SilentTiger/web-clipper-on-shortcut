import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  platform: "browser",
  minify: false,
  outExtension() {
    return {
      js: `.js`,
    };
  }
});
