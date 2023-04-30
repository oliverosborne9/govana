type ImageBoxProps = {
	url: string;
};

function ImageBox(props: ImageBoxProps) {
	return (
		<div className='relative aspect-[16/9]'>
			<img
				className='absolute h-full w-full object-contain'
				src={props.url}
				alt='Image to Guess'
			/>
		</div>
	);
}

export default ImageBox;
