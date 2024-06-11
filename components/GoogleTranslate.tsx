'use client';

import { useEffect } from 'react';
import './global.scss';

declare global {
	interface Window {
		google: any;
		googleTranslateElementInit: () => void;
		googleTranslateInitialized: boolean;
	}
}

export default function GoogleTranslate() {
	useEffect(() => {
		const scriptId = 'google-translate-script';

		// Function to load the Google Translate script
		const loadGoogleTranslateScript = () => {
			const script = document.createElement('script');
			script.src =
				'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
			script.async = true;
			script.id = scriptId;
			document.body.appendChild(script);
		};

		// Function to set the googtrans cookie
		const setGoogleTranslateCookie = () => {
			document.cookie =
				'googtrans=/en; expires=Thu, 31 Dec 2099 23:59:59 GMT; path=/';
		};

		// Set the cookie
		setGoogleTranslateCookie();

		// Initialize the Google Translate widget
		window.googleTranslateElementInit = function () {
			if (!window.googleTranslateInitialized) {
				new window.google.translate.TranslateElement(
					{
						pageLanguage: 'en', // Default language of the page
						includedLanguages: 'en,fr,es,zh-CN,hi,ar,pt,bn,ru,ja,de', // Supported languages
						autoDisplay: false, // Disable auto-display of translation suggestions
					},
					'google_translate_element' // ID of the container element
				);
				// This will find the pop up and remove it from the page
				var removePopup = document.getElementById('goog-gt-tt');
				removePopup.parentNode.removeChild(removePopup);
				window.googleTranslateInitialized = true;
			}
		};

		// // Dictionary of possible translations for SoulGem
		// const translations = {
		//   "SoulGem": ["SoulGem", "Gemme d'âme", "Joya del Alma", "Gema del Alma", "宝石", "हिरा", "جوهرة الروح", "Jóia da Alma", "রত্ন", "Душевный камень", "魂の宝石"]
		//   // Add more translations for other languages as needed
		// };

		// // Function to replace translated words
		// const replaceTranslatedWords = () => {
		//   document.querySelectorAll("h1, h2, h3, p, span, div, strong").forEach((node) => {
		//     let text = node.innerHTML;
		//     for (const [original, replacements] of Object.entries(translations)) {
		//       replacements.forEach((replacement) => {
		//         text = text.replace(new RegExp(replacement, "g"), original);
		//       });
		//     }
		//     node.innerHTML = text;
		//   });
		// };

		// // Observe mutations in the body to detect when Google Translate has modified the content
		// const observer = new MutationObserver((mutations) => {
		//   mutations.forEach(() => {
		//     replaceTranslatedWords();
		//   });
		// });

		// observer.observe(document.body, { childList: true, subtree: true });

		// Load the script if it hasn't been loaded yet
		if (!document.getElementById(scriptId)) {
			loadGoogleTranslateScript();
		}

		// Cleanup on unmount
		return () => {
			if (window.googleTranslateInitialized) {
				delete window.googleTranslateInitialized;
				const script = document.getElementById(scriptId);
				if (script) script.remove();
				const gtElement = document.getElementById('google_translate_element');
				if (gtElement) gtElement.innerHTML = '';
			}
		};
	}, []);

	return <div id="google_translate_element" className="translate-widget"></div>;
}
