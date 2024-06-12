'use client';

import { useEffect, useState } from 'react';
import './credits.scss';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar/Sidebar';
import BuyCredits from '@/components/BuyCredits/BuyCredits';
import Gallery from '@/components/Gallery/Gallery';
import exp from 'constants';
import { set } from 'nprogress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleTranslate from '@/components/GoogleTranslate';

// export const dynamic1 = 'force-dynamic';

export default function Credits() {
	const [activeTab, setActiveTab] = useState(''); // Default to the first tab
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		setInitialLoading(false);
	}, []);

	useEffect(() => {
		switch (activeTab) {
			case 'Buy Credits':
				router.push('/dashboard/credits');
				break;
			case 'Test':
				router.push('/dashboard/test');
				break;
			case 'Smartphone Wallpaper':
				router.push('/dashboard/test?format=smartphone');
				break;
			case 'Desktop Wallpaper':
				router.push('/dashboard/test?format=desktop');
				break;
			case 'Gallery':
				router.push('/dashboard/gallery');
				break;
			case 'Duo':
				router.push('/dashboard/duo');
				break;
			case 'Print':
				router.push('/dashboard/print');
				break;
		}
	}, [activeTab, router]);

	return (
		<>
			<main className="min-h-screen dashboard-container flex w-full">
				<Sidebar onTabClick={handleTabClick} activeTab="Credits" />
				<div className="credits-container flex-grow">
					<Header />
					{initialLoading ? (
						<div className="w-full h-full bg-base-200">
							<span className="loading loading-lg flex mx-auto"></span>
						</div>
					) : (
						<section className="w-11/12 md:w-2/3 mx-auto mt-16">
							<BuyCredits />
						</section>
					)}
					<Footer />
				</div>
			</main>
		</>
	);
}
