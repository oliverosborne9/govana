import NavigationArrow from './Scrollers';
import EnterWordForm from './Form';
import InfoSection from './Clues';
import ImageBox from './Image';
import {useEffect, useState} from 'react';
import QuestionCard from './Card';
import GameTimer from './Clock';
import Keyboard from './Keyboard';
import {MessageHandler, WinHandler} from './HandlerFormats';
import {sampleData, type Question} from './Data';
import setStreak from './WinTracker';

const App = () => {
	const [slides, setSlides] = useState<Question[]>(Array(5));
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [gameStart, setGameStart] = useState<number>(Date.now());
	const [currQuestionNum, setCurrQuestion] = useState<number>(0);
	const [answers, setAnswers] = useState<boolean[]>(Array(5).fill(false));
	const [clues, setClues] = useState<boolean[]>(Array(5).fill(false));
	const [enteredAnswers, setEnteredAnswers] = useState<string[]>(Array(5).fill(''));

	function loadSet(slides: Question[]) {
		setSlides(slides);
		setAnswers(Array(slides.length).fill(false));
	}

	useEffect(() => {
		const backend = import.meta.env.VITE_BACKEND_API;
		if (backend.toLowerCase() === 'local') {
			loadSet(sampleData);
			setLoading(false);
		} else {
			fetch(`http://${backend}/api/words/today`)
				.then(async response => response.json())
				.then(loadSet)
				.catch(() => {
					setError(true);
				})
				.finally(() => {
					setLoading(false);
				});
		}

		setGameStart(Date.now());
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
			setClue();
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
			<div className='flex items-center h-screen' tabIndex={0}>
				<NavigationArrow value={'⟨'} onScrollerClick={goToPrevious} />
				<div className='w-10/12 justify-items-center z-1'>
					<div className='flex items-center justify-between'>
						<div className='flex'>
							<p className='font-mono font-bold text-fuchsia-600'>{'GuessThe'}</p>
							<div className='box font-mono font-bold text-fuchsia-600'>
								<ul>
									<li className='item-1'>LemonCurd</li>
									<li className='item-2'>Word</li>
									<li className='item-4'>Songbird</li>
									<li className='item-4'>Absurd</li>
									<li className='item-5'>LemonCurd</li>
								</ul>
							</div>
						</div>
						<div className='flex'>
							<GameTimer startDate={gameStart} />
						</div>
					</div>
					<div className='min-h-full flex py-12 px-2 sm:px-6 lg:px-8'>
						<div className='space-y-4 w-full max-w-sm mx-auto'>
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
					</div>
				</div>
				<NavigationArrow value={'⟩'} onScrollerClick={goToNext} />
			</div>
		</div>
	);
};

export default App;
