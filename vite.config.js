import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Simplified manual chunking strategy for stable packages
        manualChunks: (id) => {
          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          
          // Large UI libraries
          if (id.includes('@floating-ui') || id.includes('framer-motion') || 
              id.includes('react-select') || id.includes('react-modal')) {
            return 'ui-vendor'
          }
          
          // Charts and visualization
          if (id.includes('apexcharts') || id.includes('d3-') || 
              id.includes('react-simple-maps')) {
            return 'charts'
          }
          
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform') || 
              id.includes('react-number-format') || id.includes('zod')) {
            return 'forms'
          }
          
          // Calendar
          if (id.includes('@fullcalendar') || id.includes('dayjs')) {
            return 'calendar'
          }
          
          // Tables
          if (id.includes('@tanstack') || id.includes('react-csv')) {
            return 'tables'
          }
          
          // Syntax highlighter (large)
          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-highlighter'
          }
          
          // Utilities
          if (id.includes('lodash') || id.includes('axios') || 
              id.includes('classnames') || id.includes('js-cookie') ||
              id.includes('marked') || id.includes('tailwind-merge')) {
            return 'utils'
          }
          
          // Other large packages
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    // Optimize build performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Rollup options for better tree shaking
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Optimize dev dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'axios',
      'classnames',
      'lodash'
    ],
    exclude: [
      'react-syntax-highlighter'
    ]
  }
})
