import telegram from "@routes/api/telegram";
import db from "@routes/api/database";
import translate from "@translations/translate";
import { QuestionsInterface, MasterInterface } from "@app/types/databases.type";
import { Markup } from "telegraf";

const vote = async (ctx, type): Promise<void> => {
	const lang = await db.settings.get({
		group_id: telegram.api.message.getChatID(ctx),
	});

	if (telegram.api.message.getChatID(ctx) < 0) {
		// is group chat

		const { id: user_id }: MasterInterface = await db.master.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const voter_user_id = telegram.api.message.getUserIDFromAction(ctx);
		const message_id = telegram.api.message.getMessageIDFromAction(ctx);

		// If it's a self vote (Comment this part for debugging)
		if (user_id === voter_user_id) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "goodquestion_not_autovote"),
			);
			return;
		}

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
					user_questions.upvotes += 1;
				} else {
					user_questions.downvotes += 1;
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

				ctx.editMessageReplyMarkup({
					inline_keyboard: [
						[
							Markup.button.callback(
								`👍 ${user_questions?.voters?.users?.upvotes?.length || 0} `,
								"upvote",
							),
							Markup.button.callback(
								`👎 ${user_questions?.voters?.users?.downvotes?.length || 0} `,
								"downvote",
							),
						],
					],
				});
			} else {
				const json = {
					user_id,
					upvotes: is_upvote ? 1 : 0,
					downvotes: is_upvote ? 0 : 1,
					group_id: group_id,
					voters: {
						message_id,
						users: {
							upvotes: is_upvote ? [voter_user_id] : [],
							downvotes: is_upvote ? [] : [voter_user_id],
						},
					},
				};
				await db.questions.add(json);

				ctx.editMessageReplyMarkup({
					inline_keyboard: [
						[
							Markup.button.callback(`👍 ${is_upvote ? 1 : 0} `, "upvote"),
							Markup.button.callback(`👎 ${is_upvote ? 0 : 1}`, "downvote"),
						],
					],
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
