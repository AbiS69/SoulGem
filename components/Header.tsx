'use client';

import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ButtonSignin from './ButtonSignin';
import logo from '@/app/icon.png';
import config from '@/config';
import GoogleTranslate from './GoogleTranslate';
import UserInfo from '@/app/dashboard/UserInfo';
import ButtonAccount from './ButtonAccount';

const links: {
	href: string;
	label: string;
}[] = [
	{
		href: '/dashboard/credits',
		label: 'Buy Credits',
	},
	{
		href: '/dashboard/gallery',
		label: 'Gallery',
	},
	{
		href: '/dashboard/test',
		label: 'Take the test!',
	},
];

const cta: JSX.Element = <ButtonSignin extraStyle="btn-primary" />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
	useEffect(() => {
		setIsOpen(false);
	}, [searchParams]);

	return (
		<header className="bg-base-300">
			<nav
				className="container flex items-center justify-between px-4 py-4 mx-auto"
				aria-label="Global"
			>
				<GoogleTranslate />
				{/* Your logo/name on large screens */}
				<div className="flex lg:flex-1">
					<Link
						className="flex items-center gap-2 shrink-0 notranslate "
						href="/"
						title={`${config.appName} homepage`}
					>
						<Image
							src={logo}
							alt={`${config.appName} logo`}
							className="w-8"
							placeholder="blur"
							priority={true}
							width={32}
							height={32}
						/>
						<span className="font-extrabold text-lg notranslate">SoulGem</span>
					</Link>
				</div>
				{/* Burger button to open menu on mobile */}
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
						onClick={() => setIsOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 text-base-content"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</div>

				{/* Your links on large screens */}
				<div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
					{links.map((link) => (
						<Link
							href={link.href}
							key={link.href}
							className="link link-hover"
							title={link.label}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* CTA on large screens */}

				<div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
				<GoogleTranslate />
			</nav>

			{/* Mobile menu, show/hide based on menu state. */}
			<div className={`relative z-50 ${isOpen ? '' : 'hidden'}`}>
				<div
					className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
				>
					{/* Your logo/name on small screens */}
					<div className="flex items-center justify-between">
						<Link
							className="flex items-center gap-2 shrink-0 notranslate"
							title={`${config.appName} homepage`}
							href="/"
						>
							<Image
								src={logo}
								alt={`${config.appName} logo`}
								className="w-8"
								placeholder="blur"
								priority={true}
								width={32}
								height={32}
							/>
							<span className="font-extrabold text-lg notranslate">SoulGem</span>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5"
							onClick={() => setIsOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Your links on small screens */}
					<div className="flow-root mt-6">
						<div className="py-4">
							<div className="flex flex-col gap-y-4 items-start">
								{links.map((link) => (
									<Link
										href={link.href}
										key={link.href}
										className="link link-hover"
										title={link.label}
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>

						<div className="divider"></div>
						{/* Your CTA on small screens */}
						<div className="flex flex-col flex-col items-center">
							<ButtonAccount />
							<div className="mt-8">
								<UserInfo />
							</div>

						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
