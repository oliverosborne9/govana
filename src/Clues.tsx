type InfoSectionProps = {
	numCharacters: number;
	numSyllables: number;
};

function InfoSection(props: InfoSectionProps) {
	return (
		<div className='flex items-center justify-between text-sm'>
			<div className='flex'>
				{'Aα'}
				<p className='ml-2 block font-medium text-indigo-600  hover:text-indigo-500'>
					{props.numCharacters} characters
				</p>
			</div>

			<div className='flex'>
				{'/ '.repeat(props.numSyllables)}
				<p className='ml-2 block font-medium text-indigo-600  hover:text-indigo-500'>
					{props.numSyllables}{' '}
					{props.numSyllables > 1 ? 'syllables' : 'syllable'}
				</p>
			</div>
		</div>
	);
}

export default InfoSection;
