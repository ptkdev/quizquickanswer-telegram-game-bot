/**
 * Grammy Grammy Telegram API Framework API
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Bot } from "grammy";
import configs from "@configs/config";

const bot = new Bot(configs.telegram.token);

export { bot };
export default bot;
