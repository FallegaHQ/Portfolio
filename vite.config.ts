import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {copyFileSync, existsSync} from 'fs'

// https://vite.dev/config/
export default defineConfig({
                                plugins: [
                                    tailwindcss(),
                                    react(),
                                    {
                                        name: 'copy-php-proxy',
                                        writeBundle(){
                                            if(existsSync('src/github-proxy.php')){
                                                copyFileSync('src/github-proxy.php', 'dist/github-proxy.php');
                                            }
                                        }
                                    }
                                ],
                            })
