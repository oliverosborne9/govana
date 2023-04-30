type QuestionCardProps = {
	isCorrect: boolean;
	isClue: boolean;
	isCurrQuestion: boolean;
	questionNum: number;
	onSubmitClick: (params: any) => any;
	key: number;
};

function QuestionCard(props: QuestionCardProps) {
	const labelText = props.isCorrect ? '✓' : '?';
	const bgCol = props.isCorrect ? 'bg-green-500' : 'bg-indigo-100';
	const mainBorderCol = props.isCorrect
		? 'border-green-500'
		: 'border-indigo-100';
	const textCol = props.isCorrect ? ' text-white' : '';
	const clueBorder = props.isClue ? ' border-4 border-b-cyan-500' : '';
	return (
		<div
			className={`${bgCol} border-4 ${mainBorderCol} rounded h-auto flex justify-center items-center flex-col p-2 ${
				props.isCurrQuestion ? ' outline' : ''
			} ${clueBorder}`}
		>
			<button
				className='group relative w-full flex rounded justify-center
                  py-1 px-4 border border-transparent text-xs font-medium
                  text-white bg-fuchsia-500 hover:bg-indigo-600
                  focus:outline-none focus:ring-2 focus:ring-offset-1
                  focus:ring-indigo-500'
				onClick={props.onSubmitClick}
			>
        Q{props.questionNum}
			</button>
			<p className={'whitespace-nowrap text-xs' + textCol}>{labelText}</p>
		</div>
	);
}

export default QuestionCard;
