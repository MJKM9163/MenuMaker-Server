import axios from "../../../node_modules/axios/index";

export const price100 = async ctx => {
    try {
        ctx.body = [];
        console.log('100실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=100`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('100try중 실패 했습니다.')
    };
};
export const price200 = async ctx => {
    try {
        ctx.body = [];
        console.log('200실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=200`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('200try중 실패 했습니다.')
    };
};
export const price300 = async ctx => {
    try {
        ctx.body = [];
        console.log('300실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=300`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('300try중 실패 했습니다.')
    };
};
export const price400 = async ctx => {
    try {
        ctx.body = [];
        console.log('400실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=400`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('400try중 실패 했습니다.')
    };
};
export const price500 = async ctx => {
    try {
        ctx.body = [];
        console.log('500실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=500`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('500try중 실패 했습니다.')
    };
};
export const price600 = async ctx => {
    try {
        ctx.body = [];
        console.log('600실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=600`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('600try중 실패 했습니다.')
    };
};