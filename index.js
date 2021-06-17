import { Client, middleware } from '@line/bot-sdk';
import express from 'express';
import constant from './constant';

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '方便自己開發用的，不然已經設定好heroku condig var 是不用再另外assign的',
    channelSecret: process.env.CHANNEL_SECRET || '同上'
};

const client = new Client(lineConfig);
const app = express();

app.post('/', middleware(lineConfig), async (req, res) => {
    try {
        /*{  req.body長這樣
            "events": [
                {
                    "type": "message",
                    "replyToken": "uuidhere",
                    "source": {
                        "userId": "xxxx"",
                        "type": "user"
                    },
                    "timestamp": 1592813446208,
                    "mode": "active",
                    "message": {
                        "type": "text",
                        "id": "12188948022060",
                        "text": "X"
                    }
                }
            ],
            "destination": "xxx"
        }*/
        let result = await req.body.events.map(handleEvent);
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
});

const handleEvent = (event) => {
    switch (event.type) {
    case 'join': //這隻機器人加入別人的群組
        break;
    case 'follow': //追蹤這隻機器人
        break;
    case 'message': //傳訊息給機器人
        switch (event.message.type) {
        case 'text':
            textHandler(event.replyToken, event.message.text);
            break;
        case 'sticker':
            // do sth with sticker
            return 
        }
    }
}

const textHandler = (replyToken, inputText) => {
    try{
        const detectWords = Object.keys(constants.ACTIVE_TEXT);
        for (let detectWord of detectWords) {
            if (inputText.includes(detectWord)) {
                client.replyMessage(replyToken, {
                    type: 'text',
                    text: constant.ACTIVE_TEXT[inputText],
                });
                break;
            }
        }
    } catch (err) {
        console.log(err)
    }

}


const port = process.env.PORT || 3000;  //heroku 會自己隨機給你一個port，所以不能寫死，3000是另外測試用，會在後面提到
app.listen(port, () => {
    console.log(`App now running on port ${port}`);
});