import TelegramApi from 'node-telegram-bot-api'
import TOKEN from './env/env.js';
const token = TOKEN;

const bot = new TelegramApi(token, {polling: true});

const start = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начало'}
    ])


}

start()
