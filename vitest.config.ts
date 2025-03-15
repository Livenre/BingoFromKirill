import { defineConfig } from 'vitest/config'

export default defineConfig({
  
    test: {
      browser: {
        enabled: true,
        provider: "playwright",
        testerHtmlPath: "./index.html",
        // https://vitest.dev/guide/browser/playwright
        instances: [
          {
            name: "chromium",
            browser: "chromium",
          },
        ],
      },
    },
    
  });