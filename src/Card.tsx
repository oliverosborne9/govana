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
	const bgCol = props.isCorrect
		? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
		: 'bg-fuchsia-500 border-fuchsia-500 hover:bg-fuchsia-600 hover:border-fuchsia-600';
	const clueBorder = props.isClue ? ' border-b-cyan-500' : '';
	const currQuestionFormat = props.isCurrQuestion ? 'ring-2 ring-offset-2 ring-indigo-500 font-extrabold' : '';
	return (
		<button className={`${bgCol} ${clueBorder} ${currQuestionFormat}
							font-mono border-4  h-auto items-center flex-col p-2 group relative
							w-full flex rounded justify-center text-xs text-white`}
		onClick={props.onSubmitClick}
		>
        Q{props.questionNum} {labelText}
		</button>

	);
}

export default QuestionCard;
