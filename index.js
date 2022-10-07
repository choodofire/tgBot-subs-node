import TelegramApi from 'node-telegram-bot-api'
import TOKEN from './env/env.js';

const token = TOKEN;
const webAppUrl = 'https://endearing-bienenstitch-05d481.netlify.app'

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'ниже кнопка', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'ниже кнопка', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
})

