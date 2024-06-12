import themes from 'daisyui/src/theming/themes';
import { ConfigProps } from './types/config';

const config = {
	// REQUIRED
	appName: 'SoulGem',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription: 'Transform your personality into art.',
	// REQUIRED (no https://, not trialing slash at the end, just the naked domain)
	domainName: 'mysoulgem.com',
	crisp: {
		// Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
		id: '4c98dc7e-5720-4fea-bf21-048735d4f495',
		// Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
		onlyShowOnRoutes: ['/'],
	},
	stripe: {
		// Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		plans: [
			{
				// REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
				priceId:
					process.env.NODE_ENV === 'development'
						? //? "price_1Niyy5AxyNprDp7iZIqEyD2h"
						  'price_1PIWozFY60tLCCEBJR8VIIhb'
						: //? ""
						  'price_1PQulsFY60tLCCEBvSuyZAmf',
				//  REQUIRED - Name of the plan, displayed on the pricing page
				name: 'Just curious',
				// A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
				description: 'Perfect to try and create a few artworks',
				// The price you want to display, the one user will be charged on Stripe.
				price: 1,
				planText: 'Get 20 credits',
				credits: 20,
				// If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
				// priceAnchor: 4,
				features: [
					{ name: '1 HD square artwork' },
					{ name: 'or 1 basic wallpaper' },
					{
						name: 'or 2 basic square artworks',
					},
				],
			},
			{
				// REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
				priceId:
					process.env.NODE_ENV === 'development'
						? //? "price_1Niyy5AxyNprDp7iZIqEyD2h"
						  'price_1P7hKhFY60tLCCEBjXj5BFyg'
						: //? ""
						  'price_1PQunHFY60tLCCEBsBJ4A6sg',
				//  REQUIRED - Name of the plan, displayed on the pricing page
				name: 'Discover yourself',
				// A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
				description: 'Discover facets of your personality',
				// The price you want to display, the one user will be charged on Stripe.
				price: 4,
				planText: 'Get 100 credits',
				credits: 100,
				// If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
				priceAnchor: 8,
				isFeatured: true,
				features: [
					{ name: '4 HD wallpapers' },
					{ name: 'or 6 HD square artwork' },
					{ name: 'or 8 basic wallpapers' },
					{ name: 'or 12 basic square artworks'},
					{ name: 'or create your own mix' },
				],
			},
			{
				priceId:
					process.env.NODE_ENV === 'development'
						? 'price_1PDxPfFY60tLCCEBgrxqfDJZ'
						: 'price_1PQuocFY60tLCCEBervUNKeE',
				// This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
				name: 'Soul Artist',
				description: 'Explore your inner self in every aspect',
				planText: 'Get 500 credits',
				credits: 500,
				price: 12,
				// priceAnchor: 25,
				features: [
					{ name: '20 HD wallpapers' },
					{ name: 'or 33 HD square artwork' },
					{ name: 'or 41 basic wallpapers' },
					{ name: 'or 62 basic square artworks' },
					{ name: 'or create your own mix' },
				],
			},
		],
	},
	aws: {
		// If you use AWS S3/Cloudfront, put values in here
		bucket: 'bucket-name',
		bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
		cdn: 'https://cdn-id.cloudfront.net/',
	},
	mailgun: {
		// subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
		subdomain: 'mail',
		// REQUIRED — Email 'From' field to be used when sending magic login links
		fromNoReply: `SoulGem <noreply@mail.mysoulgem.com>`,
		// REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
		fromAdmin: `Antoine at SoulGem <antoine@mail.mysoulgem.com>`,
		// Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
		// supportEmail: 'antoine@mail.mysoulgem.com',
		supportEmail: 'antoinebou44@gmail.com',
		// When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
		forwardRepliesTo: 'antoinebou44@gmail.com',
	},
	colors: {
		// REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
		theme: 'synthwave',
		// REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
		// OR you can just do this to use a custom color: main: "#f37055". HEX only.
		main: themes['synthwave']['primary'],
	},
	auth: {
		// REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
		loginUrl: '/api/auth/signin',
		// REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
		callbackUrl: '/dashboard/test',
	},
} as ConfigProps;

export default config;
