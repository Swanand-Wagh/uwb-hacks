import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

interface IViteConfigArgs {
  mode: string;
  command: string;
}

export default (args: IViteConfigArgs) => {
  const generateScopedName =
    args.mode === "development" ? "__SmartApp___[local]___[hash:base64:5]" : "__SmartApp___[hash:base64:5]";

  return defineConfig({
    plugins: [react()],
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};
