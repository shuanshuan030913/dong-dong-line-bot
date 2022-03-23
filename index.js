'use strict'

import { Client, middleware } from '@line/bot-sdk';
import express from 'express';
require('dotenv').config();
import { getData, setData } from './sheet';
import { leaveGroup } from './service/leaveGroup';
import { replyText, replyImg, replyAllImgs } from './service/replyEvent';

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '方便自己開發用的，不然已經設定好heroku config var 是不用再另外assign的',
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
                const result = {
                    groupId: event.source.groupId,
                    userId: event.source.userId,
                };
                // 取得群組資訊：使用者名稱
                if (result.groupId) {
                    const profile = await client.getGroupMemberProfile(event.source.groupId, event.source.userId);
                    result.userName = profile.displayName;
                }
                const re = /https?:\/\//g;
                const checkWebsite = event.message.text.match(re);
                // 非網址列才偵測回應
                if (!checkWebsite) {
                    // console.log(JSON.stringify(event.message));
                    await textHandler(event.replyToken, event.message.text, result);
                } else {
                    console.log('checkWebsite')
                }
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
        let isReplyed = false;
        // google sheet
        // source.userName ? await setData(source) : null;
        // return true;

        // 離開事件
        isReplyed = await leaveGroup({client, replyToken, inputText, source});
        if (isReplyed) return true;

        // 圖片回復
        // 查詢所有圖片
        isReplyed = await replyAllImgs({client, replyToken, inputText, source});
        if (isReplyed) return true;

        // 關鍵字 #
        if (inputText.indexOf('#') === 0) {
            isReplyed = await replyImg({client, replyToken, inputText, source});
            if (isReplyed) return true;
        }

        // 文字回復
        isReplyed = await replyText({client, replyToken, inputText, source});
        if (isReplyed) return true;


    } catch (err) {
        console.log('textHandler', err)
    }

}


const port = process.env.PORT || 3000;  //heroku 會自己隨機給你一個port，所以不能寫死，3000是另外測試用，會在後面提到
app.listen(port, () => {
    console.log(`App now running on port ${port}`);
});