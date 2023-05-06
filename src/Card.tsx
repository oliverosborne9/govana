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
	const hoverCol = props.isCorrect
		? 'hover:bg-green-600'
		: 'hover:bg-indigo-200';
	const currQuestionFormat = props.isCurrQuestion
		? 'ring-2 ring-offset-2 ring-indigo-500 font-extrabold'
		: '';
	const clueBorder = props.isClue ? ' border-b-cyan-500' : '';
	const textCol = props.isCorrect
		? 'text-white'
		: 'text-black';
	return (
		<button className={`${bgCol} font-mono border-4 ${mainBorderCol} h-auto items-center flex-col p-2  ${clueBorder} group relative w-full flex rounded justify-center
                text-xs
             	${hoverCol} ${currQuestionFormat} ${textCol}`}
		onClick={props.onSubmitClick}
		>
        Q{props.questionNum} {labelText}
		</button>

	);
}

export default QuestionCard;
