import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const markup = renderToString(createElement(App));
  const path = new URL("../dist/public/index.html", import.meta.url);
  const html = await readFile(path, "utf8");
  if (!html.includes('<div id="root"></div>'))
    throw new Error("Prerender root marker not found");
  await writeFile(
    path,
    html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  );
  console.log("Prerendered portfolio homepage with meaningful initial HTML.");
} finally {
  await server.close();
}
