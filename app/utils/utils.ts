export function getTopScoreEmoji(index: number): any {
	let medalEmoji = "";
	switch (index) {
		case 0:
			medalEmoji = "🥇";
			break;
		case 1:
			medalEmoji = "🥈";
			break;
		case 2:
			medalEmoji = "🥉";
			break;
		case 3:
			medalEmoji = "4️⃣";
			break;
		case 4:
			medalEmoji = "5️⃣";
			break;
		case 5:
			medalEmoji = "6️⃣";
			break;
		case 6:
			medalEmoji = "7️⃣";
			break;
		case 7:
			medalEmoji = "8️⃣";
			break;
		case 8:
			medalEmoji = "9️⃣";
			break;
		case 9:
			medalEmoji = "🔟";
			break;
	}
	return medalEmoji;
}
