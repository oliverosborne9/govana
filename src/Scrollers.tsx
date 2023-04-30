type NavigationArrowProps = {
	value: string;
	onScrollerClick: (params: any) => any;
};

function NavigationArrow(props: NavigationArrowProps) {
	return (
		<div
			className='w-1/12 text-center my-auto
        font-extrabold cursor-pointer text-4xl
        hover:text-indigo-600 z-0'
			onClick={props.onScrollerClick}
		>
			{props.value}
		</div>
	);
}

export default NavigationArrow;
