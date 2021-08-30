/**
 * Logger
 * =====================
 * The best alternative to the console.log statement
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import Logger, { LoggerOptions } from "@ptkdev/logger";
import config from "@configs/config";

const options: LoggerOptions = config.logger as unknown as LoggerOptions; // typescript fuck you https://github.com/microsoft/TypeScript/issues/26552#issuecomment-484124880
const logger = new Logger(options);

export { logger };
export default logger;
