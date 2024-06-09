'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ImageViewer from 'react-simple-image-viewer';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header';
import './gallery.scss';
import Image from 'next/image';
import GoogleTranslate from '@/components/GoogleTranslate';

export const dynamic = 'force-dynamic';

function Gallery() {
	//   const router = useRouter();
	const { data: session } = useSession();
	const [activeTab, setActiveTab] = useState('');
	const userId = session?.user?.id;
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const router = useRouter();

	const openImageViewer = useCallback((index) => {
		setCurrentImage(0);
		setIsViewerOpen(true);
	}, []);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	useEffect(() => {
		if (userId) {
			fetchImages();
		}
	}, [userId]);

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
            case 'Print your SoulGem!':
                router.push('/dashboard/print');
                break;
		}
	}, [activeTab, router]);

	const fetchImages = async () => {
		try {
			const response = await fetch(`/api/userImages/${userId}`);
			if (!response.ok) {
				throw new Error('Failed to fetch images');
			}
			const data = await response.json();
			console.log(data);
			setImages(data.images);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<>
			<main>
				<Sidebar onTabClick={handleTabClick} activeTab="Gallery" />

				<div className="gallery-container flex-grow">
					<Header />
					<div className="gallery-header">
						<h1 className="gallery-title1 mx-auto font-bold opacity-80 text-center">
							Your gallery
						</h1>
						<h4 className="text-primary text-center mx-auto italic">
							Pretty uniques, huh?
						</h4>
					</div>
					{loading ? (
						<div className="w-full h-full bg-base-200">
							<span className="loading loading-lg flex mx-auto"></span>
						</div>
					) : (
						<>
							<div className="text-center mx-auto mt-8 px-8">
								You can either screenshot or right-click and then click "Save"
								to then use the image as you wish !
							</div>
							<div className="gallery-images">
								{images.length === 0 ? (
									<p>You haven't created any SoulGems yet, take the test!</p>
								) : (
									<>
										<div className="gallery-title text-center">
											Profile Pictures/Square Artworks
										</div>
										<div className="gallery-format">
											{images.map(
												(image, index) =>
													image.format === '1024x1024' && (
														<div key={index} style={{ margin: '10px' }}>
															<Image
																src={image.url}
																alt={`Image ${index}`}
																className="gallery-image"
																onClick={() => {
																	setCurrentImage(index);
																	setIsViewerOpen(true);
																}}
																width={200}
																height={200}
															/>
														</div>
													)
											)}
										</div>
										<div className="gallery-title text-center">Smartphone Wallpapers</div>
										<div className="gallery-format">
											{images.map(
												(image, index) =>
													image.format === '1024x1792' && (
														<div key={index} style={{ margin: '10px' }}>
															<Image
																src={image.url}
																alt={`Image ${index}`}
																className="gallery-image"
																onClick={() => {
																	setCurrentImage(index);
																	setIsViewerOpen(true);
																}}
																width={200}
																height={200}
															/>
														</div>
													)
											)}
										</div>
										<div className="gallery-title text-center">Desktop Wallpapers</div>
										<div className="gallery-format">
											{images.map(
												(image, index) =>
													image.format === '1792x1024' && (
														<div key={index} style={{ margin: '10px' }}>
															<Image
																src={image.url}
																alt={`Image ${index}`}
																className="gallery-image"
																onClick={() => {
																	setCurrentImage(index);
																	setIsViewerOpen(true);
																}}
																width={400}
																height={200}
															/>
														</div>
													)
											)}
										</div>
										{isViewerOpen && (
											<ImageViewer
												src={images.map((image) => image.url)}
												currentIndex={currentImage}
												disableScroll={false}
												closeOnClickOutside={true}
												onClose={closeImageViewer}
											/>
										)}
									</>
								)}
							</div>
						</>
					)}
				</div>
				<Footer />
			</main>
		</>
	);
}

export default Gallery;
