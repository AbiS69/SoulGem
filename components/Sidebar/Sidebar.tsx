import { useState } from "react";
import ButtonAccount from "../ButtonAccount";
import "./Sidebar.scss";
import UserInfo from "@/app/dashboard/UserInfo";

const Sidebar = ({ onTabClick, activeTab }) => {
	return (
		<>
			<div className="sidebar border-primary p-2">
				<div className="my-4">
					<ButtonAccount />
				</div>
				<div className="">
					<UserInfo />
				</div>
				<div
					onClick={() => onTabClick("Buy Credits")}
					//className={`tab ${activeTab === "Tab 1" ? "active" : ""}`}
					className="btn btn-accent buy-credits hover:scale-90 outline my-4"
				>
					Buy Credits
				</div>
				<div
					onClick={() => onTabClick("Gallery")}
					className={`btn btn-primary btn-outline text-white font-bold  my-4 sidebar-btn  ${
						activeTab === "Gallery" ? "gallery-active " : ""
					}`}
				>
					Gallery
				</div>
				<div
					onClick={() => onTabClick("Test")}
					className={`btn btn-secondary btn-outline outline my-4 sidebar-btn hover:animate-wiggle  ${
						activeTab === "Test" ? "test-active" : ""
					}`}
				>
					Take the test!
				</div>
				<div className="text-grey-700 text-xs justify-start text-primary mt-4">
					Create your Soulgem
				</div>
				<div className="create-section border-accent">
					<div
						onClick={() => onTabClick("Smartphone Wallpaper")}
						className={`tab hover:text-primary ${
							activeTab === "Smartphone Wallpaper" ? "active" : ""
						}`}
					>
						Smartphone Wallpaper
					</div>
					<div
						onClick={() => onTabClick("Desktop Wallpaper")}
						className={` tab hover:text-primary ${
							activeTab === "Desktop Wallpaper" ? "active" : ""
						}`}
					>
						Desktop Wallpaper
					</div>
					<div
						onClick={() => onTabClick("Duo")}
						className={` tab hover:text-primary ${
							activeTab === "Duo" ? "active" : ""
						}`}
					>
						Duo
					</div>
					<div
						onClick={() => onTabClick("Prints")}
						className={` tab hover:text-primary ${
							activeTab === "Prints" ? "active" : ""
						}`}
					>
						Print your SoulGem!
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
