'use strict'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import dayjs from 'dayjs';
import constant from './constant';

const getData = async () => {
  try{
    const {SHEET_ID: {default: sheetID}} = constant;
    const sheet = await getSheet(sheetID);
  
    if (!sheet) return null;

    const result = [];
    const rows = await sheet.getRows();
    for (let row of rows) {
      result.push(row._rawData);
    }
    return result;
  } catch (err) {
      console.log('getData err: ', err);
  }
};


const setData = async (source) => {
  try{
    const {SHEET_ID: {default: sheetID}} = constant;
    const sheet = await getSheet(sheetID);

    if (!sheet) return null;
    
    await sheet.addRow([source.userName, dayjs().format('YYYY/MM/DD HH:mm:ss')]);
    return 200;
  } catch (err) {
      console.log('setData err: ', err);
  }
};

/**
 * @param  {String} credentialsPath the credentials path default is './credentials.json'
 */
const getSheet = async (sheetID) => {
  try{
    const { DOC_ID: docID } = constant;
    // docID the document ID
    // sheetID the google sheet table ID
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(constant.credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    return sheet;
  } catch (err) {
      console.log('getSheet err: ', err);
  }
};

export { getData, setData, getSheet };