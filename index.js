import { Client, middleware } from '@line/bot-sdk';
import express from 'express';
import constant from './constant';
require('dotenv').config();

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
                        "groupId":"000",
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

const handleEvent = async(event) => {
    switch (event.type) {
    case 'join': //這隻機器人加入別人的群組
        break;
    case 'follow': //追蹤這隻機器人
        break;
    case 'message': //傳訊息給機器人
        switch (event.message.type) {
        case 'text':
            try {
                const profile = await client.getGroupMemberProfile(event.source.groupId, event.source.userId);
                const result = {
                    groupId: event.source.groupId,
                    userId: event.source.userId,
                    userName: profile.displayName,
                };
                await textHandler(event.replyToken, event.message.text, result);
            } catch(err) {
                console.log('handleEvent err', err)
            };

            break;
        case 'sticker':
            // do sth with sticker
            return 
        }
    }
}

const textHandler = async (replyToken, inputText, source) => {
    try{
        let responseText = '';
        const detectWords = Object.keys(constant.ACTIVE_TEXT);
        for (let detectWord of detectWords) {
            if (inputText.includes(detectWord)) {
                responseText = `回復${source.userName}：${constant.ACTIVE_TEXT[detectWord]} `;
                break;
            }
        }
        if (responseText && responseText.length > 0) {
            return client.replyMessage(replyToken, {
                type: 'text',
                text: responseText,
            });
        }

        let detectLeave = constant.LEAVE_TEXT.reduce((a, b) => a && inputText.includes(b), true);
        if (detectLeave) {
            await client.replyMessage(replyToken, [
                {
                    type: 'text',
                    text: '青山不改 綠水長流 他日有緣再碰頭',
                },{
                    type: 'text',
                    text: '掰啦',
                }
            ]);
            await client.leaveGroup(source.groupId);
        }
    } catch (err) {
        console.log('textHandler', err)
    }

}


const port = process.env.PORT || 3000;  //heroku 會自己隨機給你一個port，所以不能寫死，3000是另外測試用，會在後面提到
app.listen(port, () => {
    console.log(`App now running on port ${port}`);
});