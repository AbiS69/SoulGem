'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar/Sidebar';
import BuyCredits from '@/components/BuyCredits/BuyCredits';
import './create.scss';
import promptData from './prompts.json';
import mbtiData from './MBTI.json';
import Gallery from '@/components/Gallery/Gallery';
import exp from 'constants';
import { set } from 'nprogress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ImageViewer from 'react-simple-image-viewer';
import AutoCarousel from '@/components/carousel/AutoCarousel';

export const dynamic1 = 'force-dynamic';

export default function Create() {
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [acronym, setAcronym] = useState('');
	const [activeTab, setActiveTab] = useState('');
	const searchParams = useSearchParams();
	const format = searchParams.get('format');
	let formatTemp = 'Smartphone Wallpaper';
	if (format === 'square') {
		formatTemp = 'Profile Picture/Square Artwork';
	} else if (format === 'smatphone') {
		formatTemp = 'Smartphone Wallpaper';
	} else if (format === 'desktop') {
		formatTemp = 'Desktop Wallpaper';
	}
	const [selectedFormat, setSelectedFormat] = useState(formatTemp);
	console.log('selectedFormat', selectedFormat);
	const [MBTIdescription, setMBTIdescription] = useState('');
	const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	const [explanation, setExplanation] = useState('');
	const [title, setTitle] = useState('');
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [images, setImages] = useState([]);
	const [gender, setGender] = useState('other');
	const credits =
		typeof window !== 'undefined'
			? parseInt(window.localStorage.getItem('credits') || '0')
			: 0;
	const [watermarking, setWatermarking] = useState(false);
	let watermark: boolean;

	useEffect(() => {
		console.log('Image URL:', imageUrl);
		setImages([imageUrl]);
	}, [imageUrl]);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(0);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const generateImage = async (quality: string) => {
		setLoading(true);
		let prompt = promptData.prompts.find((p) => p.type === acronym).prompt;
		prompt =
			'I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:' +
			prompt;

		let genderedPrompt;
		if (gender == 'male') {
			genderedPrompt = prompt + ' The face should be slightly masculine.';
		} else if (gender == 'female') {
			genderedPrompt = prompt + ' The face should be slightly feminine.';
		} else {
			genderedPrompt = prompt + ' The face must be a non-binary face';
		}

		if (quality === 'WATERMARK') {
			setWatermarking(true);
			watermark = true;
		} else {
			setWatermarking(false);
			watermark = false;
		}

		let size: string;
		if (quality === 'WATERMARK') {
			size = '1024x1024';
		} else if (selectedFormat === 'Profile Picture/Square Artwork') {
			size = '1024x1024';
		} else if (selectedFormat === 'Smartphone Wallpaper') {
			size = '1024x1792';
			genderedPrompt =
				genderedPrompt + ' The image should be in portrait mode.';
		} else if (selectedFormat === 'Desktop Wallpaper') {
			size = '1792x1024';
			genderedPrompt =
				genderedPrompt + ' The image should be in landscape mode.';
		}

		let definition = quality === 'HD' ? 'hd' : 'standard';

		const credits = parseInt(localStorage.getItem('credits') || '0');

		let creditsToSubstract: number;
		if (quality === 'WATERMARK') {
			creditsToSubstract = 4;
		} else {
			creditsToSubstract = calculateCredits(quality);
		}

		if (credits < creditsToSubstract) {
			router.push('/dashboard/credits');
			return;
		}

		const response = await fetch('/api/generateImage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				genderedPrompt,
				size,
				definition,
				userId,
				watermark,
				acronym,
			}),
		});

		if (!response.ok) {
			console.error('Failed to generate image');
			setLoading(false);
			return;
		}

		const data = await response.json();
		setImageUrl(data.imageUrl);

		const userResponse = await fetch('/api/updateUserCredits', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId, creditsToSubstract }),
		});

		const responseBody = await userResponse.json();
		let updatedCredits = responseBody.credits;
		localStorage.setItem('credits', updatedCredits);

		if (!userResponse.ok) {
			console.error('Failed to update user credits');
		}
		setLoading(false);
	};

	const handleFormatChange = (event) => {
		setSelectedFormat(event.target.value);
	};

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

	const calculateCredits = (definition) => {
		console.log('selectedFormat', selectedFormat);
		console.log('definition', definition);
		switch (selectedFormat) {
			case 'Profile Picture/Square Artwork':
				if (definition === 'HD') {
					return 15;
				} else if (definition === 'SD') {
					return 4;
				} else {
					return 0;
				}
			case 'Smartphone Wallpaper':
				if (definition === 'HD') {
					return 25;
				} else if (definition === 'SD') {
					return 12;
				} else {
					return 0;
				}
			case 'Desktop Wallpaper':
				if (definition === 'HD') {
					return 25;
				} else if (definition === 'SD') {
					return 12;
				} else {
					return 0;
				}
			default:
				return 0;
		}
	};

	useEffect(() => {
		const storedAcronym = localStorage.getItem('acronym');
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
			<main className="min-h-screen create-container flex w-full">
				<Sidebar onTabClick={handleTabClick} activeTab="Test" />
				<div className="results-container flex-grow">
					<Header />

					<div className="results-header">
						<h1 className="mbti-title mx-auto font-bold opacity-80 text-center">
							Your results
						</h1>
						<h4 className="text-primary text-center mx-auto italic">
							Guess what? You are unique.
						</h4>
					</div>
					{initialLoading ? (
						<div className="w-full h-full bg-base-200">
							<span className="loading loading-lg flex mx-auto"></span>
						</div>
					) : (
						<section className=" w-5/6 lg:w-2/3 mx-auto mt-10 md:mt-18 lg:mt-24">
							<div className="text-center text-lg mb-1 italic">You are...</div>
							<h2 className="text-center mx-auto text-5xl font-bold italic mbti-type mt-4">
								The <span className="text-primary italic">{title}</span>.
							</h2>
							<div className="mbti-description mx-auto mt-10 md:mt-18 lg:mt-24">
								<p className="text-sm md:text-md lg:text-lg opacity-80 leading-relaxed">
									{MBTIdescription}
								</p>
							</div>
							{loading ? (
								<div className="bg-base-300 mt-8 loader w-64 h-64 mx-auto">
									<span className="loading loading-lg flex mx-auto"></span>
								</div>
							) : (
								!imageUrl && (
									<div className="w-full mx-auto">
										<h2 className="mx-auto text-sm md:text-md text-accent further font-bold text-center">
											Go further in your self-discovery journey and craft your
											unique masterpiece
										</h2>
										<h3 className="fit text-primary font-bold mb-2 mt-8">
											Choose your format:
										</h3>
										<div className="formats flex justify-center w-full mx-auto">
											<div className="format-choice w-32">
												<div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 square">
													<Image
														src="/assets/square.svg"
														alt="choice"
														width={200}
														height={200}
														onClick={() =>
															document.getElementById('square-radio').click()
														}
													/>
												</div>
												<input
													id="square-radio"
													type="radio"
													name="radio-2"
													value="Profile Picture/Square Artwork"
													className="radio radio-primary"
													onChange={handleFormatChange}
													checked={
														selectedFormat === 'Profile Picture/Square Artwork'
													}
												/>
											</div>
											<div className="format-choice w-32">
												<div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 square">
													<Image
														src="/assets/iphone.svg"
														alt="choice"
														width={400}
														height={400}
														onClick={() =>
															document.getElementById('iphone-radio').click()
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
													checked={selectedFormat === 'Smartphone Wallpaper'}
												/>
											</div>
											<div className="format-choice w-60">
												<div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 mac">
													<Image
														src="/assets/macbook.svg"
														alt="choice"
														width={800}
														height={800}
														onClick={() =>
															document.getElementById('macbook-radio').click()
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
													checked={selectedFormat === 'Desktop Wallpaper'}
												/>
											</div>
										</div>
										<div className="gender-selection">
											<h3 className="text-white font-bold mb-2">
												Select your gender:
											</h3>
											<div className="gender-options">
												<label>
													<input
														type="radio"
														name="gender"
														value="male"
														onChange={(e) => setGender(e.target.value)}
														checked={gender === 'male'}
														className="radio radio-accent gender-radio"
													/>
													Male
												</label>
												<label>
													<input
														type="radio"
														name="gender"
														value="female"
														onChange={(e) => setGender(e.target.value)}
														checked={gender === 'female'}
														className="radio radio-accent gender-radio"
													/>
													Female
												</label>
												<label>
													<input
														type="radio"
														name="gender"
														value="other"
														onChange={(e) => setGender(e.target.value)}
														checked={gender === 'other'}
														className="radio radio-accent gender-radio"
													/>
													Other
												</label>
											</div>
										</div>
										<div className="md:h-16 flex items-center"></div>
										{credits < calculateCredits('SD') &&
										credits < calculateCredits('HD') &&
										credits > 3 ? (
											<div className="flex justify-center flex-col items-center">
												<button
													className="btn btn-secondary flex justify-center w-2/5 leading-6 h-16 mr-4 hover:scale-90 mb-2"
													onClick={() => generateImage('WATERMARK')}
												>
													<div className="line-container">
														<div>I want to try!</div>
														<div>4 credits</div>
													</div>
												</button>
												<div className="mb-12 text-center">
													This will create a watermarked standard square image.
													<br />
													<br />
													Get more credits to create an awesome HD
													<span className="notranslate">SoulGem</span> in any
													format without a watermark!
												</div>
											</div>
										) : (
											<></>
										)}
										<div className="mt-8 md:mt-2 flex-column-reverse md:flex justify-center">
											<button
												className="btn btn-primary create-btn mr-4 xl:w-2/5 text-white"
												onClick={() => generateImage('HD')}
											>
												<div className="line-container">
													<div>{selectedFormat}</div>
													<div className="text-lg">
														in HD: {calculateCredits('HD')} credits
													</div>
												</div>
											</button>
											<button
												className="btn btn-primary btn-outline create-btn ml-4 xl:w-2/5 text-white"
												onClick={() => generateImage('SD')}
											>
												<div className="line-container">
													<div>{selectedFormat}</div>
													<div className="text-lg">
														{calculateCredits('SD')} credits
													</div>
												</div>
											</button>
										</div>
									</div>
								)
							)}
							{imageUrl && (
								<>
									<div className="soulgem mx-auto mt-8">
										{selectedFormat === 'Profile Picture/Square Artwork' && (
											<Image
												src={imageUrl}
												width={400}
												height={400}
												alt={explanation}
												onClick={() => openImageViewer(1)}
											/>
										)}
										{selectedFormat === 'Smartphone Wallpaper' && (
											<Image
												src={imageUrl}
												width={400}
												height={800}
												alt={explanation}
												onClick={() => openImageViewer(1)}
											/>
										)}
										{selectedFormat === 'Desktop Wallpaper' && (
											<Image
												src={imageUrl}
												width={800}
												height={400}
												alt={explanation}
												onClick={() => openImageViewer(1)}
											/>
										)}

										{isViewerOpen && (
											<ImageViewer
												src={images}
												currentIndex={currentImage}
												disableScroll={false}
												closeOnClickOutside={true}
												onClose={closeImageViewer}
											/>
										)}
									</div>
									<h2 className="text-primary fit mt-4 font-bold">
										Your SoulGem Is Unique, Be Proud & Showcase It To The World!
									</h2>
									<p className="mbti-explanation mt-12 text-lg opacity-80 leading-relaxed mx-auto">
										{explanation}
									</p>
									<h2 className="text-primary fit font-bold mb-36">
										You will find each of your SoulGems in your gallery
									</h2>
									{watermark && (
										<div>
											<div className="text-center text-lg mt-8 italic text-center">
												Like your SoulGem? Create an even better one with
												greater details and without a watermark! <br /> Get more
												credits to unlock the full potential of your unique
												personality.
											</div>
										</div>
									)}
									{!watermark && (
										<>
											<div className="text-center text-lg mt-8 italic text-center">
												Take a new test, create a new SoulGem and discover a new
												facet of your personality!
											</div>
											<div className="flex justify-center">
												<Link href="/dashboard/test">
													<button className="btn btn-secondary mt-8 flex justify-center mx-auto">
														Take a new test
													</button>
												</Link>
											</div>
										</>
									)}
									<div className="flex justify-center">
										<Link href="/dashboard/gallery">
											<button className="btn btn-accent flex justify-center mx-auto">
												Go to your gallery
											</button>
										</Link>
									</div>
								</>
							)}
							<div className="text-center text-lg mt-16 italic text-center">
								Take a look at some of the amazing HD SoulGems created by our
								lovely users :
							</div>
							<AutoCarousel />
						</section>
					)}
					<Footer />
				</div>
			</main>
		</>
	);
}
