/** @type {import('tailwindcss/tailwind-config')} */
export default {
    content : [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme   : {
        extend: {},
    },
    plugins : [],
    safelist: [
        'bg-orange-500/20',
        'bg-blue-500/20',
        'bg-red-500/20',
        'bg-gray-500/20',
        'bg-yellow-500/20',
        'bg-orange-500',
        'bg-blue-500',
        'bg-red-500',
        'bg-gray-500',
        'bg-yellow-500',
    ]
}
