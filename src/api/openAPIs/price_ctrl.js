import axios from "../../../node_modules/axios/index";
//const converter = require('xml-js');
// `http://apis.data.go.kr/B552895/openapi/service/OrgPriceExaminService/getExaminPriceList?ServiceKey=${API_Key}&pageNo=1&numOfRows=2&examinDe=20150502&examinCd=6&prdlstCd=224`
//http://apis.data.go.kr/B552895/LocalGovPriceInfoService/getItemPriceResearchSearch
export const price = async (ctx) => {
    const API_Key = process.env.REACT_APP_API_KEY;
    const text = encodeURIComponent("쌀");
    const num = encodeURIComponent("02");
    console.log(ctx.params)
    let response;
    try {
      response = await axios.get(
        `http://apis.data.go.kr/B552895/openapi/service/OrgPriceExaminService/getExaminPriceList?ServiceKey=${API_Key}&pageNo=1&numOfRows=1&examinDe=20211201&examinCd=6&prdlstCd=111&prdlstNm=${text}&spciesCd=01`
      )
    } catch (e) {
      console.log(e);
    }
    // const xmlToJson = converter.xml2json(response.data)
    // ctx.body = xmlToJson;
    ctx.body = response.data;
    console.log('Status', response.status);
  };