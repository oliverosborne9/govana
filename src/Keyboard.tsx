type KeyProps = {
	keyVal: string;
	disabled: boolean;
	special: boolean;
	bgCol: string;
	onKeyClick: (params: any) => any;
};

function Key(props: KeyProps) {
	const widthStyle = props.special ? 'w-10' : 'w-7';
	return (
		<button
			disabled={props.disabled}
			className={`${widthStyle}
		group relative h-auto py-2 flex rounded justify-center
        m-0.5 border border-transparent text-xs font-medium
        text-white ${props.bgCol} hover:bg-orange-600
        focus:outline-none focus:ring-2 focus:ring-offset-1
        focus:ring-orange-500 disabled:bg-gray-400`
			}
			onClick={props.onKeyClick}
		>
			{props.keyVal}
		</button>
	);
}

type KeyboardProps = {
	isClue: boolean;
	isCorrect: boolean;
	correctWord: string;
	addLetter: (key: string) => void;
	setClue: (params: any) => void;
	removeLetter: (params: any) => void;
};

function Keyboard(props: KeyboardProps) {
	const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
	const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
	const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

	function mapKey(key: string) {
		const isDisabled
      = props.isCorrect
      || (props.isClue && !props.correctWord.includes(key.toLowerCase()));
		return (
			<Key
				key={key}
				keyVal={key}
				onKeyClick={() => {
					props.addLetter(key);
				}}
				disabled={isDisabled}
				bgCol='bg-orange-500'
				special={false}
			/>
		);
	}

	return (
		<div className='pb-2 px-1'>
			<div className='flex justify-center'>{keys1.map(mapKey)}</div>
			<div className='flex justify-center'>{keys2.map(mapKey)}</div>
			<div className='flex justify-center'>
				<Key
					keyVal={'CLUE'}
					special={true}
					onKeyClick={props.setClue}
					disabled={props.isCorrect || props.isClue}
					bgCol='bg-cyan-500'
				/>
				{keys3.map(mapKey)}
				<Key
					keyVal='DEL'
					special={true}
					onKeyClick={props.removeLetter}
					disabled={props.isCorrect}
					bgCol='bg-orange-700'
				/>
			</div>
		</div>
	);
}

export default Keyboard;
