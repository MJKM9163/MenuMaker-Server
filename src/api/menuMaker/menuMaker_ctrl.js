import Menu from "../../models/menu";

export const riceList = async ctx => {
    const request = parseInt(ctx.request.body.number);
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const { rice } = ctx.request.body.percentObject;
    const dataArray = [data100, data200, data300, data400, data500, data600]
    const ricesArray = [];
    const priceResponseArray = [];
    const priceArray = [];
    const subPriceArray = [];
    ctx.body = ({
        rices: [],
        price: [],
    })

    for (let i = 0; i < request; i++) {
        const ricesPrice = [];
        priceResponseArray.length = 0;
        priceArray.length = 0;
        subPriceArray.length = 0;
        try {
            const rices = await Menu.aggregate([
                {$match: { category: '밥' }},
                {$sample: { size: 3 }}
            ]);

            if (ricesArray.length == 3) {
                check1: for (let n = 0; n < 3; n++) {
                    const check1 = rices[n].menuname;
                    for (let u = 0; u < 3; u++) {
                        const check2 = ricesArray[u].menuname;
                        const final = check1 === check2;
                        if (final) {
                            i--;
                            break check1;
                        } else if (n == 2 && u == 2 && !final) {
                            priceResponseArray.push(rices)
                            const bodyLength = priceResponseArray.length - 1;
                            for (let b = 0; b < 3; b++) {
                                const subGatherArray = [];
                                const mainCheck = priceResponseArray[bodyLength][b].main_ingredient;
                                const subMainLength = priceResponseArray[bodyLength][b].ingredient.length;
                                const mainPriceCheck = data100.data.item.filter(item=>{
                                    if (item.item_name === mainCheck) {
                                        return true
                                    }
                                    return false
                                })
                                priceArray.push(mainPriceCheck);

                                const subAddArray = [];
                                for (let h = 0; h < subMainLength; h++) {
                                    const subMainCheck = priceResponseArray[bodyLength][b].ingredient[h];

                                    let subMainPriceCheck;
                                    for (let api = 0; api < 6; api++) {
                                        subMainPriceCheck = dataArray[api].data.item.filter(item=>{
                                            if (item.item_name === subMainCheck) {
                                                return true
                                            }
                                            return false
                                        })
                                    }
                                    if (subMainPriceCheck !== []) {
                                        subGatherArray.push(...subMainPriceCheck);
                                    };
                                    if (subMainLength === 1) {
                                        subPriceArray.push(subGatherArray);
                                    } else if (subMainLength > 1) {
                                        if (i < subMainLength - 1) {
                                            subAddArray.push(...subGatherArray)
                                        } else if (i === subMainLength - 1) {
                                            subPriceArray.push(subAddArray);
                                        }
                                    }
                                };
                            };
            
                            priceBreak: for (let c = 0; c < 3; c++) {

                                const dozenPriceValue = priceArray[c].length;
                                for (let d = 0; d < dozenPriceValue; d++) {
            
                                    let priceValue = priceArray[c][d].dpr1.replace(/,/,"") // 당일 가격
                                    if (priceValue === "-") {
                                        priceValue = priceArray[c][d].dpr2.replace(/,/,"") // 1일전 가격
                                        if (priceValue === "-") {
                                            priceValue = priceArray[c][d].dpr3.replace(/,/,"") // 1주일전 가격
                                            if (priceValue === "-") {
                                                priceValue = priceArray[c][d].dpr5.replace(/,/,"") // 1개월전 가격
                                                if (priceValue === "-") {
                                                    priceValue = priceArray[c][d].dpr6.replace(/,/,"") // 1년전 가격
                                                }
                                            }
                                        }
                                    }
                                    let priceResult
                                    let onePrice
                                    let subPriceResult
                                    let subOnePrice
                                    try {
                                        const subMainCountType = subPriceArray[c][d].unit;
                                        let subPriceValue = subPriceArray[c][d].dpr1.replace(/,/,"")
                                        if (subPriceValue === "-") {
                                            subPriceValue = subPriceArray[c][d].dpr2.replace(/,/,"") // 1일전 가격
                                            if (subPriceValue === "-") {
                                                subPriceValue = subPriceArray[c][d].dpr3.replace(/,/,"") // 1주일전 가격
                                                if (subPriceValue === "-") {
                                                    subPriceValue = subPriceArray[c][d].dpr5.replace(/,/,"") // 1개월전 가격
                                                    if (subPriceValue === "-") {
                                                        subPriceValue = subPriceArray[c][d].dpr6.replace(/,/,"") // 1년전 가격
                                                    }
                                                }
                                            }
                                        }
                                        const in_W = priceResponseArray[bodyLength][c].ingredient_weight[d];
                                        const sub_number_regex = subMainCountType.replace(/[^0-9]/g, "");
                                        const sub_type_regex = subMainCountType.replace(/[0-9]/g, "");
                                        if (sub_type_regex === "kg") {
                                            subPriceResult = Number(in_W) / (1000 * Number(sub_number_regex));
                                            subOnePrice = Number(subPriceValue) * subPriceResult;
                                        } else if (sub_type_regex === "g") {
                                            subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                            subOnePrice = Number(subPriceValue) * subPriceResult;
                                        } else if (sub_type_regex === "마리") {
                                            subPriceResult = Number(in_W) / (3 * Number(sub_number_regex));
                                            subOnePrice = Number(subPriceValue) * subPriceResult;
                                        } else if (sub_type_regex === "개") {
                                            subPriceResult = Number(in_W) / (2 * Number(sub_number_regex));
                                            subOnePrice = Number(subPriceValue) * subPriceResult;
                                        } else if (sub_type_regex === "포기") {
                                            subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                            subOnePrice = Number(subPriceValue) * subPriceResult;
                                        }

                                    } catch (e) {
                                        console.log("서브재료의 가격이 없습니다.")
                                    }
                                    const mainCountType = priceArray[c][d].unit;
                                    const me_W = priceResponseArray[bodyLength][c].main_ingredient_weight;
                                    const number_regex = mainCountType.replace(/[^0-9]/g, "");
                                    const type_regex = mainCountType.replace(/[0-9]/g, "");

                                    if (type_regex === 'kg') {
                                        priceResult = Number(me_W) / (1000 * Number(number_regex));
                                        onePrice = Number(priceValue) * priceResult;
                                    } else if (type_regex === 'g') {
                                        priceResult = Number(me_W) / (1 * Number(number_regex));
                                        onePrice = Number(priceValue) * priceResult;
                                    } else if (type_regex === '마리') {
                                        priceResult = Number(me_W) / (3 * Number(number_regex));
                                        onePrice = Number(priceValue) * priceResult;
                                    } else if (type_regex === '개') {
                                        priceResult = Number(me_W) / (2 * Number(number_regex));
                                        onePrice = Number(priceValue) * priceResult;
                                    } else if (type_regex === '포기') {
                                        priceResult = Number(me_W) / (1 * Number(number_regex));
                                        onePrice = Number(priceValue) * priceResult;
                                    }
            
                                    let finalPriceResult
                                    if (subOnePrice >= 1) {
                                        finalPriceResult = onePrice + subOnePrice;
                                    } else if (subOnePrice !== true) {
                                        finalPriceResult = onePrice
                                    };
            
                                    if (finalPriceResult <= rice && c === 2) {
                                        ricesPrice.push(finalPriceResult)
                                        ctx.body.rices.push(rices)
                                        ctx.body.price.push(ricesPrice)

                                    } else if (finalPriceResult <= rice) {
                                        ricesPrice.push(finalPriceResult)
                                    } else if (finalPriceResult === undefined) {
                                        ricesPrice.push(0)
                                    } else if (finalPriceResult > rice) {
                                        i--;
                                        break priceBreak;
                                    }

                                }                               
                            }                           
                        }                        
                    }
                    if (n == 2) {
                        ricesArray.length = 0;
                    }
                }
            } else if (ricesArray.length == 0) {
                ricesArray.push(...rices);
                priceResponseArray.push(rices)
                const bodyLength = priceResponseArray.length - 1;
                for (let b = 0; b < 3; b++) {
                    const mainCheck = priceResponseArray[bodyLength][b].main_ingredient;
                    const subMainLength = priceResponseArray[bodyLength][b].ingredient.length
                    const mainPriceCheck = data100.data.item.filter(item=>{
                        if (item.item_name === mainCheck) {
                            return true
                        }
                        return false
                    })
                    priceArray.push(mainPriceCheck);

                    const subAddArray = [];
                    for (let i = 0; i < subMainLength; i++) {
                        const subGatherArray = []
                        const subMainCheck = priceResponseArray[bodyLength][b].ingredient[i];
                        let subMainPriceCheck;
                        for (let api = 0; api < 6; api++) {
                            subMainPriceCheck = dataArray[api].data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                        }
                        if (subMainPriceCheck !== []) {
                            subGatherArray.push(...subMainPriceCheck);
                        };
                        if (subMainLength === 1) {
                            subPriceArray.push(subGatherArray);
                        } else if (subMainLength > 1) {
                            if (i < subMainLength - 1) {
                                subAddArray.push(...subGatherArray)
                            } else if (i === subMainLength - 1) {
                                subPriceArray.push(subAddArray);
                            }
                        }
                    }
                    if (subMainLength === 0) {
                        subPriceArray.push([]);
                    };
                };
                priceBreak: for (let c = 0; c < 3; c++) {
                    const dozenPriceValue = subPriceArray[c].length;
                        let priceValue = priceArray[c][0].dpr1.replace(/,/,"") // 당일 가격
                        if (priceValue === "-") {
                            priceValue = priceArray[c][0].dpr2.replace(/,/,"") // 1일전 가격
                            if (priceValue === "-") {
                                priceValue = priceArray[c][0].dpr3.replace(/,/,"") // 1주일전 가격
                                if (priceValue === "-") {
                                    priceValue = priceArray[c][0].dpr5.replace(/,/,"") // 1개월전 가격
                                    if (priceValue === "-") {
                                        priceValue = priceArray[c][0].dpr6.replace(/,/,"") // 1년전 가격
                                    }
                                }
                            }
                        }
                        let priceResult
                        let onePrice
                        let subPriceResult
                        let subOnePrice

                        const addArray = [];
                        for (let d = 0; d < dozenPriceValue; d++) {
                            try {
                                const subMainCountType = subPriceArray[c][d].unit;
                                let subPriceValue = subPriceArray[c][d].dpr1.replace(/,/,"")
                                if (subPriceValue === "-") {
                                    subPriceValue = subPriceArray[c][d].dpr2.replace(/,/,"") // 1일전 가격
                                    if (subPriceValue === "-") {
                                        subPriceValue = subPriceArray[c][d].dpr3.replace(/,/,"") // 1주일전 가격
                                        if (subPriceValue === "-") {
                                            subPriceValue = subPriceArray[c][d].dpr5.replace(/,/,"") // 1개월전 가격
                                            if (subPriceValue === "-") {
                                                subPriceValue = subPriceArray[c][d].dpr6.replace(/,/,"") // 1년전 가격
                                            }
                                        }
                                    }
                                }
                                const in_W = priceResponseArray[bodyLength][c].ingredient_weight[0];
                                const sub_number_regex = subMainCountType.replace(/[^0-9]/g, "");
                                const sub_type_regex = subMainCountType.replace(/[0-9]/g, "");
                                if (sub_type_regex === 'kg') {
                                    subPriceResult = Number(in_W) / (1000 * Number(sub_number_regex));
                                    subOnePrice = Number(subPriceValue) * subPriceResult;
                                } else if (sub_type_regex === 'g') {
                                    subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                    subOnePrice = Number(subPriceValue) * subPriceResult;
                                } else if (sub_type_regex === '마리') {
                                    subPriceResult = Number(in_W) / (3 * Number(sub_number_regex));
                                    subOnePrice = Number(subPriceValue) * subPriceResult;
                                } else if (sub_type_regex === '개') {
                                    subPriceResult = Number(in_W) / (2 * Number(sub_number_regex));
                                    subOnePrice = Number(subPriceValue) * subPriceResult;
                                } else if (sub_type_regex === '포기') {
                                    subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                    subOnePrice = Number(subPriceValue) * subPriceResult;
                                }

                                if (dozenPriceValue > 1) {
                                    if (d === dozenPriceValue - 1) {
                                        subOnePrice = addArray.reduce((a,b) => (a+b));
                                    }
                                } 
                            } catch (e) {
                                console.log("서브재료의 가격이 없습니다.")
                            }
                        }
                            const mainCountType = priceArray[c][0].unit;
                            const me_W = priceResponseArray[bodyLength][c].main_ingredient_weight;
                            const number_regex = mainCountType.replace(/[^0-9]/g, "");
                            const type_regex = mainCountType.replace(/[0-9]/g, "");
                            if (type_regex === 'kg') {
                                priceResult = Number(me_W) / (1000 * Number(number_regex));
                                onePrice = Number(priceValue) * priceResult;
                            } else if (type_regex === 'g') {
                                priceResult = Number(me_W) / (1 * Number(number_regex));
                                onePrice = Number(priceValue) * priceResult;
                            } else if (type_regex === '마리') {
                                priceResult = Number(me_W) / (3 * Number(number_regex));
                                onePrice = Number(priceValue) * priceResult;
                            } else if (type_regex === '개') {
                                priceResult = Number(me_W) / (2 * Number(number_regex));
                                onePrice = Number(priceValue) * priceResult;
                            } else if (type_regex === '포기') {
                                priceResult = Number(me_W) / (1 * Number(number_regex));
                                onePrice = Number(priceValue) * priceResult;
                            }

                            let finalPriceResult
                            if (subOnePrice >= 1) {
                                finalPriceResult = onePrice + subOnePrice;
                            } else if (subOnePrice !== true) {
                                finalPriceResult = onePrice
                            };
                            if (finalPriceResult <= rice && c === 2) {
                                ricesPrice.push(finalPriceResult)
                                ctx.body.rices.push(rices)
                                ctx.body.price.push(ricesPrice)
                            } else if (finalPriceResult <= rice) {
                                ricesPrice.push(finalPriceResult)
                            } else if (finalPriceResult === undefined) {
                                ricesPrice.push(0)
                            } else if (finalPriceResult > rice) {
                                ricesArray.length = 0;
                                i--;
                                break priceBreak;
                            }
                }
            };
        } catch (e) {
            ctx.throw(500, e);
        };
    };
    console.log("rice 끝");
};


