import TelegramBot from 'node-telegram-bot-api'
import TOKEN from './env/env.js';
import express from 'express';
import cors from 'cors';

const token = TOKEN;
const webAppUrl = 'https://endearing-bienenstitch-05d481.netlify.app'

const bot = new TelegramBot(token, {polling: true});

const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userName = msg.chat.first_name

    if (text === '/start') {
        await bot.sendMessage(chatId, `Привет, ${userName} 💞`, {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Заходи в интернет магазин по кнопке ниже и выбери желаемые подписки', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Магазин', web_app: {url: webAppUrl}}]
                ]
            }
        })
    } else {

        await bot.sendMessage(chatId, 'Неизвестное сообщение\n' +
                                            '/start чтобы оформить подписку')
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'Данные от аккаунта ' + data.subject + ' получены');

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Подписка будет оформлена не более чем через 24 часа. \n' +
                                                    'Всю информацию вы получите в этом чате.');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }

});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))

