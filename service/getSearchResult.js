import RECIPES from "../farmData/recipes";
import {get, map, find, isArray, isObject} from 'lodash';

const getSearchResult = kw => {
    let result;

    /* 尋找菜譜 */
    let recipes = getRecipes(kw);
    if (isObject(recipes) && get(recipes, 'name.zh', null)) {
        result = '我有';
        result += recipes.name.zh + '！';
    } else if (isArray(recipes) && recipes.length > 0) {
        result = '我這裡有';
        result += map(recipes, 'name.zh').join('、');
    }


    console.log(`getSearchResult, input: ${kw}, result: ${result}`);
    return result ? result : '窩找不到！沒有！';
}


const getRecipes = (kw) => {
    let relativeResult = [];
    /*精確資料*/
    let result = find(RECIPES, r => r.name.zh === kw);
    if (result) return result;

    /*模糊資料*/
    RECIPES.forEach(r => {
        if (r.name.zh.includes(kw)) {
            relativeResult.push(r);
        };
    });
    return relativeResult;
}

export default getSearchResult;