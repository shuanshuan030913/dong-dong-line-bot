'use strict'

import constant from '../constant';

const replyText = async({client, replyToken, inputText, source}) => {
    try{
        let responseText = '';
        const detectWords = Object.keys(constant.REPLY_TEXT);
        for (let detectWord of detectWords) {
            if (inputText.includes(detectWord)) {
                responseText = `${source.userName ? ('回復' + source.userName + '： ') : ''}${constant.REPLY_TEXT[detectWord]} `;
                break;
            }
        }
        if (responseText && responseText.length > 0) {
            return client.replyMessage(replyToken, {
                type: 'text',
                text: responseText,
            });
        }
    } catch (err) {
        console.log('replyText err: ', err);
    }
}

const replyImg = async({client, replyToken, inputText, source}) => {
    try{
        let responseImgs = [];
        const detectWords = Object.keys(constant.REPLY_IMG);

        // 關鍵字 求
        if (inputText.indexOf('求') === 0) {
            const keyword = inputText.substring(2, inputText.length);
            for (let detectWord of detectWords) {
                if (keyword.toUpperCase() === detectWord.toUpperCase()) {
                    responseImgs = [...constant.REPLY_IMG[detectWord]];
                    break;
                }
            }
        }

        if (responseImgs && responseImgs.length > 0) {
            const replyFormat = responseImgs.map(img => {
                return {
                    type: 'image',
                    originalContentUrl: constant.IMG_URL + img,
                    previewImageUrl: constant.IMG_URL + img,
                }
            })
            return client.replyMessage(replyToken, replyFormat);
        }
    } catch (err) {
        console.log('replyImg err: ', err);
    }
}


export {replyText, replyImg};