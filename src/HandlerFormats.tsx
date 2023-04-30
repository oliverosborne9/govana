import getDate from './Timing';

function MessageHandler(props: {message: string}) {
	return (
		<div className='flex flex-col h-screen justify-center items-center text-white bg-gray-700'>
			<div>{props.message}</div>
		</div>
	);
}

type WinHandlerProps = {
	gameStart: number;
	clues: boolean[];
};

function WinHandler(props: WinHandlerProps) {
	const numClues = props.clues.reduce(
		(partialSum, a) => partialSum + Number(a),
		0,
	);
	const streakDays = Number(localStorage.getItem('streakDays'));
	const cluesNoun = numClues === 1 ? 'clue' : 'clues';
	const daysNoun = streakDays === 1 ? 'day' : 'days';
	return (
		<div className='flex flex-col h-screen justify-center items-center text-white bg-fuchsia-700'>
			<div>You win...!</div>
			<div>{`It took you ${getDate(Math.floor(props.gameStart / 1000))}`}</div>
			<div>{`and you used ${numClues} ${cluesNoun}.`}</div>
			<div className='p-2'>
				<button
					className='group relative w-full flex rounded justify-center
                  py-1 px-4 border border-transparent text-xs font-medium
                  text-white bg-fuchsia-500 hover:bg-indigo-600
                  focus:outline-none focus:ring-2 focus:ring-offset-1
                  focus:ring-indigo-500'
					onClick={() => {
						location.reload();
					}}
				>
          Play Again
				</button>
			</div>
			<div>{`🔥 Streak: ${streakDays} ${daysNoun}`}</div>
		</div>
	);
}

export {MessageHandler, WinHandler};
