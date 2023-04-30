type EnterWordFormProps = {
	currEntry: string;
	correctWord: string;
};

function EnterWordForm(props: EnterWordFormProps) {
	const letters = [
		...props.currEntry.split(''),
		...Array<string>(props.correctWord.length - props.currEntry.length).fill(''),
	];

	const bgCol
    = props.currEntry.toLowerCase() === props.correctWord ? 'bg-green-500' : '';
	const textCol
    = props.currEntry.toLowerCase() === props.correctWord ? 'text-white' : '';

	return (
		<div className='flex justify-center items-center'>
			{letters.map((letter, letterIndex) => (
				<div
					className={
						`w-8 h-10 group relative py-2 flex rounded justify-center border ${bgCol} ${textCol}`}
					key={letterIndex}
				>
					{letter}
				</div>
			))}
		</div>
	);
}

export default EnterWordForm;
