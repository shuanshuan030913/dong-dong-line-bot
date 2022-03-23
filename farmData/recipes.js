
const RECIPES = Object.freeze([
    {
        id: 1,
        type: 1,
        name: {zh: '蕪菁沙拉', jp: 'かぶのサラダ'},
        tool: [],
        ingredient: [1],
        cooking: [],
        more: {
            ingredient: [11, 10, 17, 3, 2],
            cooking: [],
        },
    },
    {
        id: 2,
        type: 1,
        name: {zh: '蕃茄沙拉', jp: 'トマトサラダ'},
        tool: [],
        ingredient: [2],
        cooking: [],
        more: {
            ingredient: [10, 17, 18, 1, 3, 12],
            cooking: [],
        },
    },
    {
        id: 3,
        type: 1,
        name: {zh: '洋蔥沙拉', jp: 'オニオンサラダ'},
        tool: [1],
        ingredient: [3],
        cooking: [],
    },
    {
        id: 4,
        type: 1,
        name: {zh: '土豆泥', jp: 'マッシュポテト'},
        tool: [1],
        ingredient: [4, 5],
        cooking: [],
    },
    {
        id: 5,
        type: 1,
        name: {zh: '香草沙拉', jp: 'ハーブサラダ'},
        tool: [],
        ingredient: [6, 7, 8],
        cooking: [],
    },
    {
        id: 6,
        type: 1,
        name: {zh: '蕃茄芝士沙拉', jp: 'カプレーゼ'},
        tool: [],
        ingredient: [2, 9],
        cooking: [],
    },
    {
        id: 7,
        type: 1,
        name: {zh: '含羞草沙拉', jp: 'ミモザサラダ'},
        tool: [],
        ingredient: [10, 11, 12],
        cooking: [999],
    },
    {
        id: 8,
        type: 1,
        name: {zh: '拌菜', jp: 'おひたし'},
        tool: [1],
        ingredient: [13],
        cooking: [],
    },
    {
        id: 9,
        type: 1,
        name: {zh: '醃蘿蔔', jp: '淺づけ'},
        tool: [3],
        ingredient: [10, 1],
        cooking: [],
    },
    {
        id: 10,
        type: 1,
        name: {zh: '韓式黃瓜拌菜', jp: 'きゅうりのナムル'},
        tool: [],
        ingredient: [10, 9],
        cooking: [],
    },
    {
        id: 11,
        type: 1,
        name: {zh: '豆腐沙拉', jp: '豆腐のサラダ'},
        tool: [],
        ingredient: [14, 10, 3],
        cooking: [],
    },
    {
        id: 12,
        type: 1,
        name: {zh: '義粉沙拉', jp: 'サラダパスタ'},
        tool: [],
        ingredient: [10],
        cooking: [998],
    },
    {
        id: 13,
        type: 1,
        name: {zh: '日式沙拉', jp: '和風サラダ'},
        tool: [],
        ingredient: [15, 16, 3],
        cooking: [],
    },
    {
        id: 14,
        type: 1,
        name: {zh: '什錦沙拉', jp: 'ミックスサラダ'},
        tool: [3],
        ingredient: [11, 10, 12, 2],
        cooking: [],
    },




    {
        id: 998,
        type: 2,
        name: {zh: '義大利麵', jp: 'パスタ'},
        tool: [],
        ingredient: [],
        cooking: [],
    },
    {
        id: 999,
        type: 2,
        name: {zh: '煮雞蛋', jp: 'ゆで卵'},
        tool: [],
        ingredient: [],
        cooking: [],
    },
])

export default RECIPES;