export const mainList = async ctx => {
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const dataArray = [data100, data200, data300, data400, data500, data600]
    const { main } = ctx.request.body.percentObject;
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    const list = []; // 이때까지 나왔던 메뉴 list

    ctx.body = ({
        mains: [],
        price: [],
    })
    for (let e = 0; e < request; e++) {
        let mainData = []; // 일일 메뉴 list
        let priceMainResponseArray = [];
        let mainPriceArray = [];
        let subPriceArray = [];
        let finalAddArray = []
        try {
            const i = 0;
            priceBreak: while (i < 1) {
                const mains = await Menu.aggregate([
                    {$match: { main: true, main_ingredient: { $nin: outList }, ingredient: { $nin: allOutList } }},
                    {$sample: { size: 1 }}
                ]);
                const check2 = list.find(e => {
                    if (e.menuname === mains[0].menuname) {
                        return true;
                    };
                })
                const M_length = mainData.length;
                const check = mainData.find(e => {
                    if (e.menuname !== mains[0].menuname && !check2) {
                        if (M_length == 1 || M_length == 3 || M_length == 5) {
                            const categoryCheck = mainData[M_length-1].category === mains[0].category;
                            if (categoryCheck) {
                                return true;
                            }
                        }
                        return false;
                    } 
                    return true;
                })
                if (!check2 && !check) {
                    mainData.push(...mains);
                    list.push(...mains);
                    if (mainData.length === 6) {
                        const mainSlice = mainData.slice();
                        priceMainResponseArray.push(mainSlice)
                        const bodyLength = priceMainResponseArray.length - 1;
                        for (let b = 0; b < 6; b++) {
                            const gatherArray = [];
                            const mainCheck = priceMainResponseArray[bodyLength][b].main_ingredient;
                            const subMainLength = priceMainResponseArray[bodyLength][b].ingredient.length

                            let mainPriceCheck;
                            for (let api = 0; api < 6; api++) {
                                mainPriceCheck = dataArray[api].data.item.filter(item=>{
                                    if (item.item_name === mainCheck) {
                                        return true
                                    }
                                    return false
                                })
                                if (mainPriceCheck.length !== 0) {
                                    gatherArray.push(...mainPriceCheck);
                                } 
                            }
                            if (mainPriceCheck.length === 0) {
                                mainPriceArray.push([]);
                            }
                            mainPriceArray.push(gatherArray);

                            const subAddArray = [];
                            for (let i = 0; i < subMainLength; i++) {
                                const subGatherArray = [];
                                const subMainCheck = priceMainResponseArray[bodyLength][b].ingredient[i];
                                for (let api = 0; api < 6; api++) {
                                    let subMainPriceCheck = dataArray[api].data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    if (subMainPriceCheck.length !== 0) {
                                        subGatherArray.push(...subMainPriceCheck);
                                    }
                                }

                                if (subMainLength === 1) {
                                    subPriceArray.push([subGatherArray]);
                                } else if (subMainLength > 1) {
                                    if (i < subMainLength - 1) {
                                        subAddArray.push(subGatherArray)
                                    } else if (i === subMainLength - 1) {
                                        subPriceArray.push(subAddArray);
                                    }
                                }
                            }
                            if (subMainLength === 0) {
                                subPriceArray.push([[]]);
                            };
                        };
                        for (let c = 0; c < 6; c++) {
                            let mainsPrice = [];
                            let subResultArray = [];
                            const dozenPriceValue = mainPriceArray[c].length;
                            const dozenSubPriceValue = subPriceArray[c].length;
                            let priceValue;
                            if (dozenPriceValue === 0) {
                                subResultArray.push(0)
                            } for (let single = 0; single < dozenPriceValue; single++) {
                                priceValue = mainPriceArray[c][single].dpr1.replace(/,/,"") // 당일 가격
                                if (priceValue === "-") {
                                    priceValue = mainPriceArray[c][single].dpr2.replace(/,/,"") // 1일전 가격
                                    if (priceValue === "-") {
                                        priceValue = mainPriceArray[c][single].dpr3.replace(/,/,"") // 1주일전 가격
                                        if (priceValue === "-") {
                                            priceValue = mainPriceArray[c][single].dpr5.replace(/,/,"") // 1개월전 가격
                                            if (priceValue === "-") {
                                                priceValue = mainPriceArray[c][single].dpr6.replace(/,/,"") // 1년전 가격
                                                if (priceValue === "-") {
                                                    priceValue = '0'; // 가격 없음
                                                }
                                            }
                                        }
                                    }
                                }
                                mainsPrice.push(priceValue);                              
                            }
                            const result = Math.min.apply(null, mainsPrice);

                            let priceResult
                            let onePrice
                            let mainCountType

                            if (mainPriceArray[c].length === 0) {
                                onePrice = 0;
                            } else if (mainPriceArray[c].length > 0) {
                                mainCountType = mainPriceArray[c][0].unit;
                                const me_W = priceMainResponseArray[bodyLength][c].main_ingredient_weight;
                                const number_regex = mainCountType.replace(/[^0-9]/g, "");
                                const type_regex = mainCountType.replace(/[0-9]/g, "");
                                if (type_regex === 'kg') {
                                    priceResult = Number(me_W) / (1000 * Number(number_regex));
                                    onePrice = Number(result) * priceResult;
                                } else if (type_regex === 'g') {
                                    priceResult = Number(me_W) / (1 * Number(number_regex));
                                    onePrice = Number(result) * priceResult;
                                } else if (type_regex === '마리') {
                                    priceResult = Number(me_W) / (3 * Number(number_regex));
                                    onePrice = Number(result) * priceResult;
                                } else if (type_regex === '개') {
                                    priceResult = Number(me_W) / (2 * Number(number_regex));
                                    onePrice = Number(result) * priceResult;
                                } else if (type_regex === '포기') {
                                    priceResult = Number(me_W) / (1 * Number(number_regex));
                                    onePrice = Number(result) * priceResult;
                                }
                            }

                            for (let single = 0; single < dozenSubPriceValue; single++) {
                                const dozenSubPriceValue_In = subPriceArray[c][single].length;
                                let subMainsPrice = [];
                                let priceSubValue;
                                if (dozenSubPriceValue_In === 0) {
                                    subResultArray.push(0)
                                } else if (dozenSubPriceValue_In > 0) {
                                    for (let singleIn = 0; singleIn < dozenSubPriceValue_In; singleIn++) {
                                        priceSubValue = subPriceArray[c][single][singleIn].dpr1.replace(/,/,"") // 당일 가격
                                        if (priceSubValue === "-") {
                                            priceSubValue = subPriceArray[c][single][singleIn].dpr2.replace(/,/,"") // 1일전 가격
                                            if (priceSubValue === "-") {
                                                priceSubValue = subPriceArray[c][single][singleIn].dpr3.replace(/,/,"") // 1주일전 가격
                                                if (priceSubValue === "-") {
                                                    priceSubValue = subPriceArray[c][single][singleIn].dpr5.replace(/,/,"") // 1개월전 가격
                                                    if (priceSubValue === "-") {
                                                        priceSubValue = subPriceArray[c][single][singleIn].dpr6.replace(/,/,"") // 1년전 가격
                                                        if (priceSubValue === "-") {
                                                            priceSubValue = '0'; // 가격 없음
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        subMainsPrice.push(priceSubValue);
                                    }
                                    const resulting = Math.min.apply(null, subMainsPrice);

                                    let subPriceResult
                                    let subOnePrice

                                    const subMainCountType = subPriceArray[c][single][0].unit;
                                    const in_W = priceMainResponseArray[bodyLength][c].ingredient_weight[single];
                                    const sub_number_regex = subMainCountType.replace(/[^0-9]/g, "");
                                    const sub_type_regex = subMainCountType.replace(/[0-9]/g, "");
                                    if (sub_type_regex === 'kg') {
                                        subPriceResult = Number(in_W) / (1000 * Number(sub_number_regex));
                                        subOnePrice = Number(resulting) * subPriceResult;
                                    } else if (sub_type_regex === 'g') {
                                        subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                        subOnePrice = Number(resulting) * subPriceResult;
                                    } else if (sub_type_regex === '마리') {
                                        subPriceResult = Number(in_W) / (3 * Number(sub_number_regex));
                                        subOnePrice = Number(resulting) * subPriceResult;
                                    } else if (sub_type_regex === '개') {
                                        subPriceResult = Number(in_W) / (2 * Number(sub_number_regex));
                                        subOnePrice = Number(resulting) * subPriceResult;
                                    } else if (sub_type_regex === '포기') {
                                        subPriceResult = Number(in_W) / (1 * Number(sub_number_regex));
                                        subOnePrice = Number(resulting) * subPriceResult;
                                    }
                                    subResultArray.push(subOnePrice)
                                }
                            }
                            const subReduce = subResultArray.reduce((a,b) => (a+b));
                            const finalAdd = onePrice + subReduce;
                            if (finalAdd <= main) {
                                finalAddArray.push(finalAdd);
                            } else if (finalAdd > main) {
                                e--;
                                mainData.length = 0;
                                list.splice(-6, 6);
                                break priceBreak
                            }
                        }
                        ctx.body.mains.push(mainSlice)
                        ctx.body.price.push(finalAddArray)
                        break;
                    }
                }
            }
        } catch (e) {
            ctx.throw(500, e);
        };
    }
    console.log("main 끝");
};

export const sideList = async ctx => {
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const dataArray = [data100, data200, data300, data400, data500, data600]
    const { submain } = ctx.request.body.percentObject;
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    ctx.body = ({
        sides: [],
        price: [],
    })
    for (let i = 0; i < request; i++) {
        const checkCycle = [];
        const sideArray = [];
        const mainFindArray = [];
        let finalArray = [];
        let sidesPriceFinalArray = [];
        let subSidesPriceFinalArray = [];
        try {
            reStart: for (let n = 0; n < 9; n++) {
                let priceCheckArray = [];
                let subPriceCheckArray = [];
                let subSidesPriceArray = [];
                const sides = await Menu.aggregate([
                    {$match: {
                        main: false,
                        main_ingredient: { $nin: outList },
                        ingredient: { $nin: allOutList },
                        category: { $nin: ["밥", "김치"]},
                        cook_type: { $nin: ["국", "찌개"]} }},
                    {$sample: { size: 1 }}
                ]);
                const sideCheck = sides[0].main_ingredient;
                let sidePriceCheck;
                //let gatherArray = [];
                for (let api = 0; api < 6; api++) {
                    sidePriceCheck = dataArray[api].data.item.filter(item=>{
                        if (item.item_name === sideCheck) {
                            return true
                        }
                        return false
                    })
                    if (sidePriceCheck.length !== 0) {
                        priceCheckArray.push(...sidePriceCheck);
                    } 
                }

                let sidePriceValue;
                let priceResult
                let onePrice
                let sideCountType
                if (priceCheckArray.length === 0) {
                    sidePriceValue = 0;
                    sidesPriceFinalArray.push(0);
                } else if (priceCheckArray.length > 0) {
                    let sidesPrice = [];
                    for (let a = 0; a < priceCheckArray.length; a++) {
                        sidePriceValue = priceCheckArray[a].dpr1.replace(/,/,"")
                        if (priceCheckArray[a].dpr1 === "-") {
                            sidePriceValue = priceCheckArray[a].dpr2.replace(/,/,"")
                            if (priceCheckArray[a].dpr2 === "-") {
                                sidePriceValue = priceCheckArray[a].dpr3.replace(/,/,"")
                                if (priceCheckArray[a].dpr3 === "-") {
                                    sidePriceValue = priceCheckArray[a].dpr6.replace(/,/,"")
                                    if (priceCheckArray[a].dpr6 === "-") {
                                        sidePriceValue = 0;
                                    }
                                }
                            }
                        }
                        sidesPrice.push(sidePriceValue)
                    }
                    const resulting = Math.min.apply(null, sidesPrice);

                    sideCountType = priceCheckArray[0].unit;
                    const me_W = sides[0].main_ingredient_weight;
                    const number_regex = sideCountType.replace(/[^0-9]/g, "");
                    const type_regex = sideCountType.replace(/[0-9]/g, "");

                    if (type_regex === 'kg') {
                        priceResult = Number(me_W) / (1000 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    } else if (type_regex === 'g') {
                        priceResult = Number(me_W) / (1 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    } else if (type_regex === '마리') {
                        priceResult = Number(me_W) / (3 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    } else if (type_regex === '개') {
                        priceResult = Number(me_W) / (2 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    } else if (type_regex === '포기') {
                        priceResult = Number(me_W) / (1 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    } else if (type_regex === '리터') {
                        priceResult = Number(me_W) / (1000 * Number(number_regex));
                        onePrice = Number(resulting) * priceResult;
                    }
                    sidesPriceFinalArray.push(onePrice);
                }
                if (sides[0].ingredient.length > 0) {
                    const subMainLength = sides[0].ingredient.length;
                    const subSideCheck = sides[0].main_ingredient;
                    let subGatherArray = [];

                    const subAddArray = [];
                    for (let i = 0; i < subMainLength; i++) {
                        for (let api = 0; api < 6; api++) {
                            let subSidePriceCheck = dataArray[api].data.item.filter(item=>{
                                if (item.item_name === subSideCheck) {
                                    return true
                                }
                                return false
                            })
                            if (subSidePriceCheck.length !== 0) {
                                subGatherArray.push(...subSidePriceCheck);
                            }
                        }

                        if (subMainLength === 1) {
                            subPriceCheckArray.push(subGatherArray);
                        } else if (subMainLength > 1) {
                            if (i < subMainLength - 1) {
                                subAddArray.push(...subGatherArray)
                            } else if (i === subMainLength - 1) {
                                subAddArray.push(...subGatherArray)
                                subPriceCheckArray.push(subAddArray);
                            }
                        }
                    }

                    let sideSubPriceValue;
                    if (subPriceCheckArray.length === 0) {
                        subSidesPriceFinalArray.push([0]);
                    } else if (subPriceCheckArray.length > 0) {
                        let subSidesPrice = []
                        for (let a = 0; a < subPriceCheckArray.length; a++) {
                            for (let b = 0; b < subPriceCheckArray[a].length; b++) {

                                sideSubPriceValue = subPriceCheckArray[a][b].dpr1.replace(/,/,"")
                                if (subPriceCheckArray[a][b].dpr1 === "-") {
                                    sideSubPriceValue = subPriceCheckArray[a][b].dpr2.replace(/,/,"")
                                    if (subPriceCheckArray[a][b].dpr2 === "-") {
                                        sideSubPriceValue = subPriceCheckArray[a][b].dpr3.replace(/,/,"")
                                        if (subPriceCheckArray[a][b].dpr3 === "-") {
                                            sideSubPriceValue = subPriceCheckArray[a][b].dpr6.replace(/,/,"")
                                            if (subPriceCheckArray[a][b].dpr6 === "-") {
                                                sideSubPriceValue = 0;
                                            }
                                        }
                                    }
                                }
                                subSidesPrice.push(sideSubPriceValue)
                            }
                            const subResulting = Math.min.apply(null, subSidesPrice);

                            let subOnePrice
                            if (subPriceCheckArray[a].length === 0) {
                                subOnePrice = 0;
                                subSidesPriceArray.push(subOnePrice);
                            } else if (subPriceCheckArray[a].length > 0) {
                                const subSideCountType = subPriceCheckArray[a][0].unit;
                                const in_W = sides[0].ingredient_weight[a];
                                const number_regex = subSideCountType.replace(/[^0-9]/g, "");
                                const type_regex = subSideCountType.replace(/[0-9]/g, "");
                                if (type_regex === 'kg') {
                                    priceResult = Number(in_W) / (1000 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                } else if (type_regex === 'g') {
                                    priceResult = Number(in_W) / (1 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                } else if (type_regex === '마리') {
                                    priceResult = Number(in_W) / (3 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                } else if (type_regex === '개') {
                                    priceResult = Number(in_W) / (2 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                } else if (type_regex === '포기') {
                                    priceResult = Number(in_W) / (1 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                } else if (type_regex === '리터') {
                                    priceResult = Number(in_W) / (1000 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * priceResult;
                                }
                                subSidesPriceArray.push(subOnePrice);
                            }
                        }
                        const subReduce = subSidesPriceArray.reduce((a,b) => (a+b));
                        subSidesPriceFinalArray.push(subReduce);                      
                    }
                } else if (sides[0].ingredient.length === 0) {
                    subSidesPriceFinalArray.push(0);
                }

                let finalPriceResult
                if (subSidesPriceFinalArray[n] >= 1) {
                    finalPriceResult = sidesPriceFinalArray[n] + subSidesPriceFinalArray[n];
                } else if (subSidesPriceFinalArray[n] === 0) {
                    finalPriceResult = sidesPriceFinalArray[n]
                };
                if (finalPriceResult <= submain) {
                    finalArray.push(finalPriceResult);
                } else if (finalPriceResult > submain) {
                    i--;
                    break reStart;
                }

                const check = mainFindArray.find(e => {
                    if (e.main_ingredient === sides[0].main_ingredient) {
                        return true;
                    } else {
                        if (n == 2 || n == 5 || n == 8) {
                            for (let i = 0; i < 2; i++) {
                                const typeCheck2 = checkCycle[i].cook_type === sides[0].cook_type;
                                if (typeCheck2) {
                                    return true;
                                }
                            }
                        } else if (n == 1 || n == 4 || n == 7) {
                            const typeCheck = checkCycle[0].cook_type === sides[0].cook_type;
                                if (typeCheck) {
                                    return true;
                                }
                        }
                        return false;
                    }   
                });
                if (check) {
                    //n--;  n ==> 메뉴 하나 다시뽑기
                    i--;  // i ==> 새로 다시 돌리기
                    break reStart;
                } else if (!check) {
                    if (checkCycle.length === 3 && n !== 8) {
                        sideArray.push(...checkCycle);
                        mainFindArray.push(...sides);
                        checkCycle.length = 0;
                        checkCycle.push(...sides);
                    } else if (checkCycle.length < 3) {
                        checkCycle.push(...sides);
                        mainFindArray.push(...sides);
                    }
                }
                    if (n == 8) {
                        sideArray.push(...checkCycle);
                        ctx.body.sides.push(sideArray);
                        ctx.body.price.push(finalArray);
                    }
                }
        } catch (e) {
            ctx.throw(500, e);
        };
    }
    console.log("side 끝");
};

export const soupList = async ctx => {
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const dataArray = [data100, data200, data300, data400, data500, data600]
    const { soup } = ctx.request.body.percentObject;
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    ctx.body = ({
        soups: [],
        price: [],
    })
    for (let i = 0; i < request; i++) {
        const filterArray = [];
        let finalArray = [];

        try {
            reStart: for (let y = 0; y < 3; y++) {
                let control = true;
                let soupPriceFinalArray = [];
                let subSoupPriceFinalArray = [];
                let priceCheckArray = [];
                let subPriceCheckArray = [];
                let subSoupPriceArray = [];
                const soupsdata = await Menu.aggregate([
                    {$match: { cook_type: '국', main_ingredient: { $nin: outList }, ingredient: { $nin: allOutList } }},
                    {$sample: { size: 1 }}
                ]);
                let dayLength;
                if (filterArray.length === 0) {
                    filterArray.push(...soupsdata)
                    dayLength = filterArray.length;
                } else if (filterArray.length > 0) {
                    dayLength = filterArray.length 
                    let check_menu;
                    stop_for: for (let t = 0; t < dayLength; t++) {
                        check_menu = filterArray[t].menuname === soupsdata[0].menuname;
                        if (check_menu === true) {
                            control = false;
                            y--;
                            break stop_for;
                        } else if (check_menu !== true && t === dayLength -1) {
                            filterArray.push(...soupsdata)
                        }
                    }
                }
                if (control === true) {

                    const soupCheck = soupsdata[0].main_ingredient
                    let soupPriceCheck;
                    
                    for (let api = 0; api < 6; api++) {
                        soupPriceCheck = dataArray[api].data.item.filter(item=>{
                            if (item.item_name === soupCheck) {
                                return true
                            }
                            return false
                        })
                    }
                    priceCheckArray.push(...soupPriceCheck);
                        
                    let sopePriceValue;
                    if (priceCheckArray.length === 0) {
                        sopePriceValue = 0;
                        soupPriceFinalArray.push(0);
                    } else if (priceCheckArray.length > 0) {
                        let soupPrice = [];
                        for (let a = 0; a < priceCheckArray.length; a++) {
                            sopePriceValue = priceCheckArray[a].dpr1.replace(/,/,"")
                            if (priceCheckArray[a].dpr1 === "-") {
                                sopePriceValue = priceCheckArray[a].dpr2.replace(/,/,"")
                                if (priceCheckArray[a].dpr2 === "-") {
                                    sopePriceValue = priceCheckArray[a].dpr3.replace(/,/,"")
                                    if (priceCheckArray[a].dpr3 === "-") {
                                        sopePriceValue = priceCheckArray[a].dpr6.replace(/,/,"")
                                        if (priceCheckArray[a].dpr6 === "-") {
                                            sopePriceValue = 0;
                                        }
                                    }
                                }
                            }
                            soupPrice.push(sopePriceValue)
                        }
                        let priceResult
                        let onePrice
                        const resulting = Math.min.apply(null, soupPrice);
                        const soupCountType = priceCheckArray[0].unit;
                        const me_W = soupsdata[0].main_ingredient_weight;
                        const number_regex = soupCountType.replace(/[^0-9]/g, "");
                        const type_regex = soupCountType.replace(/[0-9]/g, "");
    
                        if (type_regex === 'kg') {
                            priceResult = Number(me_W) / (1000 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        } else if (type_regex === 'g') {
                            priceResult = Number(me_W) / (1 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        } else if (type_regex === '마리') {
                            priceResult = Number(me_W) / (3 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        } else if (type_regex === '개') {
                            priceResult = Number(me_W) / (2 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        } else if (type_regex === '포기') {
                            priceResult = Number(me_W) / (1 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        } else if (type_regex === '리터') {
                            priceResult = Number(me_W) / (1000 * Number(number_regex));
                            onePrice = Number(resulting) * priceResult;
                        }
                        soupPriceFinalArray.push(onePrice);
                    }
                    const subSoupLength = soupsdata[0].ingredient.length
                    if (subSoupLength > 0) {
                        for (let i = 0; i < subSoupLength; i++) {
                            const testArray = [];
                            const subSoupLength = soupsdata[0].ingredient[i]
                            for (let api = 0; api < 6; api++) {
                                let subSidePriceCheck = dataArray[api].data.item.filter(item=>{
                                    if (item.item_name === subSoupLength) {
                                        return true
                                    }
                                    return false
                                })
                                if (subSidePriceCheck.length !== 0) {
                                    testArray.push(...subSidePriceCheck);
                                }
                            }
                            if (testArray.length > 0) {
                                subPriceCheckArray.push(testArray);
                            } else if (testArray.length === 0) {
                                subPriceCheckArray.push(...testArray);
                            }
                        }
    
    
                        let sideSubPriceValue;
                        if (subPriceCheckArray.length === 0) {
                            sideSubPriceValue = 0;
                            subSoupPriceFinalArray.push(0);
                        } else if (subPriceCheckArray.length > 0) {
                            let subSidesPrice = [];
                            for (let a = 0; a < subPriceCheckArray.length; a++) {
                                for (let b = 0; b < subPriceCheckArray[a].length; b++) {
                                    sideSubPriceValue = subPriceCheckArray[a][b].dpr1.replace(/,/,"")
                                    if (subPriceCheckArray[a][b].dpr1 === "-") {
                                        sideSubPriceValue = subPriceCheckArray[a][b].dpr2.replace(/,/,"")
                                        if (subPriceCheckArray[a][b].dpr2 === "-") {
                                            sideSubPriceValue = subPriceCheckArray[a][b].dpr3.replace(/,/,"")
                                            if (subPriceCheckArray[a][b].dpr3 === "-") {
                                                sideSubPriceValue = subPriceCheckArray[a][b].dpr6.replace(/,/,"")
                                                if (subPriceCheckArray[a][b].dpr6 === "-") {
                                                    sideSubPriceValue = 0;
                                                }
                                            }
                                        }
                                    }
                                    subSidesPrice.push(sideSubPriceValue)
                                }
                                const subResulting = Math.min.apply(null, subSidesPrice);
                                
                                let subPriceResult
                                let subOnePrice
                                const subSideCountType = subPriceCheckArray[a][0].unit;
                                const in_W = soupsdata[0].ingredient_weight[a];
                                const number_regex = subSideCountType.replace(/[^0-9]/g, "");
                                const type_regex = subSideCountType.replace(/[0-9]/g, "");
    
                                if (type_regex === 'kg') {
                                    subPriceResult = Number(in_W) / (1000 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                } else if (type_regex === 'g') {
                                    subPriceResult = Number(in_W) / (1 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                } else if (type_regex === '마리') {
                                    subPriceResult = Number(in_W) / (3 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                } else if (type_regex === '개') {
                                    subPriceResult = Number(in_W) / (2 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                } else if (type_regex === '포기') {
                                    subPriceResult = Number(in_W) / (1 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                } else if (type_regex === '리터') {
                                    subPriceResult = Number(in_W) / (1000 * Number(number_regex));
                                    subOnePrice = Number(subResulting) * subPriceResult;
                                }
                                subSoupPriceArray.push(subOnePrice);
                            }
                            const subReduce = subSoupPriceArray.reduce((a,b) => (a+b));
                            subSoupPriceFinalArray.push(subReduce); 
                        }
                    } else if (subSoupLength === 0) {
                        subSoupPriceFinalArray.push(0);
                    }
    
                    let finalPriceResult
                    if (subSoupPriceFinalArray[0] >= 1) {
                        finalPriceResult = soupPriceFinalArray[0] + subSoupPriceFinalArray[0];
                    } else if (subSoupPriceFinalArray[0] !== true) {
                        finalPriceResult = soupPriceFinalArray[0]
                    };
                    if (finalPriceResult <= soup) {
                        finalArray.push(finalPriceResult);
                    } else if (finalPriceResult > soup) {
                        i--;
                        break reStart;
                    }
    
    
    
                    if (y === 2) {
                        ctx.body.soups.push(filterArray)
                        ctx.body.price.push(finalArray)
                    }
                }


            }
        } catch (e) {
            ctx.throw(500, e);
        }
    }
    console.log("soup 끝");
};