import { useState } from "react";
import ButtonAccount from "../ButtonAccount";
import "./Sidebar.scss";

const Sidebar = ({ onTabClick, activeTab }) => {
	return (
		<>
			<ButtonAccount />
			<div className="sidebar">
				<div
					onClick={() => onTabClick("Tab 1")}
					//className={`tab ${activeTab === "Tab 1" ? "active" : ""}`}
					className="btn btn-primary"
				>
					Buy Credits
				</div>
				<div
					onClick={() => onTabClick("Tab 2")}
					className={`tab ${activeTab === "Tab 2" ? "active" : ""}`}
				>
					Tab 2
				</div>
				<div
					onClick={() => onTabClick("Tab 3")}
					className={`tab ${activeTab === "Tab 3" ? "active" : ""}`}
				>
					Tab 3
				</div>
			</div>
		</>
	);
};

export default Sidebar;
