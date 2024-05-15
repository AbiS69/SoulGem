import React, { useState, useEffect } from "react";
import questionsData from "./questions.json";
import "./Test.scss";
import { set } from 'mongoose';

const Test = () => {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [result, setResult] = useState("");

	useEffect(() => {
		// Sélectionnez aléatoirement 3 questions pour chaque axe
		const selectedQuestions: { [key: string]: any[] } = {};

		for (let axis of ["axis_EI", "axis_SN", "axis_TF", "axis_JP"]) {
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

		console.log("interleaved questions", interleavedQuestions);
		setQuestions(interleavedQuestions);
	}, []);

	const handleAnswer = (questionIndex, answerIndex) => {
		setAnswers((prevState) => ({
			...prevState,
			[questionIndex]: answerIndex,
		}));
		console.log("questionIndex", questionIndex);
		console.log("answerIndex", answerIndex);
		console.log("answers", answers);
	};

	const getMBTI = (answers) => {
		let index = 0;

		const counts = {
			axis_EI: { E: 0, I: 0 },
			axis_SN: { S: 0, N: 0 },
			axis_TF: { T: 0, F: 0 },
			axis_JP: { J: 0, P: 0 },
		};

		for (let question in answers) {
			while (index < 11) {
				if (index % 4 === 0) {
					if (answers[question] === 1) {
						counts.axis_EI.I++;
					} else {
						counts.axis_EI.E++;
					}
				} else if (index % 4 === 1) {
					if (answers[question] === 1) {
						counts.axis_SN.N++;
					} else {
						counts.axis_SN.S++;
					}
				} else if (index % 4 === 1) {
					if (answers[question] === 1) {
						counts.axis_TF.F++;
					} else {
						counts.axis_TF.T++;
					}
				} else if (index % 4 === 1) {
					if (answers[question] === 1) {
						counts.axis_JP.P++;
					} else {
						counts.axis_JP.J++;
					}
				}
				index++;
			}

			console.log("counts", counts);

			const acronym = [
				counts.axis_EI.E >= counts.axis_EI.I ? "E" : "I",
				counts.axis_SN.S >= counts.axis_SN.N ? "S" : "N",
				counts.axis_TF.T >= counts.axis_TF.F ? "T" : "F",
				counts.axis_JP.J >= counts.axis_JP.P ? "J" : "P",
			].join("");

			setResult(acronym);

			return acronym;
		}
	};

	return (
		<div>
			{questions.map((question, index) => (
				<div className="flex flex-col items-center mt-8" key={index}>
					<p className="my-4 index">{index + 1}</p>
					<p className="mb-4">{question.question}</p>
					<div className="grid grid-cols-2 gap-4">
						<button
							onClick={() => handleAnswer(index, 0)}
							className={`btn btn-outline justify-self-end blue-pill ${
								answers[index] === 0 ? "blue-pill-active" : "blue-pill"
							} `}
						>
							{question.answers[0]}
						</button>
						<button
							onClick={() => handleAnswer(index, 1)}
							className={`btn btn-outline justify-self-start red-pill ${
								answers[index] === 1 ? "red-pill-active" : ""
							} `}
						>
							{question.answers[1]}
						</button>
					</div>
				</div>
			))}
			<button
				className="btn btn-primary mt-8 flex justify-center w-1/2 mx-auto"
				onClick={() => console.log(getMBTI(answers))}
			>
				Get the result
			</button>
			<div className="mt-8">{result}</div>
		</div>
	);
};

export default Test;
