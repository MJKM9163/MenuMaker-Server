import axios from "../../../node_modules/axios/index";

const { REACT_APP_API_KEY, KEY_ID } = process.env;

export const price100 = async ctx => {
    const { today } = ctx.request.params
    console.log(today)
    try {
        ctx.body = [];
        console.log('100실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=100`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('100try중 실패 했습니다.')
    };
};
export const price200 = async ctx => {
    const { today } = ctx.request.params
    try {
        ctx.body = [];
        console.log('200실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=200`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('200try중 실패 했습니다.')
    };
};
export const price300 = async ctx => {
    const { today } = ctx.request.params
    try {
        ctx.body = [];
        console.log('300실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=300`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('300try중 실패 했습니다.')
    };
};
export const price400 = async ctx => {
    const { today } = ctx.request.params
    try {
        ctx.body = [];
        console.log('400실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=400`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('400try중 실패 했습니다.')
    };
};
export const price500 = async ctx => {
    const { today } = ctx.request.params
    try {
        ctx.body = [];
        console.log('500실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=500`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('500try중 실패 했습니다.')
    };
};
export const price600 = async ctx => {
    const { today } = ctx.request.params
    try {
        ctx.body = [];
        console.log('600실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=${today}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json&p_item_category_code=600`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('600try중 실패 했습니다.')
    };
};