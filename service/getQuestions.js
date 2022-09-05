'use strict';


import constant from './../constant';
import {getSheet} from './../sheet';

var myQuestions=[];
var users=[];
var totalSteps=0;
var myReplies=[];

const getQuestions = async() => {
    const {SHEET_ID: {questions: sheetID}} = constant;
    const sheet = await getSheet(sheetID);

    if (!sheet) return null;

    await sheet.loadCells('A1:E10');
    const currentQusetion = sheet.getCell(0, 0);

    console.log('currentQusetion', currentQusetion);
    return currentQusetion.value;

}

export default getQuestions; 