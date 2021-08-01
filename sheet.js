'use strict'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import dayjs from 'dayjs';
import constant from './constant';

const getData = async(docID, sheetID) => {
    const sheet = await getSheet(docID, sheetID);

    const result = [];
    const rows = await sheet.getRows();
    for (let row of rows) {
      result.push(row._rawData);
    }
    return result;
};


const setData = async(docID, sheetID) => {
    const sheet = await getSheet(docID, sheetID);
    const result = await sheet.addRow(['Larry Page', dayjs().format('YYYY/MM/DD HH:mm:ss')]);
    console.log('setData', JSON.stringify(result))
    return 200;
};

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path default is './credentials.json'
 */
const getSheet = async(docID, sheetID) => {
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(constants.credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    return sheet;
};
  
  export { getData, setData };