// vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno, extractorSvelte } from "unocss";
var vite_config_default = defineConfig({
  plugins: [
    AutoImport({
      imports: ["svelte", "svelte/store", "svelte/transition"],
      dts: "./src/assets/types/auto-imports.d.ts"
    }),
    Unocss({
      mode: "svelte-scoped",
      extractors: [extractorSvelte],
      presets: [
        presetAttributify({}),
        presetUno()
      ]
    }),
    svelte({
      emitCss: false
    })
  ],
  build: {
    lib: {
      name: "chunk",
      fileName: "chunk",
      entry: "./src/main.ts",
      formats: ["umd"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmlrb3MucGV0ZWluYXRvcy9UYW1wZXJtb25rZXkvbW9iaWxlLWRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmlrb3MucGV0ZWluYXRvcy9UYW1wZXJtb25rZXkvbW9iaWxlLWRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uaWtvcy5wZXRlaW5hdG9zL1RhbXBlcm1vbmtleS9tb2JpbGUtZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcbmltcG9ydCB7IHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRVbm8sIGV4dHJhY3RvclN2ZWx0ZSB9IGZyb20gJ3Vub2Nzcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3N2ZWx0ZScsICdzdmVsdGUvc3RvcmUnLCAnc3ZlbHRlL3RyYW5zaXRpb24nXSxcbiAgICAgIGR0czogJy4vc3JjL2Fzc2V0cy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgfSksXG4gICAgVW5vY3NzKHtcbiAgICAgIG1vZGU6XCJzdmVsdGUtc2NvcGVkXCIsXG4gICAgICBleHRyYWN0b3JzOiBbZXh0cmFjdG9yU3ZlbHRlXSxcbiAgICAgIHByZXNldHM6IFtcbiAgICAgICAgcHJlc2V0QXR0cmlidXRpZnkoe1xuICAgICAgICAgIC8qIHByZXNldCBvcHRpb25zICovXG4gICAgICAgIH0pLFxuICAgICAgICBwcmVzZXRVbm8oKSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgc3ZlbHRlKHtcbiAgICAgIGVtaXRDc3M6IGZhbHNlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgbmFtZTogJ2NodW5rJyxcbiAgICAgIGZpbGVOYW1lOiAnY2h1bmsnLFxuICAgICAgZW50cnk6ICcuL3NyYy9tYWluLnRzJyxcbiAgICAgIGZvcm1hdHM6IFsndW1kJ10sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixTQUFTLGNBQWM7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsbUJBQW1CLFdBQVcsdUJBQXVCO0FBRzlELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxVQUFVLGdCQUFnQixtQkFBbUI7QUFBQSxNQUN2RCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxNQUFLO0FBQUEsTUFDTCxZQUFZLENBQUMsZUFBZTtBQUFBLE1BQzVCLFNBQVM7QUFBQSxRQUNQLGtCQUFrQixDQUVsQixDQUFDO0FBQUEsUUFDRCxVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFNBQVMsQ0FBQyxLQUFLO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
