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
import Test from '@/app/dashboard/test/page';
import { useRouter } from 'next/navigation'
import Link from 'next/link';


const UserInfo = dynamic(() => import("./UserInfo"), { ssr: false });

export const dynamic1 = "force-dynamic";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(""); // Default to the first tab
  const router = useRouter()
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
  const router = useRouter();

  switch (activeTab) {
    case "Buy Credits":
      router.push("/dashboard/credits");
      break;
    case "Gallery":
      return <Gallery />;
    case "Test":
      router.push("/dashboard/test?format=smartphone");
      break;
    case "Smartphone Wallpaper":
      router.push("/dashboard/test?format=smartphone");
      break;
    case "Desktop Wallpaper":
      router.push("/dashboard/test?format=desktop");
      break;
    // Add other cases as needed
    default:
      return <div>Content not found</div>;
  }
};

  return (
    <main className="min-h-screen dashboard-container bg-base-200">
      <Sidebar onTabClick={handleTabClick} activeTab="Test" />
      <section className="w-full mx-auto space-y-8">
        {/* <h1 className="text-3xl md:text-4xl font-extrabold">
					Subscribe to get access:
				</h1> */}

        <div className="w-0 h-0">{renderContent()}</div>
      </section>
    </main>
  );
}
