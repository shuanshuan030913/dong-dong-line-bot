'use strict'

import constant from '../constant';
import getSearchResult from "./getSearchResult";

const replyText = async({client, replyToken, inputText, source}) => {
    try{
        let responseText = '';
        responseText = getSearchResult(inputText);
        /* 關鍵字偵測
        const detectWords = Object.keys(constant.REPLY_TEXT);
        for (let detectWord of detectWords) {
            if (inputText.includes(detectWord)) {
                responseText = `${source.userName ? ('回復' + source.userName + '： ') : ''}${constant.REPLY_TEXT[detectWord]} `;
                break;
            }
        }*/
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

const replyAllImgs = async({client, replyToken, inputText, source}) => {
    try{
        const detectWord = constant.GET_IMGS_TEXT;

        if (detectWord === inputText) {
            const detectWords = Object.keys(constant.REPLY_IMG);
            let responseText = '所有的譜：\n' + detectWords.join('\n');
            responseText += '\n\n#查詢樂譜，例：#google';
            
            return client.replyMessage(replyToken, {
                type: 'text',
                text: responseText,
            });
        }

    } catch (err) {
        console.log('replyAllImgs err: ', err);
    }
}

const replyImg = async({client, replyToken, inputText, source}) => {
    try{
        let responseImgs = [];
        const detectWords = Object.keys(constant.REPLY_IMG);

        const keyword = inputText.substring(1, inputText.length);
        for (let detectWord of detectWords) {
            if (keyword.toUpperCase() === detectWord.toUpperCase()) {
                responseImgs = [...constant.REPLY_IMG[detectWord]];
                break;
            }
        }

        if (responseImgs && responseImgs.length > 0) {
            console.log('responseImgs', constant.IMG_URL + responseImgs[0])
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


export {replyText, replyAllImgs, replyImg};