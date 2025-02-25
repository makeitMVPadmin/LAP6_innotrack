/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
		fontFamily: {
			fraunces: ["Fraunces", "sans-serif"],
			montserrat: ["Montserrat", "sans-serif"],
			inter: ["Inter", "sans-serif"]

		},
		content: {
			listStar: "url('./src/assets/icons/star-filled.svg')"
		},
		keyframes: {
			modalSlideIn: {
				"0%": {
					top: "100%"
				},
				"100%": {
					top: "50%"
				}
			},
			modalSlideOut: {
				"0%": {
					top: "50%"
				},
				"100%": {
					top: "100%"
				}
			},
			fadeInOut: {
				"0%":{
					opacity: 1
				},
				"50%":{
					opacity: 0
				},
				"100%": {
					opacity: 1
				}
			}
		},
		animation: {
			"modalSlideInBottom": "modalSlideIn 0.1s linear",
			"modalSlideOutBottom": "modalSlideOut 0.1s linear",
			"fadeInOut": "fadeInOut 0.5s linear"
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			secondayDefault: `#FFD22F`,
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
