export function getTopScoreEmoji(index: number): any {
	let medal_emoji = "";
	switch (index) {
		case 0:
			medal_emoji = "🥇";
			break;
		case 1:
			medal_emoji = "🥈";
			break;
		case 2:
			medal_emoji = "🥉";
			break;
		case 3:
			medal_emoji = "4️⃣";
			break;
		case 4:
			medal_emoji = "5️⃣";
			break;
		case 5:
			medal_emoji = "6️⃣";
			break;
		case 6:
			medal_emoji = "7️⃣";
			break;
		case 7:
			medal_emoji = "8️⃣";
			break;
		case 8:
			medal_emoji = "9️⃣";
			break;
		case 9:
			medal_emoji = "💩";
			break;
	}
	return medal_emoji;
}
