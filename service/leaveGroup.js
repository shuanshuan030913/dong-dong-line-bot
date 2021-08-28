'use strict'

import constant from '../constant';

const leaveGroup = async({client, replyToken, inputText, source}) => {
    try{
        let detectLeave = constant.LEAVE_TEXT === inputText;
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
            return await client.leaveGroup(source.groupId);
        }
    } catch (err) {
        console.log('leaveGroup err: ', err);
    }
}

export {leaveGroup};