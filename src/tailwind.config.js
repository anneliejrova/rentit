export default {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    "bg-accent",
    "bg-accent-light", 
    "hover:bg-accent",
    "hover:bg-accent-light",
    "ring-accent",
    "opacity-0",
    "opacity-100",
    "-translate-x-4",
    "translate-x-0",
    "translate-x-4",
    "pointer-events-none",
    "transition-all",
    "duration-200",
    "ease-out",,
  ],
  theme: {
    extend: {
        colors: {
            accent: 'var(--accent)',
            'accent-light': 'var(--accent-light)'
        }
    }
  },  
  plugins: [],
};
