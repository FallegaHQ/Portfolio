import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {copyFileSync, existsSync} from 'fs'
import * as path from 'node:path'
import {seoFilesPlugin} from "./vite-plugins/seoFilesPlugin";

// https://vite.dev/config/

export default defineConfig(({mode}) => {
    return {
        plugins: [
            tailwindcss(),
            react({
                      // Optimize JSX runtime
                      jsxRuntime: 'automatic'
                  }),
            {
                name: 'copy-support-files',
                writeBundle() {
                    if(existsSync('public/github-proxy.php')) {
                        copyFileSync('public/github-proxy.php', 'dist/github-proxy.php');
                    }
                    if(existsSync('public/profile-data.json')) {
                        copyFileSync('public/profile-data.json', 'dist/profile-data.json');
                    }
                    if(existsSync('public/.htaccess')) {
                        copyFileSync('public/.htaccess', 'dist/.htaccess');
                    }
                }
            },
            seoFilesPlugin()
        ],
        resolve: {
            alias: {
                '@'          : path.resolve(__dirname, './src'),
                '@components': path.resolve(__dirname, './src/components'),
                '@hooks'     : path.resolve(__dirname, './src/hooks'),
                '@utils'     : path.resolve(__dirname, './src/utils'),
                '@types'     : path.resolve(__dirname, './src/types'),
                '@assets'    : path.resolve(__dirname, './src/assets')
            },
        },

        // Optimized build configuration
        build: {
            target: 'es2015',
            minify: 'terser',

            rollupOptions: {
                output: {
                    // Optimize chunk splitting
                    manualChunks: {
                        // Vendor chunks
                        'react-vendor': [
                            'react',
                            'react-dom'
                        ],
                        'router'      : ['react-router-dom'],
                        'tailwindcss'    : ['tailwindcss'],

                        // Utility chunks
                        'utils': [
                            'date-fns'
                        ],
                    },

                    // Optimize file names for caching
                    entryFileNames: 'assets/[name]-[hash].js',
                    chunkFileNames: 'assets/[name]-[hash].js',
                    assetFileNames: (assetInfo) => {
                        const info = assetInfo.name?.split('.');
                        if(!info) {
                            return 'assets/[name]-[hash][extname]';
                        }
                        const ext = info[info.length - 1];
                        if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                            return `assets/images/[name]-[hash][extname]`;
                        }
                        if(/woff|woff2|eot|ttf|otf/i.test(ext)) {
                            return `assets/fonts/[name]-[hash][extname]`;
                        }
                        return `assets/[name]-[hash][extname]`;
                    }
                }
            },

            // Report bundle size
            reportCompressedSize : true,
            chunkSizeWarningLimit: 1000,

            // Source maps for production debugging
            sourcemap: mode !== 'production' ? 'inline' : false
        },

        // CSS optimization
        css: {
            modules            : {
                localsConvention: 'camelCase'
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/styles/variables.scss";`
                }
            }
        },

        // Development server
        server: {
            port: 3000,
            open: true,
            cors: true
        },

        // Preview server
        preview: {
            port: 4173,
            open: true
        },

        // Define environment variables
        define: {
            __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
            __BUILD_TIME__ : JSON.stringify(new Date().toISOString())
        },

        // Optimize dependencies
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                'react-router-dom'
            ],
            exclude: [
                '@vite/client',
                '@vite/env'
            ]
        }
    }
})
