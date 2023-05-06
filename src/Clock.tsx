import {useEffect, useState} from 'react';
import getDate from './Timing';

type GameTimerProps = {
	startDate: number;
};

function GameTimer(props: GameTimerProps) {
	const startTime = Math.floor(props.startDate / 1000);
	const [displayTime, setDisplayTime] = useState('00:00');

	function showDate() {
		const displayTimeNow = getDate(startTime);
		setDisplayTime(displayTimeNow);
	}

	useEffect(() => {
		setInterval(showDate, 500);
	}, []);

	return <p className='text-gray-400'>{displayTime}</p>;
}

export default GameTimer;
export type {GameTimerProps};
