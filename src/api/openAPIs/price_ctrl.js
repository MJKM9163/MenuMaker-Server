import axios from "../../../node_modules/axios/index";
//const converter = require('xml-js');


export const price = async (ctx) => {
    const API_Key = process.env.REACT_APP_API_KEY;
    
    let response;
    try {
      response = await axios.get(
        `http://apis.data.go.kr/B552895/openapi/service/OrgPriceExaminService/getExaminPriceList?ServiceKey=${API_Key}&pageNo=1&numOfRows=10&examinDe=20150502&examinCd=6&prdlstCd=223`
      )
    } catch (e) {
      console.log(e);
    }
    // const xmlToJson = converter.xml2json(response.data)
    // ctx.body = xmlToJson;
    ctx.body = response.data;
    console.log('Status', response.status);
    return response;
  };