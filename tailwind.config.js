// tailwind.config.js
module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	mode: 'jit',
	darkMode: false,
	theme: {
		extend: {
			colors: {
				gray: 'var(--gray)',
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
			},
		},
	},
	plugins: [],
}
