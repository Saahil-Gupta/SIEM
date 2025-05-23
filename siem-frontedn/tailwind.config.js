/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            primary: "#1E293B",   // dark blue-gray for sidebar/header
            accent: "#3B82F6",    // blue for highlights/buttons
            danger: "#EF4444",    // red for alerts
            warning: "#FACC15",   // yellow for warnings
            success: "#10B981",   // green for OK
            muted: "#64748B",     // gray for text
        },
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
        },
        },
    },
    plugins: [],
};
