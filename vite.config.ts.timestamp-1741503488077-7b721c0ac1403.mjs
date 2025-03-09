// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Co_Edit/AiEditor/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dts from "file:///D:/Projects/Co_Edit/AiEditor/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Projects\\Co_Edit\\AiEditor";
var vite_config_default = defineConfig({
  define: { "process.env": {} },
  build: {
    minify: "esbuild",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./src/index.ts"),
      name: "aieditor",
      // fileName: (format) => `index.${format}.js`,
      fileName: `index`,
      formats: ["es", "cjs"]
    }
  },
  plugins: [
    dts({ rollupTypes: true })
    // legacy({
    //     targets: ['defaults', 'not IE 11','chrome 52'],
    // }),
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxDb19FZGl0XFxcXEFpRWRpdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxDb19FZGl0XFxcXEFpRWRpdG9yXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9Db19FZGl0L0FpRWRpdG9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGRlZmluZTogeydwcm9jZXNzLmVudic6IHt9fSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiBcImVzYnVpbGRcIixcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaW5kZXgudHMnKSxcclxuICAgICAgICAgICAgbmFtZTogJ2FpZWRpdG9yJyxcclxuICAgICAgICAgICAgLy8gZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogYGluZGV4YCxcclxuICAgICAgICAgICAgZm9ybWF0czogWydlcycsICdjanMnXVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW2R0cyh7cm9sbHVwVHlwZXM6IHRydWV9KSxcclxuICAgICAgICAvLyBsZWdhY3koe1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRzOiBbJ2RlZmF1bHRzJywgJ25vdCBJRSAxMScsJ2Nocm9tZSA1MiddLFxyXG4gICAgICAgIC8vIH0pLFxyXG4gICAgXSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4USxTQUFRLG9CQUFtQjtBQUN6UyxTQUFRLGVBQWM7QUFDdEIsT0FBTyxTQUFTO0FBRmhCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFFBQVEsRUFBQyxlQUFlLENBQUMsRUFBQztBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUMxQyxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN6QjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUFDLElBQUksRUFBQyxhQUFhLEtBQUksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSWpDO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
