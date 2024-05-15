"use client";

import config from "@/config";
import { useSession } from "next-auth/react";
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import Pricing from "@/components/Pricing";
import BuyCredits from "@/components/BuyCredits/BuyCredits";
import "./dashboard.scss";
import Gallery from "@/components/Gallery/Gallery";
import Test from '@/components/Test/Test';

const UserInfo = dynamic(() => import("./UserInfo"), { ssr: false });

export const dynamic1 = "force-dynamic";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Gallery"); // Default to the first tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Buy Credits":
        return <BuyCredits />;
      case "Gallery":
        return <Gallery />;
      case "Test":
        return <Test />;
      case "Smartphone Wallpaper":
        return <div>Samrtphone Wallpaper</div>;
      case "Desktop Wallpaper":
        return <div>Desktop Wallpaper</div>;
      case "Duo":
        return <div>Duo</div>;
      case "Prints":
        return <div>Prints</div>;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <main className="min-h-screen dashboard-container">
      <Sidebar onTabClick={handleTabClick} activeTab={activeTab} />
      <section className="w-full mx-auto space-y-8">
        {/* <h1 className="text-3xl md:text-4xl font-extrabold">
					Subscribe to get access:
				</h1> */}

        <div className="content-area justify-center">{renderContent()}</div>
      </section>
    </main>
  );
}
