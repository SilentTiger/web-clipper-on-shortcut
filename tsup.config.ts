import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  platform: "browser",
  minify: true,
  outExtension() {
    return {
      js: `.js`,
    };
  }
});
