import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
         //색 설정 

        //배경색
        'background-color': '#FAF8F5',

        //label 색상
        'label-dark-color': '#151515',
        'label-darkgrey-color': '#3A3835',
        'label-darkgreygrey-color': '#3A3835',
        'label-darkgreygreygrey-color': '#A49F99',
        'label-grey-color': '#DDDAD7',
        'label-greywhite-color': '#F6F5F3',

        //primary 색상 
        'primary-brown-color': '#755428',
        'primary-brownbrown-color': '#A87939',
        'primary-brownbrownbrown-color': '#DB9D4A',
        'primary-yellow-color': '#F5C584',

        //secondary 색상 
        'secondary-green-color': '#586452',
        'secondary-greengreen-color': '#86957E',
        'secondary-whitegreen-color': '#A6BB9C',
        'secondary-whitegreengreen-color': '#DAE9D3',

        //status 색상 
        'status-red-color': '#ED1B18',
        'status-blue-color': '#2A62F4',


        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },


      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        'xs': {max: "375px"},
        '2xs': {'min': '376px', 'max': '639px'},
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config