// uno.config.ts
import { defineConfig, presetWebFonts, presetUno } from 'unocss';
import { presetScrollbar } from 'unocss-preset-scrollbar';
export default defineConfig({
	shortcuts: {
		// shortcuts to multiple utilities
		btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
		'btn-green': 'text-white bg-green-500 hover:bg-green-700',
		// single utility alias
		red: 'text-red-100',
		'flex-center': 'flex justify-center items-center'
	},
	presets: [
		presetUno(),
		presetWebFonts({
			// use axios with an https proxy
			/*
			customFetch: (url) =>
				axios.get(url, {
					httpsAgent: new ProxyAgent('https://localhost:7890'),
				}),
            */
			provider: 'google',
			fonts: {
				title: 'Work Sans',
				content: 'Merriweather'
				// TODO: https://unocss.dev/presets/web-fonts
			}
		}),
		presetScrollbar()
	]
});
