export default function setStreak(gameStart: number) {
	const gameDate = new Date(gameStart).setHours(0, 0, 0, 0);
	const gameDateYesterday = new Date(gameDate - 1).setHours(0, 0, 0, 0);

	const lastWinDate = Number(localStorage.getItem('lastWinDate'));

	if (lastWinDate === gameDateYesterday) {
		const existingStreak = Number(localStorage.getItem('streakDays'));
		localStorage.setItem('streakDays', String(existingStreak + 1));
	} else if (lastWinDate !== gameDate) {
		localStorage.setItem('streakDays', '1');
	}

	localStorage.setItem('lastWinDate', String(gameDate));
}
