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
        fontSize: {
            fluidh2: "clamp(1.25rem, 0.896rem + 1.509vw, 1.5rem)",
            fluidp: "clamp(0.875rem, 0.698rem + 0.755vw, 1rem)"
        },
        spacing: {
            fluid: "clamp(1.5rem, -24rem + 50vw, 3.75rem)",
            fluidy: "clamp(1rem, -0.415rem + 6.038vw, 2rem)",
            fluidx: "clamp(1rem, -4.66rem + 24.151vw, 5rem)",
            fluidgap: "clamp(0.5rem, -0.208rem + 3.019vw, 1rem)"
        },
        gap: {
            fluid: "clamp(0.5rem, -0.208rem + 3.019vw, 1rem)"
        },
        screens: {
            "3xl": "107.25rem"
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
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
			secondayDefault: `#FFD22F`,
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            boxShadow: {
                customButton:
                    "0px 1px 3px 0px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
;
