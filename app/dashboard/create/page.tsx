"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import BuyCredits from "@/components/BuyCredits/BuyCredits";
import "./create.scss";
import promptData from "./prompts.json";
import mbtiData from "./MBTI.json";
import Gallery from "@/components/Gallery/Gallery";
import exp from "constants";
import { set } from "nprogress";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const dynamic1 = "force-dynamic";

export default function Create() {
	const [acronym, setAcronym] = useState("");
	const [activeTab, setActiveTab] = useState("Gallery"); // Default to the first tab
	const [selectedFormat, setSelectedFormat] = useState("Smartphone Wallpaper");
	const [MBTIdescription, setMBTIdescription] = useState("");
	const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	const [explanation, setExplanation] = useState("");
	const [title, setTitle] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

	const generateImage = async (quality: string) => {
		setLoading(true);
		let prompt = promptData.prompts.find((p) => p.type === acronym).prompt;

		let size;
		if (selectedFormat === "Square Artwork") {
			size = "1024x1024";
		} else if (selectedFormat === "Smartphone Wallpaper") {
			size = "1024x1792";
		} else if (selectedFormat === "Desktop Wallpaper") {
			size = "1792x1024";
		}

		quality = quality === "HD" ? "hd" : "standard";

		console.log("prompt", prompt);
		console.log("size", size);
		console.log("quality", quality);

		const response = await fetch("/api/generateImage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt, size, quality }),
		});

		const data = await response.json();
		setImageUrl(data.imageUrl);
		setLoading(false);
	};

	const handleFormatChange = (event) => {
		setSelectedFormat(event.target.value);
	};

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
				// return <Test />;
				return (window.location.href = "/dashboard/test");
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

	const calculateCredits = (definition) => {
		switch (selectedFormat) {
			case "Square Artwork":
				if (definition === "HD") {
					return 15;
				} else if (definition === "SD") {
					return 4;
				} else {
					return 0;
				}
			case "Smartphone Wallpaper":
				if (definition === "HD") {
					return 25;
				} else if (definition === "SD") {
					return 12;
				} else {
					return 0;
				}
			case "Desktop Wallpaper":
				if (definition === "HD") {
					return 25;
				} else if (definition === "SD") {
					return 12;
				} else {
					return 0;
				}
			default:
				return 0;
		}
	};

	useEffect(() => {
		const storedAcronym = localStorage.getItem("acronym");
		setAcronym(storedAcronym);
		const personality = mbtiData.personalities.find(
			(p) => p.type === storedAcronym
		);
		setTitle(personality?.title);
		setMBTIdescription(personality?.description);
		setExplanation(
			promptData.prompts.find((p) => p.type === storedAcronym).explanation
		);
		setInitialLoading(false);
	}, []);

	return (
		<>
			<main className="min-h-screen dashboard-container flex w-full">
				<Sidebar onTabClick={handleTabClick} activeTab={activeTab} />
				<div className="results-container flex-grow">
					<Header />

					<div className="results-header">
						<h1 className="mbti-title mx-auto font-bold">Your results</h1>
						<h4 className="text-primary text-center mx-auto italic">
							Guess what? You are unique.
						</h4>
					</div>
					{initialLoading ? (
						<span className="loading loading-lg flex mx-auto"></span>
					) : (
						<section className="space-y-8 w-2/3 mx-auto mt-16">
							<h2 className="text-center mx-auto text-4xl font-bold">
								The {title}.
							</h2>
							<div className="mbti-description mx-auto">
								<p className="text-lg opacity-80 leading-relaxed">
									{MBTIdescription}
								</p>
							</div>
							{!imageUrl && (
								<div className="w-full mx-auto">
									<h2 className="mx-auto text-accent further font-bold">
										Go further in your self-discovery journey and craft your
										unique masterpiece
									</h2>
									<h3 className="fit text-primary font-bold">
										Choose your format:
									</h3>
									<div className="formats flex justify-center w-full mx-auto space-x-16">
										<div className="format-choice w-32">
											<div className="h-64 flex justify-center">
												<Image
													src="/assets/square.svg"
													alt="choice"
													width={200}
													height={200}
													onClick={() =>
														document.getElementById("square-radio").click()
													}
												/>
											</div>
											<input
												id="square-radio"
												type="radio"
												name="radio-2"
												value="Square Artwork"
												className="radio radio-primary"
												onChange={handleFormatChange}
											/>
										</div>
										<div className="format-choice w-32">
											<div className="h-64 flex justify-center">
												<Image
													src="/assets/iphone.svg"
													alt="choice"
													width={400}
													height={400}
													onClick={() =>
														document.getElementById("iphone-radio").click()
													}
												/>
											</div>
											<input
												id="iphone-radio"
												type="radio"
												name="radio-2"
												value="Smartphone Wallpaper"
												className="radio radio-primary"
												onChange={handleFormatChange}
												checked={selectedFormat === "Smartphone Wallpaper"}
											/>
										</div>
										<div className="format-choice w-60">
											<div className="h-64 flex justify-center">
												<Image
													src="/assets/macbook.svg"
													alt="choice"
													width={800}
													height={800}
													onClick={() =>
														document.getElementById("macbook-radio").click()
													}
												/>
											</div>
											<input
												id="macbook-radio"
												type="radio"
												name="radio-2"
												value="Desktop Wallpaper"
												className="radio radio-primary"
												onChange={handleFormatChange}
											/>
										</div>
									</div>
									<div className="h-16 flex items-center">
										{loading && (
											<span className="loading loading-ring loading-lg flex mx-auto"></span>
										)}
									</div>
									<div className="flex px-36 justify-center">
										<button
											className="btn btn-accent flex justify-center w-1/2 leading-6 h-16 mx-4 hover:scale-90"
											onClick={() => generateImage("HD")}
										>
											Create {selectedFormat} in HD
											<br />
											{calculateCredits("HD")} credits
										</button>
										<button
											className="btn btn-primary flex justify-center w-1/2 leading-6 h-16 mx-4 hover:scale-90"
											onClick={() => generateImage("SD")}
										>
											Create {selectedFormat}
											<br />
											{calculateCredits("SD")} credits
										</button>
									</div>
								</div>
							)}
							<div className="justify-center pb-24">{renderContent()}</div>
							{imageUrl && (
								<>
									<div className="w-1/2 mx-auto">
										<img src={imageUrl} alt="Generated" />
									</div>
									<h2 className="text-primary fit my-16 font-bold">
										Your SoulGem Is Unique, Be Proud & Showcase It To The World!
									</h2>
									<p className="mbti-explanation text-lg opacity-80 leading-relaxed mx-auto">
										{explanation}
									</p>
								</>
							)}
							{/* <div className="w-1/2 mx-auto ">
					<Image
						className="w-full mx-auto"
						src="/assets/square.svg"
						alt="choice"
						width={200}
						height={200}
					/>
				</div>
				{acronym}
				<h2 className="text fit my-16">
					Your SoulGem Is Unique, Be Proud & Showcase It To The World!
				</h2>
				<p className="mbti-explanation text-lg opacity-80 leading-relaxed mx-auto">
					{explanation}
				</p> */}
						</section>
					)}
					<Footer />
				</div>
			</main>
		</>
	);
}
