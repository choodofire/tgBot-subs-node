import TelegramApi from 'node-telegram-bot-api'
import TOKEN from './env/env.js';

const token = TOKEN;
const webAppUrl = 'https://endearing-bienenstitch-05d481.netlify.app'

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {

        await bot.sendMessage(chatId, 'Выберите подписки по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Выбрать подписки', web_app: {url: webAppUrl}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Заполните данные по кнопке "Ввести данные"', {
            reply_markup: {
                keyboard: [
                    [{text: 'Ввести данные', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);
            console.log(data)
            await bot.sendMessage(chatId, 'sps ' + data?.country + ' ' + data?.street)
        } catch (e) {
            console.log(e)
        }
    }

});

