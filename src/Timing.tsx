function padTime(i: number) {
	const returnStr = i < 10 ? `0${i}` : i.toString(); // Add zero in front of numbers < 10
	return returnStr;
}

export default function getDate(startTime: number) {
	const now = Math.floor(Date.now() / 1000);
	const diff = now - startTime; // Diff in seconds between now and start
	const m = Math.floor(diff / 60); // Get minutes value (quotient of diff)
	const s = Math.floor(diff % 60); // Get seconds value (remainder of diff)
	const displayMin = padTime(m);
	const displaySec = padTime(s);
	return displayMin + ':' + displaySec;
}
