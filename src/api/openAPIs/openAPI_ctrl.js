import axios from "../../../node_modules/axios/index";

export const price = async ctx => {
    try {
        ctx.body = [];
        console.log('실행 시작')
        const priceListCall =
        await axios.get(`http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_regday=2021-12-03&p_convert_kg_yn=Y&p_cert_key=c95405c0-0b44-4cfb-be1f-7ad6031f0909&p_cert_id=2218&p_returntype=json&p_item_category_code=100`);
        ctx.body = priceListCall.data
    } catch (e) {
        console.log('try중 실패 했습니다.')
    };
};