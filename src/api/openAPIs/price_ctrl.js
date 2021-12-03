import axios from "../../../node_modules/axios/index";

const box = [];
export const price = async ctx => {
    const { REACT_APP_API_KEY, KEY_ID } = process.env;
    const { toDay,
            categoryCode, } = ctx.params;
    console.log(ctx.params)
    ctx.body = [];
    let response;
    try {
      response = await axios.get(
        `http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_regday=${toDay}&p_convert_kg_yn=Y&p_item_category_code=${categoryCode}&p_cert_key=${REACT_APP_API_KEY}&p_cert_id=${KEY_ID}&p_returntype=json`
      )

    if (box.length === 6) {
      box.length = 0;
      box.push(response.data);
        
    } else if (box.length < 6) {
      box.push(response.data);
    }
  
    if (box.length === 6) {
      // ctx.body = box;
      ctx.body.push(...box)
      console.log(ctx.body[0].data.item[0])
      console.log("마무리")
    }
    console.log(box.length)
    
    } catch (e) {
      console.log(e);
    }

  };