/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["animate-loader"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border, #e5e7eb)",
        input: "var(--color-border, #e5e7eb)",
        ring: "var(--color-primary, #0A47C4)",
        background: "var(--color-background, #ffffff)",
        foreground: "var(--color-text, #1a1a1a)",
        primary: {
          DEFAULT: "var(--color-primary, #0A47C4)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #F5F7FA)",
          foreground: "var(--color-text, #1a1a1a)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #FF7A00)",
          foreground: "#ffffff",
        },
        text: "var(--color-text, #1a1a1a)",
      },
      fontFamily: {
        primary: "var(--font-primary, 'Inter', sans-serif)",
        secondary: "var(--font-secondary, 'Roboto', sans-serif)",
      },
      fontSize: {
        xs: "var(--text-xs, 0.75rem)",
        sm: "var(--text-sm, 0.875rem)",
        base: "var(--text-base, 1rem)",
        lg: "var(--text-lg, 1.125rem)",
        xl: "var(--text-xl, 1.5rem)",
        xxl: "var(--text-xxl, 2rem)",
      },
      borderRadius: {
        none: "var(--radius-none, 0px)",
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.5rem)",
        lg: "var(--radius-lg, 0.75rem)",
        xl: "var(--radius-xl, 1.25rem)",
        full: "var(--radius-full, 9999px)",
      },
      spacing: {
        xs: "var(--spacing-xs, 0.25rem)",
        sm: "var(--spacing-sm, 0.5rem)",
        md: "var(--spacing-md, 1rem)",
        lg: "var(--spacing-lg, 1.5rem)",
        xl: "var(--spacing-xl, 2rem)",
      },
      boxShadow: {
        sm: "var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05))",
        md: "var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1))",
        lg: "var(--shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.15))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "loader-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        loader: 'loader-spin 1s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
