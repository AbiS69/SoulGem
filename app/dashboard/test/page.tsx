'use client';
import React, { useState, useEffect } from 'react';
import questionsData from './questions.json';
import './Test.scss';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '@/components/Sidebar/Sidebar';
import Gallery from '@/components/Gallery/Gallery';

import 'react-toastify/dist/ReactToastify.css';
import { set } from 'mongoose';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleTranslate from '@/components/GoogleTranslate';

// export const dynamic1 = 'force-dynamic';

const Test = () => {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [result, setResult] = useState('');
	const [activeTab, setActiveTab] = useState(''); // Default to the first tab
	const router = useRouter();
	const searchParams = useSearchParams();
	const format = searchParams.get('format');

	console.log('format', searchParams.get('format'));

	let tab: string;
	if (format === 'smartphone') {
		tab = 'Smartphone Wallpaper';
	} else if (format === 'desktop') {
		tab = 'Desktop Wallpaper';
	} else tab = 'Test';

		

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

	useEffect(() => {
		// Sélectionnez aléatoirement 3 questions pour chaque axe
		const selectedQuestions: { [key: string]: any[] } = {};

		for (let axis of ['axis_EI', 'axis_SN', 'axis_TF', 'axis_JP']) {
			selectedQuestions[axis] = [];
			while (selectedQuestions[axis].length < 3) {
				const randomIndex = Math.floor(
					Math.random() * questionsData[axis].length
				);
				const selectedQuestion = questionsData[axis][randomIndex];
				if (!selectedQuestions[axis].includes(selectedQuestion)) {
					selectedQuestions[axis].push(selectedQuestion);
				}
			}
		}

		// Créer un tableau de toutes les questions
		const interleavedQuestions: any[] = [];

		// Obtenez les tableaux de questions pour chaque axe
		const questionArrays = Object.values(selectedQuestions);

		// Assurez-vous que chaque tableau de questions a au moins 12 questions
		for (let questionArray of questionArrays) {
			while (questionArray.length < 12) {
				questionArray.push(null);
			}
		}

		// Intercaler les questions
		for (let i = 0; i < 12; i++) {
			for (let questionArray of questionArrays) {
				if (questionArray[i] !== null) {
					interleavedQuestions.push(questionArray[i]);
				}
			}
		}

		setQuestions(interleavedQuestions);
	}, []);

	const handleAnswer = (questionIndex, answerIndex) => {
		setAnswers((prevState) => ({
			...prevState,
			[questionIndex]: answerIndex,
		}));
	};

	const getMBTI = (answers) => {
		console.log('answers', answers);

		if (Object.keys(answers).length == 12) {
			let index = 0;

			const counts = {
				axis_EI: { E: 0, I: 0 },
				axis_SN: { S: 0, N: 0 },
				axis_TF: { T: 0, F: 0 },
				axis_JP: { J: 0, P: 0 },
			};

			for (let question in answers) {
				if (answers[question] !== undefined && answers[question] !== null) {
					while (index < 12) {
						if (index % 4 === 0) {
							if (answers[index] === 1) {
								counts.axis_EI.I++;
							} else {
								counts.axis_EI.E++;
							}
						} else if (index % 4 === 1) {
							if (answers[index] === 1) {
								counts.axis_SN.N++;
							} else {
								counts.axis_SN.S++;
							}
						} else if (index % 4 === 2) {
							if (answers[index] === 1) {
								counts.axis_TF.F++;
							} else {
								counts.axis_TF.T++;
							}
						} else if (index % 4 === 3) {
							if (answers[index] === 1) {
								counts.axis_JP.P++;
							} else {
								counts.axis_JP.J++;
							}
						}
						index++;
					}
				}
			}

			const acronym = [
				counts.axis_EI.E >= 2 ? 'E' : 'I',
				counts.axis_SN.S >= 2 ? 'S' : 'N',
				counts.axis_TF.T >= 2 ? 'T' : 'F',
				counts.axis_JP.J >= 2 ? 'J' : 'P',
			].join('');

			console.log('acronym', acronym);
			setResult(acronym);
			router.push(`/dashboard/create?format=${format}`);
			localStorage.setItem('acronym', acronym);
		} else {
			toast('You forgot a few questions!', {
				position: 'bottom-right',
			});
		}
	};

	return (
		<>
			<div className="flex w-full test">
				<Sidebar onTabClick={handleTabClick} activeTab={tab} />
				<div className="w-full mx-auto content-area justify-center flex-grow test-container">
					<Header />
					<div className="test-header">
						<h1 className="test-title mx-auto font-bold text-center">
							Take the test!
						</h1>
						<h4 className="text-primary text-center mx-auto italic">
							Try to be as objective as possible
						</h4>
					</div>
					<div className="px-8 mt-8">
						<div className="flex flex-col justify-center text-center matrix-text pre-wrap">
							<span className="line">
								The color and placement of answers are totally random, there is no meaning in having
								more red answers than blue 🔴🔵
							</span>
						</div>
						<div className="morpheus">
							<img
								src={'/assets/morpheus.png'}
								alt="Morpheus proposing you the red and blue pills"
								width={200}
								height={200}
							/>
						</div>
						{questions.map((question, index) => (
							<div className="flex flex-col items-center mt-8" key={index}>
								<p className="my-4 index">{index + 1}</p>
								<p className="mb-4 text-center">{question.question}</p>
								<div className="grid grid-cols-2 gap-4 flex items-center answers">
									<button
										onClick={() => handleAnswer(index, 0)}
										className={`btn btn-outline justify-self-end red-pill ${
											answers[index] === 0 ? 'red-pill-active' : ''
										} `}
									>
										{question.answers[0]}
									</button>
									<button
										onClick={() => handleAnswer(index, 1)}
										className={`btn btn-outline justify-self-start blue-pill ${
											answers[index] === 1 ? 'blue-pill-active' : ''
										} `}
									>
										{question.answers[1]}
									</button>
								</div>
							</div>
						))}
						<button
							className="btn btn-accent flex justify-center w-2/3 md:w-1/3 mx-auto results-button"
							onClick={() => getMBTI(answers)}
						>
							Get the results
						</button>
					</div>
					<ToastContainer />
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Test;
