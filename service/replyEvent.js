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
        for (let detectWord of detectWords) {
            if (inputText.includes(detectWord)) {
                responseImgs.push("test");
                break;
            }
        }
        let tempURL = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        if (responseImgs && responseImgs.length > 0) {
            return client.replyMessage(replyToken, {
                type: 'image',
                // originalContentUrl: constant.IMG_URL + "/images/tests.jpg",
                // previewImageUrl: constant.IMG_URL + "/images/tests.jpg",
                originalContentUrl: tempURL,
                previewImageUrl: tempURL,
            });
        }
    } catch (err) {
        console.log('replyImg err: ', err);
    }
}


export {replyText, replyImg};