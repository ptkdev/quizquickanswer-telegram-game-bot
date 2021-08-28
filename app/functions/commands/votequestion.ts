/**
 * /badquestion and /goodquestion
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";
import telegram from "@app/functions/common/api/telegram";

const voteQuestion = async (): Promise<void> => {
	bot.command(["badquestion", "goodquestion"], async (ctx) => {
		if ((await telegram.api.message.getGroupID(ctx)) < 0) {
			// is group chat

			const username = (await telegram.api.message.getText(ctx))
				.replace("/goodquestion", "")
				.replace("/badquestion", "")
				.replace("@", "")
				.trim();
			if (username === (await telegram.api.message.getUsername(ctx))) {
				ctx.telegram.sendMessage(
					await telegram.api.message.getGroupID(ctx),
					translate("goodquestion_not_autovote"),
					{
						parse_mode: "MarkdownV2",
					},
				);
				return;
			}

			if (username !== "") {
				const group_id = telegram.api.message.getCurrentGroupID(ctx);
				const is_good_question = (await telegram.api.message.getText(ctx).split(" ")[0]) === "/goodquestion";

				const user_questions = store.questions
					.get("questions")
					.find({ group_id: await telegram.api.message.getGroupID(ctx), username });
				const user_score =
					store.scores
						.get("scores")
						.find({ group_id: await telegram.api.message.getGroupID(ctx), username })
						.value()?.score || 0;

				if (user_questions.value()) {
					// if voted user is in the question DB
					store.questions
						.get("questions")
						.find({ group_id, username })
						.assign({
							...user_questions.value(),
							...(is_good_question
								? {
										good_questions: user_questions.value().good_questions + 1,
								  }
								: {
										bad_questions: user_questions.value().bad_questions + 1,
								  }),
						})
						.write();
				} else {
					const json = {
						username: username,
						good_questions: 0,
						bad_questions: 0,
						group_id: group_id,
					};

					store.questions
						.get("questions")
						.push({
							...json,
							...(is_good_question ? { good_questions: 1 } : { bad_questions: 1 }),
						})
						.write();
				}

				const combinedPoints =
					user_score + user_questions.value().good_questions - user_questions.value().bad_questions;
				const message = is_good_question
					? `*Votazione andata a buon fine*\\! 🗳 \n\n*Complimenti @${username}* hai ricevuto un voto *positivo*, ottima domanda\\! 🔥\n\nIl tuo punteggio è di *${combinedPoints}* punt${
							combinedPoints === 1 ? "o" : "i"
					  }\\! ⚽️`
					: `*Votazione andata a buon fine*\\! 🗳 \n\n@*${username}* hai ricevuto un voto *negativo*, puoi fare di meglio la prossima volta\\. 💩 \n\nIl tuo punteggio è di *${combinedPoints}* punt${
							combinedPoints === 1 ? "o" : "i"
					  }\\! ⚽️`;
				ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), message, {
					parse_mode: "MarkdownV2",
				});
			}
		} else {
			ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { voteQuestion };
export default voteQuestion;
