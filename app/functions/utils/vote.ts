/**
 * Vote
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { InlineKeyboard } from "grammy";
import telegram from "@routes/api/telegram";
import db from "@routes/api/database";
import translate from "@translations/translate";

import type { QuestionsInterface } from "@app/types/question.interfaces";

const vote = async (ctx, type, user_id): Promise<void> => {
	const lang = await telegram.api.message.getLanguage(ctx);

	if (telegram.api.message.getChatID(ctx) < 0) {
		// is group chat

		const voter_user_id = telegram.api.message.getUserIDFromAction(ctx);
		const message_id = telegram.api.message.getMessageIDFromAction(ctx);

		// If it's a self vote (Comment this part for debugging)
		/* if (user_id === voter_user_id) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "goodquestion_not_autovote"),
			);
			return;
		}*/

		if (user_id && user_id !== "") {
			const group_id = telegram.api.message.getChatID(ctx);
			const is_upvote = type === "upvote";

			const user_questions: QuestionsInterface = await db.questions.get({
				group_id: telegram.api.message.getChatID(ctx),
				user_id,
			});

			if (user_questions.group_id < 0) {
				// if voted user is in the question DB

				const same_message: boolean = user_questions.voters.message_id === message_id;
				// If the voter user has already voted this question/message

				if (
					same_message &&
					(is_upvote
						? user_questions?.voters?.users?.upvotes?.some((u) => u === voter_user_id)
						: user_questions?.voters?.users?.downvotes?.some((u) => u === voter_user_id))
				) {
					return;
				}

				if (is_upvote) {
					user_questions[`upvotes_${new Date().getFullYear()}`] += 1;
					user_questions[`upvotes_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] += 1;
				} else {
					user_questions[`downvotes_${new Date().getFullYear()}`] += 1;
					user_questions[`downvotes_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] += 1;
				}
				user_questions.voters = {
					message_id,
					users: same_message
						? is_upvote
							? {
									...user_questions.voters.users,
									upvotes: [...user_questions.voters.users.upvotes, voter_user_id],
							  }
							: {
									...user_questions.voters.users,
									downvotes: [...user_questions.voters.users.downvotes, voter_user_id],
							  }
						: {
								upvotes: is_upvote ? [voter_user_id] : [],
								downvotes: is_upvote ? [] : [voter_user_id],
						  },
				};
				await db.questions.update({ group_id, user_id }, user_questions);

				const buttons = new InlineKeyboard();
				buttons.text(`👍 ${user_questions?.voters?.users?.upvotes?.length || 0} `, `upvote ${user_id}`);
				buttons.text(`👎 ${user_questions?.voters?.users?.downvotes?.length || 0} `, `downvote ${user_id}`);

				await telegram.api.message.editMessageReplyMarkup(ctx, {
					reply_markup: buttons,
				});
			} else {
				const json = {
					user_id,
					group_id: group_id,
					voters: {
						message_id,
						users: {
							upvotes: is_upvote ? [voter_user_id] : [],
							downvotes: is_upvote ? [] : [voter_user_id],
						},
					},
				};

				json[`upvotes_${new Date().getFullYear()}`] = is_upvote ? 1 : 0;
				json[`downvotes_${new Date().getFullYear()}`] = is_upvote ? 0 : 1;
				json[`upvotes_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] = is_upvote ? 1 : 0;
				json[`downvotes_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] = is_upvote ? 0 : 1;
				await db.questions.add(json);

				const buttons = new InlineKeyboard();
				buttons.text(`👍 ${is_upvote ? 1 : 0} `, `upvote ${user_id}`);
				buttons.text(`👎 ${is_upvote ? 0 : 1}`, `downvote ${user_id}`);

				await telegram.api.message.editMessageReplyMarkup(ctx, {
					reply_markup: buttons,
				});
			}
		}
	} else {
		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "command_only_group"),
		);
	}
};

export { vote };
export default vote;
