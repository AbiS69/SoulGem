"use client";

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import "./duo.scss";    

export const dynamic1 = 'force-dynamic';

export default function Duo() {
	const [activeTab, setActiveTab] = useState(''); // Default to the first tab
	const router = useRouter();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

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
			<main className="min-h-screen flex w-full">
				<Sidebar onTabClick={handleTabClick} activeTab="Duo" />
				<section className="w-full mx-auto duo-container">
					<Header />
					<div className="duo-header">
						<h1 className="duo-title mx-auto font-bold opacity-80 text-center">
							Duo SoulGem
						</h1>
						<h4 className="text-primary text-center mx-auto italic">
							Coming soon!
						</h4>
					</div>
					<div className="text-center mx-auto mt-56">
                        You will soon be able to generate awesome SoulGems with your SoulMate! Stay tuned!
                    </div>
				</section>
			</main>
		</>
	);
}
