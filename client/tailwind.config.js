export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1A56DB', // Royal Blue
                secondary: '#10B981', // Emerald Green
                accent: '#F59E0B', // Amber
                dark: '#111827',
                light: '#F3F4F6'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
