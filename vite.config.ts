import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {copyFileSync, existsSync} from 'fs'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
                                plugins: [
                                    tailwindcss(),
                                    react(),
                                    {
                                        name: 'copy-support-files',
                                        writeBundle(){
                                            if(existsSync('src/github-proxy.php')){
                                                copyFileSync('src/github-proxy.php', 'dist/github-proxy.php');
                                            }
                                            if(existsSync('src/profile-data.json')){
                                                copyFileSync('src/profile-data.json', 'dist/profile-data.json');
                                            }
                                        }
                                    }
                                ],
                                resolve: {
                                    alias: {
                                        '@': path.resolve(__dirname, './src'),
                                    },
                                },
                            })
