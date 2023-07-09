# 🤖 quizquickanswer-telegram-game-bot

<!-- all-shields/header-badges:START -->

[![v0.7.9-nightly.99](https://img.shields.io/badge/version-v0.7.9--nightly.99-lightgray.svg?style=flat&logo=)](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/CHANGELOG.md) [![](https://img.shields.io/npm/v/@ptkdev/quizquickanswer-telegram-game-bot?color=CC3534&logo=npm)](https://www.npmjs.com/package/@ptkdev/quizquickanswer-telegram-game-bot) [![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat&logo=license)](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/LICENSE.md) [![Language: TypeScript](https://img.shields.io/badge/language-typescript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/) [![Framework: Grammy](https://img.shields.io/badge/powered%20by-grammy-009dca.svg?style=flat&logo=telegram)](https://grammy.dev/) [![ECMAScript: 2019](https://img.shields.io/badge/ES-9-F7DF1E.svg?style=flat&logo=javascript)](https://github.com/tc39/ecma262) [![Discord Server](https://discordapp.com/api/guilds/383373985666301975/embed.png)](https://discord.ptkdev.io)

<!-- all-shields/header-badges:END -->

Funny quiz game, play with friends on your telegram group!

## 🎁 Support: Donate

> This project is **free**, **open source** and I try to provide excellent **free support**. Why donate? I work on this project several hours in my spare time and try to keep it up to date and working. **THANK YOU!**

<!-- all-shields/sponsors-badges:START -->

[![Donate Paypal](https://img.shields.io/badge/donate-paypal-005EA6.svg?style=for-the-badge&logo=paypal)](https://www.paypal.me/ptkdev) [![Donate Ko-Fi](https://img.shields.io/badge/donate-ko--fi-29abe0.svg?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/ptkdev) [![Donate Github Sponsors](https://img.shields.io/badge/donate-sponsors-ea4aaa.svg?style=for-the-badge&logo=github)](https://github.com/sponsors/ptkdev) [![Donate Patreon](https://img.shields.io/badge/donate-patreon-F87668.svg?style=for-the-badge&logo=patreon)](https://www.patreon.com/join/ptkdev) [![Donate Bitcoin](https://img.shields.io/badge/BTC-35jQmZCy4nsxoMM3QPFrnZePDVhdKaHMRH-E38B29.svg?style=flat-square&logo=bitcoin)](https://ptk.dev/img/icons/menu/bitcoin_wallet.png) [![Donate Ethereum](https://img.shields.io/badge/ETH-0x8b8171661bEb032828e82baBb0B5B98Ba8fBEBFc-4E8EE9.svg?style=flat-square&logo=ethereum)](https://ptk.dev/img/icons/menu/ethereum_wallet.png)

<!-- all-shields/sponsors-badges:END -->

## 📎 Menu

-   💡 [Features](#-features)
-   👔 [Screenshot](#-screenshot)
-   🚀 [How to use](#-installation)
-   🎮 [How to play](#-how-to-play)
-   🔨 [Developer Mode](#-developer-mode)
-   -   🏁 [Run Project](#-run-project)
-   -   💾 [Setup Project](#-setup-project)
-   -   🚀 [Deploy](#-deploy)
-   📚 [Documentation](#-documentation)
-   👨‍💻 [Contributing](#-contributing)
-   🐛 [Known Bugs](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
-   🍻 Community:
    -   <img src="https://raw.githubusercontent.com/ptkdev/quizquickanswer-telegram-game-bot/main/.github/assets/social_telegram.png" height="18px"> Telegram ([🇬🇧 English](https://t.me/QuizQuickAnswerGroup) | [🇮🇹 Italian](https://t.me/QuizQuickAnswerGroupITA))

## 💡 Features

-   [✔️] Easy to use
-   [✔️] MIT License
-   [✔️] Powered by Grammy Telegram API Framework
-   [✔️] Quiz game, play with friends on your telegram group

## 👔 Screenshot

[![quizquickanswer-telegram-game-bot](https://raw.githubusercontent.com/ptkdev/quizquickanswer-telegram-game-bot/main/.github/assets/screenshot.png)](https://raw.githubusercontent.com/ptkdev/quizquickanswer-telegram-game-bot/main/.github/assets/screenshot.png)

## 🚀 Installation

1. Add [@QuizQuickAnswerBot](https://t.me/QuizQuickAnswerBot) to your Telegram group
2. Make **@QuizQuickAnswerBot** admin of your group
3. Run `/start` or `/start@QuizQuickAnswerBot`
4. Make yourself master of game, run `/master @nickname`
5. Follow instructions and Play with friends!

## 🎮 How to play

1. Set a master with `/master @nickname`
2. Master send private message to [@QuizQuickAnswerBot](https://t.me/QuizQuickAnswerBot)
3. Master write question with syntax: `QUESTION ## TIP`, example: `gameboy ## '90s' portable console`
4. Friends try to answer quickly in the telegram group. Who reply with right answer is the new master!

## ⏱ Official Group

If you have no telegram groups of friends you can play in the official one, you will find new friends and kind people:

-   [🇬🇧 English](https://t.me/QuizQuickAnswerGroup)
-   [🇮🇹 Italian](https://t.me/QuizQuickAnswerGroupITA)

## 🔨 Developer Mode

#### 🏁 Run Project

1. Clone this repository or download [nightly](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/archive/nightly.zip), [beta](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/archive/beta.zip) or [stable](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/archive/main.zip).
2. Write to [@botfather](https://t.me/botfather) on telegram and create new bot (save token and set bot username)
3. Set bot token: `export BOT_TOKEN=1234:asdfghjkl`
4. Set mongodb connection url: `export MONGODB=mongodb://localhost:27017/quizquickanswerdb`
5. Run `npm install`
6. Run `npm run dev`
7. Write `/start` on telegram bot.

#### 🚀 Deploy

Deploy bot to your server and:

1. Set bot token: `export BOT_TOKEN=1234:asdfghjkl`
2. Set mongodb connection url: `export MONGODB=mongodb://localhost:27017/quizquickanswerdb`
3. Run init npm install
4. Generate release `npm run release`
5. Start bot `npm run start-pm2`

## 📚 Documentation

Run `npm run docs`

## 👑 Backers and Sponsors

Thanks to all our backers! 🙏 Donate 3$ or more on [paypal](https://www.paypal.me/ptkdev), [ko-fi](https://ko-fi.com/ptkdev), [github](https://github.com/sponsors/ptkdev) or [patreon](https://www.patreon.com/join/ptkdev) and send me [email](mailto:support@ptkdev.io) with your avatar and url.

[![](https://api.ptkdev.io/backers/sponsor1.png?)](https://api.ptkdev.io/backers/sponsor1.html) [![](https://api.ptkdev.io/backers/sponsor2.png?)](https://api.ptkdev.io/backers/sponsor2.html) [![](https://api.ptkdev.io/backers/sponsor-kofi1.png?)](https://api.ptkdev.io/backers/sponsor-kofi1.html) [![](https://api.ptkdev.io/backers/sponsor-kofi2.png?)](https://api.ptkdev.io/backers/sponsor-kofi2.html) [![](https://api.ptkdev.io/backers/sponsor-kofi3.png?)](https://api.ptkdev.io/backers/sponsor-kofi3.html) [![](https://api.ptkdev.io/backers/sponsor3.png?)](https://api.ptkdev.io/backers/sponsor3.html) [![](https://api.ptkdev.io/backers/sponsor4.png?)](https://api.ptkdev.io/backers/sponsor4.html) [![](https://api.ptkdev.io/backers/sponsor5.png?)](https://api.ptkdev.io/backers/sponsor5.html) [![](https://api.ptkdev.io/backers/sponsor6.png?)](https://api.ptkdev.io/backers/sponsor6.html) [![](https://api.ptkdev.io/backers/sponsor7.png?)](https://api.ptkdev.io/backers/sponsor7.html) [![](https://api.ptkdev.io/backers/sponsor8.png?)](https://api.ptkdev.io/backers/sponsor8.html) [![](https://api.ptkdev.io/backers/sponsor9.png?)](https://api.ptkdev.io/backers/sponsor9.html) [![](https://api.ptkdev.io/backers/sponsor10.png?)](https://api.ptkdev.io/backers/sponsor10.html) [![](https://api.ptkdev.io/backers/sponsor11.png?)](https://api.ptkdev.io/backers/sponsor11.html) [![](https://api.ptkdev.io/backers/sponsor12.png?)](https://api.ptkdev.io/backers/sponsor12.html) [![](https://api.ptkdev.io/backers/sponsor13.png?)](https://api.ptkdev.io/backers/sponsor13.html) [![](https://api.ptkdev.io/backers/sponsor14.png?)](https://api.ptkdev.io/backers/sponsor14.html) [![](https://api.ptkdev.io/backers/sponsor15.png?)](https://api.ptkdev.io/backers/sponsor15.html) [![](https://api.ptkdev.io/backers/backer1.png?)](https://api.ptkdev.io/backers/backer1.html) [![](https://api.ptkdev.io/backers/backer2.png?)](https://api.ptkdev.io/backers/backer2.html) [![](https://api.ptkdev.io/backers/backer3.png?)](https://api.ptkdev.io/backers/backer3.html) [![](https://api.ptkdev.io/backers/backer4.png?)](https://api.ptkdev.io/backers/backer4.html) [![](https://api.ptkdev.io/backers/backer5.png?)](https://api.ptkdev.io/backers/backer5.html) [![](https://api.ptkdev.io/backers/backer6.png?)](https://api.ptkdev.io/backers/backer6.html) [![](https://api.ptkdev.io/backers/backer7.png?)](https://api.ptkdev.io/backers/backer7.html) [![](https://api.ptkdev.io/backers/backer8.png?)](https://api.ptkdev.io/backers/backer8.html) [![](https://api.ptkdev.io/backers/backer9.png?)](https://api.ptkdev.io/backers/backer9.html) [![](https://api.ptkdev.io/backers/backer10.png?)](https://api.ptkdev.io/backers/backer10.html) [![](https://api.ptkdev.io/backers/backer11.png?)](https://api.ptkdev.io/backers/backer11.html) [![](https://api.ptkdev.io/backers/backer12.png?)](https://api.ptkdev.io/backers/backer12.html) [![](https://api.ptkdev.io/backers/backer13.png?)](https://api.ptkdev.io/backers/backer13.html) [![](https://api.ptkdev.io/backers/backer14.png?)](https://api.ptkdev.io/backers/backer14.html) [![](https://api.ptkdev.io/backers/backer15.png?)](https://api.ptkdev.io/backers/backer15.html) [![](https://api.ptkdev.io/backers/backer16.png?)](https://api.ptkdev.io/backers/backer16.html) [![](https://api.ptkdev.io/backers/backer17.png?)](https://api.ptkdev.io/backers/backer17.html) [![](https://api.ptkdev.io/backers/backer18.png?)](https://api.ptkdev.io/backers/backer18.html) [![](https://api.ptkdev.io/backers/backer19.png?)](https://api.ptkdev.io/backers/backer19.html) [![](https://api.ptkdev.io/backers/backer20.png?)](https://api.ptkdev.io/backers/backer20.html) [![](https://api.ptkdev.io/backers/backer21.png?)](https://api.ptkdev.io/backers/backer21.html) [![](https://api.ptkdev.io/backers/backer22.png?)](https://api.ptkdev.io/backers/backer22.html) [![](https://api.ptkdev.io/backers/backer23.png?)](https://api.ptkdev.io/backers/backer23.html) [![](https://api.ptkdev.io/backers/backer24.png?)](https://api.ptkdev.io/backers/backer24.html) [![](https://api.ptkdev.io/backers/backer25.png?)](https://api.ptkdev.io/backers/backer25.html) [![](https://api.ptkdev.io/backers/backer26.png?)](https://api.ptkdev.io/backers/backer26.html) [![](https://api.ptkdev.io/backers/backer27.png?)](https://api.ptkdev.io/backers/backer27.html) [![](https://api.ptkdev.io/backers/backer28.png?)](https://api.ptkdev.io/backers/backer28.html) [![](https://api.ptkdev.io/backers/backer29.png?)](https://api.ptkdev.io/backers/backer29.html)

## 👨‍💻 Contributing

I ❤️ contributions! I will happily accept your pull request! (**IMPORTANT**: Only to nightly branch!) Translations, grammatical corrections (GrammarNazi you are welcome! Yes my English is bad, sorry), etc... Do not be afraid, if the code is not perfect we will work together 👯 and remember to insert your name in `.all-contributorsrc` and `package.json` file.

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://ptk.dev"><img src="https://avatars1.githubusercontent.com/u/442844?v=4?s=100" width="100px;" alt="Patryk Rzucidło"/><br /><sub><b>Patryk Rzucidło</b></sub></a><br /><a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/commits?author=ptkdev" title="Code">💻</a> <a href="#translation-ptkdev" title="Translation">🌍</a> <a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/commits?author=ptkdev" title="Documentation">📖</a> <a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/issues?q=author%3Aptkdev" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="16.66%"><img src="https://avatars1.githubusercontent.com/u/50172746?v=4?s=100" width="100px;" alt="Alì Shadman"/><br /><sub><b>Alì Shadman</b></sub><br /><a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/commits?author=AliShadman95" title="Code">💻</a> <a href="#translation-AliShadman95" title="Translation">🌍</a> <a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/commits?author=AliShadman95" title="Documentation">📖</a> <a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/issues?q=author%3AAliShadman95" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://instagram.com/den_karina"><img src="https://avatars1.githubusercontent.com/u/91738047?v=4?s=100" width="100px;" alt="Denise Scazzari"/><br /><sub><b>Denise Scazzari</b></sub></a><br /><a href="#translation-DeniseKarina" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://instagram.com/i.m_al3x"><img src="?s=100" width="100px;" alt="Alessandro Di Maria"/><br /><sub><b>Alessandro Di Maria</b></sub></a><br /><a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/commits?author=ImAl3x03" title="Code">💻</a> <a href="https://github.com/ptkdev/ptkdev/quizquickanswer-telegram-game-bot/issues?q=author%3AImAl3x03" title="Bug reports">🐛</a> <a href="#translation-ImAl3x03" title="Translation">🌍</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

> 💰 In the future, if the donations allow it, I would like to share some of the success with those who helped me the most. For me open source is share of code, share development knowledges and share donations!

## 🦄 Other Projects

<!-- all-shields/projects-badges1:START -->

[![](https://img.shields.io/badge/%F0%9F%92%BB%20My-Portfolio-3498db.svg?style=flat&logo=)](https://ptk.dev/)

<!-- all-shields/projects-badges1:END -->

<!-- all-shields/projects-badges2:START -->

[![](https://img.shields.io/badge/%F0%9F%A6%92%20Tools-Node%20Logger-9b59b6.svg?style=flat&logo=)](https://github.com/ptkdev/ptkdev-logger) [![](https://img.shields.io/badge/%F0%9F%A6%8C%20Tools-All%20Shields%20CLI-9b59b6.svg?style=flat&logo=)](https://github.com/ptkdev/all-shields-cli) [![](https://img.shields.io/badge/%F0%9F%96%A5%EF%B8%8F%20Tools-Aspect%20Ratio%2021%3A9-9b59b6.svg?style=flat&logo=)](https://github.com/ptkdev/chrome-extension-aspectratio219) [![](https://img.shields.io/badge/%F0%9F%9B%A1%20Tools-Badges%3A%20Available%20on-9b59b6.svg?style=flat&logo=)](https://availableon.badge.ptkdev.io/) [![](https://img.shields.io/badge/%F0%9F%90%BE%20Tools-JSON%20Token%20Replace-9b59b6.svg?style=flat&logo=)](https://github.com/ptkdev/json-token-replace) [![](https://img.shields.io/badge/%F0%9F%90%8D%20Tools-ESLint%3A%20snakecasejs-9b59b6.svg?style=flat&logo=)](https://github.com/ptkdev/eslint-plugin-snakecasejs)

<!-- all-shields/projects-badges2:END -->

<!-- all-shields/projects-badges3:START -->

[![](https://img.shields.io/badge/%F0%9F%93%B8%20WebComponent-Instagram%20Widget-e74c3c.svg?style=flat&logo=)](https://github.com/ptkdev-components/webcomponent-instagram-widget) [![](https://img.shields.io/badge/%F0%9F%91%91%20WebComponent-My%20Patreon%20Box-e74c3c.svg?style=flat&logo=)](https://github.com/ptkdev-components/webcomponent-patreon-box) [![](https://img.shields.io/badge/%F0%9F%8F%9E%20WebComponent-Carousel%20Slideshow-e74c3c.svg?style=flat&logo=)](https://github.com/ptkdev-components/webcomponent-carousel-slideshow)

<!-- all-shields/projects-badges3:END -->

<!-- all-shields/projects-badges4:START -->

[![](https://img.shields.io/badge/%F0%9F%8E%A8%20Themes-VSCode-f1c40f.svg?style=flat&logo=)](https://github.com/ptkdev/vscode-theme-dark-blood) [![](https://img.shields.io/badge/%F0%9F%93%9A%20Bot-GameBookChat-34495e.svg?style=flat&logo=)](https://t.me/gamebookchatbot) [![](https://img.shields.io/badge/%F0%9F%91%94%20Boilerplate-Svelte-f368e0.svg?style=flat&logo=)](https://github.com/ptkdev?q=svelte) [![](https://img.shields.io/badge/%F0%9F%91%94%20Boilerplate-WebComponents-f368e0.svg?style=flat&logo=)](https://github.com/ptkdev?q=webcomponent) [![](https://img.shields.io/badge/%F0%9F%91%94%20Boilerplate-BOT-f368e0.svg?style=flat&logo=)](https://github.com/ptkdev?q=bot) [![](https://img.shields.io/badge/%F0%9F%91%94%20Boilerplate-Node-f368e0.svg?style=flat&logo=)](https://github.com/ptkdev?q=node) [![](https://img.shields.io/badge/%F0%9F%92%85%20App-Me%20in%20Gifs-2ecc71.svg?style=flat&logo=)](https://meingifs.pics/) [![](https://img.shields.io/badge/%F0%9F%93%B1%20App-Stickers-2ecc71.svg?style=flat&logo=)](https://github.com/ptkdev/ptkdev-stickers#-install-free)

<!-- all-shields/projects-badges4:END -->

## 💫 License

-   Code and Contributions have **MIT License**
-   Images and logos have **CC BY-NC 4.0 License**
-   Documentations and Translations have **CC BY 4.0 License**

###### Copyleft (c) 2022 [Patryk Rzucidło](https://ptk.dev) ([@PTKDev](https://twitter.com/ptkdev)) <[support@ptkdev.io](mailto:support@ptkdev.io)>
