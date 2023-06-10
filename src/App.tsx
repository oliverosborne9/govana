import NavigationArrow from './Scrollers';
import EnterWordForm from './Form';
import InfoSection from './Clues';
import ImageBox from './Image';
import {useEffect, useState} from 'react';
import QuestionCard from './Card';
import Keyboard from './Keyboard';
import {MessageHandler, WinHandler} from './HandlerFormats';
import setStreak from './WinTracker';
import TopBar from './TopBar';

type Question = {
	frequency: number;
	syllables: number;
	url: string;
	word: string;
};

const App = () => {
	const [slides, setSlides] = useState<Question[]>(Array(5));
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [gameStart, setGameStart] = useState<number>(Date.now());
	const [currQuestionNum, setCurrQuestion] = useState<number>(0);
	const [answers, setAnswers] = useState<boolean[]>(Array(5).fill(false));
	const [clues, setClues] = useState<boolean[]>(Array(5).fill(false));
	const [enteredAnswers, setEnteredAnswers] = useState<string[]>(Array(5).fill(''));

	async function loadSet(slides: Question[]) {
		// Preload all images so that they are not first loaded when navigated to
		const images = slides.map(async slide =>
			new Promise((resolve, reject) => {
				const img = new Image();
				img.src = slide.url;
				img.onload = () => {
					resolve(img);
				};

				img.onerror = () => {
					reject();
				};
			}));
		await Promise.all(images);

		// Set the questions, defaulting all answers to incorrect
		setSlides(slides);
		setAnswers(Array(slides.length).fill(false));
	}

	useEffect(() => {
		const backend = import.meta.env.VITE_BACKEND_API;
		const backendLoc = (backend.toLowerCase() === 'local') ? 'dev/sampleData.json' : `${backend}/api/words/today`;
		fetch(backendLoc)
			.then(async response => response.json())
			.then(loadSet)
			.catch(() => {
				setError(true);
			})
			.finally(() => {
				setLoading(false);
				setGameStart(Date.now());
			});
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	function isCurrCorrect() {
		return answers[currQuestionNum];
	}

	function isCurrClue() {
		return clues[currQuestionNum];
	}

	function setClue() {
		const updatedClues = clues.slice();
		updatedClues[currQuestionNum] = true;
		setClues(updatedClues);
	}

	function goToPrevious() {
		const isFirstSlide = currQuestionNum === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currQuestionNum - 1;
		setCurrQuestion(newIndex);
	}

	function goToNext() {
		const isLastSlide = currQuestionNum === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currQuestionNum + 1;
		setCurrQuestion(newIndex);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			goToPrevious();
		} else if (event.key === 'ArrowRight') {
			goToNext();
		} else if (event.key === '?') {
			if (!isCurrCorrect()) {
				setClue();
			}
		} else if (event.key === 'Backspace' || event.key === 'Delete') {
			if (!isCurrCorrect()) {
				removeLetter();
			}
		} else if (
			event.key.length === 1
      && event.key.toUpperCase() >= 'A'
      && event.key.toUpperCase() <= 'Z'
		) {
			if (
				!isCurrClue()
        || slides[currQuestionNum].word.includes(event.key.toLowerCase())
			) {
				addLetter(event.key.toUpperCase());
			}
		}
	}

	function checkAnswer(answer: string) {
		if (answer.toLowerCase() === slides[currQuestionNum].word) {
			const updatedAnswers = answers.slice();
			updatedAnswers[currQuestionNum] = true;
			setAnswers(updatedAnswers);
			goToNext();
		}
	}

	function addLetter(char: string) {
		const updatedAnswers = enteredAnswers.slice();
		if (
			updatedAnswers[currQuestionNum].length
      < slides[currQuestionNum].word.length
		) {
			const thisAnswer = updatedAnswers[currQuestionNum] + char;
			updatedAnswers[currQuestionNum] = thisAnswer;
			setEnteredAnswers(updatedAnswers);
			checkAnswer(thisAnswer);
		}
	}

	function removeLetter() {
		const updatedAnswers = enteredAnswers.slice();
		updatedAnswers[currQuestionNum] = updatedAnswers[currQuestionNum].slice(
			0,
			-1,
		);
		setEnteredAnswers(updatedAnswers);
	}

	if (loading) {
		return <MessageHandler message={'Loading...'} />;
	}

	if (error) {
		return <MessageHandler message={'Error :('} />;
	}

	if (answers.every(v => v)) {
		// Win game
		setStreak(gameStart);
		return <WinHandler gameStart={gameStart} clues={clues} />;
	}

	return (
		<div>
			<div className='flex h-screen' tabIndex={0}>
				<NavigationArrow value={'⟨'} onScrollerClick={goToPrevious} />
				<div className='w-10/12 z-1'>
					<div className='h-full items-center flex py-2 px-2'>
						<TopBar startDate={gameStart}/>
						<div className='space-y-2 w-full max-w-sm mx-auto'>
							<ImageBox url={slides[currQuestionNum].url} />
							<div className='columns-5'>
								{answers.map((correct, questionIndex) => (
									<QuestionCard
										onSubmitClick={() => {
											setCurrQuestion(questionIndex);
										}}
										isCorrect={correct}
										isCurrQuestion={questionIndex === currQuestionNum}
										questionNum={questionIndex + 1}
										isClue={clues[questionIndex]}
										key={questionIndex}
									/>
								))}
							</div>
							<InfoSection
								numCharacters={slides[currQuestionNum].word.length}
								numSyllables={slides[currQuestionNum].syllables}
							/>
							<div className='absolute inset-x-0 bottom-0'>
								<EnterWordForm
									currEntry={enteredAnswers[currQuestionNum]}
									correctWord={slides[currQuestionNum].word}
								/>
								<Keyboard
									addLetter={addLetter}
									removeLetter={removeLetter}
									setClue={setClue}
									isCorrect={isCurrCorrect()}
									correctWord={slides[currQuestionNum].word}
									isClue={isCurrClue()}
								/>
							</div>
							<div className='h-40'></div>
						</div>
					</div>
				</div>
				<NavigationArrow value={'⟩'} onScrollerClick={goToNext} />
			</div>
		</div>
	);
};

export default App;
