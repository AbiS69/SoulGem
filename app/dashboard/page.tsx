"use client";

import config from "@/config";
import { useSession } from "next-auth/react";
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import Pricing from '@/components/Pricing';
import BuyCredits from '@/components/BuyCredits/BuyCredits';

const UserInfo = dynamic(() => import("./UserInfo"), { ssr: false });

export const dynamic1 = "force-dynamic";

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState("Tab 1"); // Default to the first tab

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

  const renderContent = () => {
    switch (activeTab) {
      case 'Tab 1':
        return <BuyCredits/>;
      case 'Tab 2':
        return <div>Content for Tab 2</div>;
      case 'Tab 3':
        return <div>Content for Tab 3</div>;
      default:
        return <div>Content not found</div>;
    }
  };

	return (
		<main className="min-h-screen p-8 pb-24">
			<Sidebar onTabClick={handleTabClick} activeTab={activeTab} />
			<section className="max-w-xl mx-auto space-y-8">
				{/* <h1 className="text-3xl md:text-4xl font-extrabold">
					Subscribe to get access:
				</h1> */}
        
        <div className="content-area">{renderContent()}</div>
				
			</section>
		</main>
	);
}
