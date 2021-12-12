import Menu from "../../models/menu";

export const riceList = async ctx => {
    const request = parseInt(ctx.request.body.number);
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const { rice } = ctx.request.body.percentObject;
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
                                const ingredientLength = priceResponseArray[bodyLength][b].ingredient.length;
                                const mainPriceCheck = data100.data.item.filter(item=>{
                                    if (item.item_name === mainCheck) {
                                        return true
                                    }
                                    return false
                                })
                                priceArray.push(mainPriceCheck);


                                for (let h = 0; h < ingredientLength; h++) {
                                    
                                    const subMainCheck = priceResponseArray[bodyLength][b].ingredient[h];

                                    const subMainPriceCheck1 = data100.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    const subMainPriceCheck2 = data200.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    const subMainPriceCheck3 = data300.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    const subMainPriceCheck4 = data400.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    const subMainPriceCheck5 = data500.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        }
                                        return false
                                    })
                                    const subMainPriceCheck6 = data600.data.item.filter(item=>{
                                        if (item.item_name === subMainCheck) {
                                            return true
                                        };
                                        return false
                                    })
                                    if (subMainPriceCheck1 !== []) {
                                        subGatherArray.push(...subMainPriceCheck1);
                                    };
                                    if (subMainPriceCheck2 !== []) {
                                        subGatherArray.push(...subMainPriceCheck2);
                                    };
                                    if (subMainPriceCheck3 !== []) {
                                        subGatherArray.push(...subMainPriceCheck3);
                                    };
                                    if (subMainPriceCheck4 !== []) {
                                        subGatherArray.push(...subMainPriceCheck4);
                                    };
                                    if (subMainPriceCheck5 !== []) {
                                        subGatherArray.push(...subMainPriceCheck5);
                                    };
                                    if (subMainPriceCheck6 !== []) {
                                        subGatherArray.push(...subMainPriceCheck6);
                                    };
                                    subPriceArray.push(subGatherArray);
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
                        const subMainPriceCheck1 = data100.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            }
                            return false
                        })
                        const subMainPriceCheck2 = data200.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            }
                            return false
                        })
                        const subMainPriceCheck3 = data300.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            }
                            return false
                        })
                        const subMainPriceCheck4 = data400.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            }
                            return false
                        })
                        const subMainPriceCheck5 = data500.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            }
                            return false
                        })
                        const subMainPriceCheck6 = data600.data.item.filter(item=>{
                            if (item.item_name === subMainCheck) {
                                return true
                            };
                            return false
                        })

                        if (subMainPriceCheck1 !== []) {
                            subGatherArray.push(...subMainPriceCheck1);
                        };
                        if (subMainPriceCheck2 !== []) {
                            subGatherArray.push(...subMainPriceCheck2);
                        };
                        if (subMainPriceCheck3 !== []) {
                            subGatherArray.push(...subMainPriceCheck3);
                        };
                        if (subMainPriceCheck4 !== []) {
                            subGatherArray.push(...subMainPriceCheck4);
                        };
                        if (subMainPriceCheck5 !== []) {
                            subGatherArray.push(...subMainPriceCheck5);
                        };
                        if (subMainPriceCheck6 !== []) {
                            subGatherArray.push(...subMainPriceCheck6);
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
                console.log("부재료 최종 추출 == > ",subPriceArray)
                priceBreak: for (let c = 0; c < 3; c++) {
                    console.log(`${c}번째 같은 종류 수 == > `, subPriceArray[c].length)
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
    console.log(ctx.body);
    console.log("rice 끝");
};


export const mainList = async ctx => {
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const { main } = ctx.request.body.percentObject;
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    const mainData = []; // 일일 메뉴 list
    const list = []; // 이때까지 나왔던 메뉴 list
    //let priceMainResponseArray = [];
    // let mainPriceArray = [];
    let subPriceArray = [];
    //let mainsPrice = [];
    ctx.body = ({
        mains: [],
        price: [],
    })
    for (let e = 0; e < request; e++) {
        let priceMainResponseArray = [];
        let finalMainPrice = [];
        try {
            const i = 0;
            while (i < 1) {
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
                        let mainPriceArray = [];

                        for (let b = 0; b < 6; b++) {
                            const gatherArray = [];
                            const subGatherArray = [];
                            const bodyLength = priceMainResponseArray.length - 1;
                            const mainCheck = priceMainResponseArray[bodyLength][b].main_ingredient;
                            const subMainCheck = priceMainResponseArray[bodyLength][b].ingredient;
                            const mainPriceCheck1 = data100.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            const mainPriceCheck2 = data200.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            const mainPriceCheck3 = data300.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            const mainPriceCheck4 = data400.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            const mainPriceCheck5 = data500.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            const mainPriceCheck6 = data600.data.item.filter(item=>{
                                if (item.item_name === mainCheck) {
                                    return true
                                }
                                return false
                            })
                            if (mainPriceCheck1 !== []) {
                                gatherArray.push(...mainPriceCheck1);
                            };
                            if (mainPriceCheck2 !== []) {
                                gatherArray.push(...mainPriceCheck2);
                            };
                            if (mainPriceCheck3 !== []) {
                                gatherArray.push(...mainPriceCheck3);
                            };
                            if (mainPriceCheck4 !== []) {
                                gatherArray.push(...mainPriceCheck4);
                            };
                            if (mainPriceCheck5 !== []) {
                                gatherArray.push(...mainPriceCheck5);
                            };
                            if (mainPriceCheck6 !== []) {
                                gatherArray.push(...mainPriceCheck6);
                            };
                            mainPriceArray.push(gatherArray);
        
                            const subMainPriceCheck1 = data100.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                            const subMainPriceCheck2 = data200.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                            const subMainPriceCheck3 = data300.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                            const subMainPriceCheck4 = data400.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                            const subMainPriceCheck5 = data500.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                }
                                return false
                            })
                            const subMainPriceCheck6 = data600.data.item.filter(item=>{
                                if (item.item_name === subMainCheck) {
                                    return true
                                };
                                return false
                            })
                            if (subMainPriceCheck1 !== []) {
                                subGatherArray.push(...subMainPriceCheck1);
                            };
                            if (subMainPriceCheck2 !== []) {
                                subGatherArray.push(...subMainPriceCheck2);
                            };
                            if (subMainPriceCheck3 !== []) {
                                subGatherArray.push(...subMainPriceCheck3);
                            };
                            if (subMainPriceCheck4 !== []) {
                                subGatherArray.push(...subMainPriceCheck4);
                            };
                            if (subMainPriceCheck5 !== []) {
                                subGatherArray.push(...subMainPriceCheck5);
                            };
                            if (subMainPriceCheck6 !== []) {
                                subGatherArray.push(...subMainPriceCheck6);
                            };
                            subPriceArray.push(subGatherArray);
                        };
                        priceBreak: for (let c = 0; c < 6; c++) {
                            let mainsPrice = [];
                            const dozenPriceValue = mainPriceArray[c].length;
                            if (c === 5) {
                                if (dozenPriceValue === 0) {
                                    mainsPrice.push(0)
                                    finalMainPrice.push(mainsPrice)
                                    ctx.body.price.push(finalMainPrice)
                                    ctx.body.mains.push(mainSlice)
                                }
                            } else if (dozenPriceValue === 0) {
                                mainsPrice.push(0)
                                finalMainPrice.push(mainsPrice)
                            }
                            for (let d = 0; d < dozenPriceValue; d++) {
                                let priceValue = mainPriceArray[c][d].dpr1.replace(/,/,"") // 당일 가격
                                if (priceValue === undefined) {
                                    return "0";
                                }
                                try {
                                    if (priceValue === "-") {
                                        priceValue = mainPriceArray[c][d].dpr2.replace(/,/,"") // 1일전 가격
                                        if (priceValue === "-") {
                                            priceValue = mainPriceArray[c][d].dpr3.replace(/,/,"") // 1주일전 가격
                                            if (priceValue === "-") {
                                                priceValue = mainPriceArray[c][d].dpr5.replace(/,/,"") // 1개월전 가격
                                                if (priceValue === "-") {
                                                    priceValue = mainPriceArray[c][d].dpr6.replace(/,/,"") // 1년전 가격
                                                }
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.log("메뉴를 찾을 수 없습니다.")
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
                                    if (subMainCountType.includes('kg')) {
                                        subPriceResult = 90 / 1000;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('g')) {
                                        subPriceResult = 90 / 1000;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('장')) {
                                        subPriceResult = 1 / 2;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('마리')) {
                                        subPriceResult = 1 / 4;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('2마리')) {
                                        subPriceResult = 1 / 8;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('5마리')) {
                                        subPriceResult = 1 / 20;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('개')) {
                                        subPriceResult = 1 / 2;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    } else if (subMainCountType.includes('리터')) {
                                        subPriceResult = 90 / 1000;
                                        subOnePrice = Number(subPriceValue) * subPriceResult;
                                    }
                                } catch (e) {
                                    console.log("서브재료의 가격이 없습니다.")
                                }

                                const mainCountType = mainPriceArray[c][d].unit;
                                if (mainCountType.includes('kg')) {
                                    priceResult = 90 / 1000;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('g')) {
                                    priceResult = 90 / 1000;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('장')) {
                                    priceResult = 1 / 2;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('마리')) {
                                    priceResult = 1 / 4;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('2마리')) {
                                    priceResult = 1 / 8;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('5마리')) {
                                    priceResult = 1 / 20;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('개')) {
                                    priceResult = 1 / 2;
                                    onePrice = Number(priceValue) * priceResult;
                                } else if (mainCountType.includes('리터')) {
                                    priceResult = 90 / 1000;
                                    onePrice = Number(priceValue) * priceResult;
                                }
        
                                let finalPriceResult
                                if (subOnePrice >= 1) {
                                    finalPriceResult = onePrice + subOnePrice;
                                } else if (subOnePrice !== true) {
                                    finalPriceResult = onePrice
                                };

                                if (finalPriceResult <= main && dozenPriceValue - 1 === d) {
                                    mainsPrice.push(finalPriceResult)
                                    finalMainPrice.push(mainsPrice)
                                } else if (finalPriceResult <= main) {
                                    mainsPrice.push(finalPriceResult)
                                } else if (finalPriceResult === undefined && dozenPriceValue - 1 > d) {
                                    mainsPrice.push(0)
                                } else if (finalPriceResult === undefined && dozenPriceValue - 1 === d) {
                                    mainsPrice.push(0)
                                    finalMainPrice.push(mainsPrice)
                                } else if (finalPriceResult > main) {
                                    e--;
                                    break priceBreak;
                                }

                                if (finalPriceResult <= main && dozenPriceValue - 1 === d && c === 5) {
                                    ctx.body.price.push(finalMainPrice)
                                    ctx.body.mains.push(mainSlice)
                                } else if (finalPriceResult === undefined && dozenPriceValue - 1 === d && c === 5) {
                                    ctx.body.price.push(finalMainPrice)
                                    ctx.body.mains.push(mainSlice)
                                }
                            }
                        }
                        break;
                    }
                }
            }
            mainData.splice(0, mainData.length);
        } catch (e) {
            ctx.throw(500, e);
        };
    }
    console.log("main 끝");
};

export const sideList = async ctx => {
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
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
                let sidesPriceArray = [];
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

                const price100Check = data100.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price200Check = data200.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price300Check = data300.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price400Check = data400.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price500Check = data500.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price600Check = data600.data.item.filter((item) => {
                    if (item.item_name === sides[0].main_ingredient) {
                        return true
                    }
                    return false
                })

                if (price100Check !== []) {
                    priceCheckArray.push(...price100Check);
                };
                if (price200Check !== []) {
                    priceCheckArray.push(...price200Check);
                };
                if (price300Check !== []) {
                    priceCheckArray.push(...price300Check);
                };
                if (price400Check !== []) {
                    priceCheckArray.push(...price400Check);
                };
                if (price500Check !== []) {
                    priceCheckArray.push(...price500Check);
                };
                if (price600Check !== []) {
                    priceCheckArray.push(...price600Check);
                };
                
                let sidePriceValue;
                if (priceCheckArray.length === 0) {
                    //console.log("메뉴 정보 없음")
                    sidePriceValue = 0;
                    sidesPriceArray.push(0);
                    sidesPriceFinalArray.push(sidesPriceArray);
                } else if (priceCheckArray.length > 0) {
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
                        let priceResult
                        let onePrice
                        const sideCountType = priceCheckArray[a].unit;
                            if (sideCountType.includes('kg')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('g')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('장')) {
                                priceResult = 1 / 2;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('마리')) {
                                priceResult = 1 / 4;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('2마리')) {
                                priceResult = 1 / 8;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('5마리')) {
                                priceResult = 1 / 20;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('개')) {
                                priceResult = 1 / 2;
                                onePrice = Number(sidePriceValue) * priceResult;
                            } else if (sideCountType.includes('리터')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sidePriceValue) * priceResult;
                            }
                            sidesPriceArray.push(onePrice);
                    }
                    let lowPrice = sidesPriceArray.reduce((p, c) => p + c, 0) / sidesPriceArray.length;

                    if (lowPrice <= submain) {
                        //console.log("가격 안넘어감")
                        let array = [];
                        array.push(lowPrice)
                        sidesPriceFinalArray.push(array);
                    } else if (lowPrice > submain) {
                        //console.log("== 가격 넘어가서 재실행 ==")
                        i--;
                        break reStart;
                    }
                }
                if (sides[0].ingredient === true) {

                    const subPrice100Check = data100.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice200Check = data200.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice300Check = data300.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice400Check = data400.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice500Check = data500.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice600Check = data600.data.item.filter((item) => {
                        if (item.item_name === sides[0].ingredient) {
                            return true
                        }
                        return false
                    })
    
                    if (subPrice100Check !== []) {
                        subPriceCheckArray.push(...subPrice100Check);
                    };
                    if (subPrice200Check !== []) {
                        subPriceCheckArray.push(...subPrice200Check);
                    };
                    if (subPrice300Check !== []) {
                        subPriceCheckArray.push(...subPrice300Check);
                    };
                    if (subPrice400Check !== []) {
                        subPriceCheckArray.push(...subPrice400Check);
                    };
                    if (subPrice500Check !== []) {
                        subPriceCheckArray.push(...subPrice500Check);
                    };
                    if (subPrice600Check !== []) {
                        subPriceCheckArray.push(...subPrice600Check);
                    };

                    let sideSubPriceValue;
                    if (subPriceCheckArray.length === 0) {
                        //console.log("메뉴 정보 없음")
                        sideSubPriceValue = 0;
                        subSidesPriceArray.push(0);
                        subSidesPriceFinalArray.push(subSidesPriceArray);
                    } else if (subPriceCheckArray.length > 0) {
                        for (let a = 0; a < subPriceCheckArray.length; a++) {
                            sideSubPriceValue = subPriceCheckArray[a].dpr1.replace(/,/,"")
                            if (subPriceCheckArray[a].dpr1 === "-") {
                                sideSubPriceValue = subPriceCheckArray[a].dpr2.replace(/,/,"")
                                if (subPriceCheckArray[a].dpr2 === "-") {
                                    sideSubPriceValue = subPriceCheckArray[a].dpr3.replace(/,/,"")
                                    if (subPriceCheckArray[a].dpr3 === "-") {
                                        sideSubPriceValue = subPriceCheckArray[a].dpr6.replace(/,/,"")
                                        if (subPriceCheckArray[a].dpr6 === "-") {
                                            sideSubPriceValue = 0;
                                        }
                                    }
                                }
                            }
                            
                        let subPriceResult
                        let subOnePrice
                        const subSideCountType = subPriceCheckArray[a].unit;
                            if (subSideCountType.includes('kg')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('g')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('장')) {
                                subPriceResult = 1 / 2;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('마리')) {
                                subPriceResult = 1 / 4;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('2마리')) {
                                subPriceResult = 1 / 8;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('5마리')) {
                                subPriceResult = 1 / 20;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('개')) {
                                subPriceResult = 1 / 2;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('리터')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            }
                            subSidesPriceArray.push(subOnePrice);
                        }

                        let lowSubPrice = subSidesPriceArray.reduce((p, c) => p + c, 0) / subSidesPriceArray.length;

                        if (lowSubPrice <= submain) {
                            //console.log("서브_가격 안넘어감")
                            let array = [];
                            array.push(lowSubPrice)
                            subSidesPriceFinalArray.push(array);
                        } else if (lowSubPrice > submain) {
                            //console.log("== 서브_가격 넘어가서 재실행 ==")
                            i--;
                            break reStart;
                        }
                    }
                }

                let finalPriceResult
                if (subSidesPriceFinalArray[n] >= 1) {
                    finalPriceResult = sidesPriceFinalArray[n] + subSidesPriceFinalArray[n];
                } else if (subSidesPriceFinalArray[n] !== true) {
                    finalPriceResult = sidesPriceFinalArray[n]
                };

                if (finalPriceResult <= submain) {
                    //console.log("합친_가격 안넘어감")
                    finalArray.push(...finalPriceResult);

                } else if (finalPriceResult > submain) {
                    //console.log("== 합친_가격 넘어가서 재실행 ==")
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
    const { soup } = ctx.request.body.percentObject;
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    const soupsAraay = [];
    ctx.body = ({
        soups: [],
        price: [],
    })
    for (let i = 0; i < request; i++) {
        const filterAraay = [];
        let finalArray = [];
        let soupPriceFinalArray = [];
        let subSoupPriceFinalArray = [];
        try {
            reStart: for (let y = 0; y < 3; y++) {
                let priceCheckArray = [];
                let subPriceCheckArray = [];
                let soupPriceArray = [];
                let subSoupPriceArray = [];
                const soupsdata = await Menu.aggregate([
                    {$match: { cook_type: '국', main_ingredient: { $nin: outList }, ingredient: { $nin: allOutList } }},
                    {$sample: { size: 1 }}
                ]);


// price 코드 공사중 ....---------------------------------------------------------------------------------

                const price100Check = data100.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price200Check = data200.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price300Check = data300.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price400Check = data400.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price500Check = data500.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })
                const price600Check = data600.data.item.filter((item) => {
                    if (item.item_name === soupsdata[0].main_ingredient) {
                        return true
                    }
                    return false
                })

                if (price100Check !== []) {
                    priceCheckArray.push(...price100Check);
                };
                if (price200Check !== []) {
                    priceCheckArray.push(...price200Check);
                };
                if (price300Check !== []) {
                    priceCheckArray.push(...price300Check);
                };
                if (price400Check !== []) {
                    priceCheckArray.push(...price400Check);
                };
                if (price500Check !== []) {
                    priceCheckArray.push(...price500Check);
                };
                if (price600Check !== []) {
                    priceCheckArray.push(...price600Check);
                };

                let sopePriceValue;
                //console.log(priceCheckArray)
                if (priceCheckArray.length === 0) {
                    sopePriceValue = 0;
                    soupPriceArray.push(0);
                    soupPriceFinalArray.push(soupPriceArray);
                } else if (priceCheckArray.length > 0) {
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
                        let priceResult
                        let onePrice
                        const sideCountType = priceCheckArray[a].unit;
                            if (sideCountType.includes('kg')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('g')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('장')) {
                                priceResult = 1 / 2;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('마리')) {
                                priceResult = 1 / 4;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('2마리')) {
                                priceResult = 1 / 8;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('5마리')) {
                                priceResult = 1 / 20;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('개')) {
                                priceResult = 1 / 2;
                                onePrice = Number(sopePriceValue) * priceResult;
                            } else if (sideCountType.includes('리터')) {
                                priceResult = 90 / 1000;
                                onePrice = Number(sopePriceValue) * priceResult;
                            }
                            soupPriceArray.push(onePrice);
                    }
                    let lowPrice = soupPriceArray.reduce((p, c) => p + c, 0) / soupPriceArray.length;
                    //console.log("lowPrice ==> ",lowPrice)
                    if (lowPrice <= soup) {
                        //console.log("국_가격 안넘어감")
                        let array = [];
                        array.push(lowPrice)
                        soupPriceFinalArray.push(array);
                    } else if (lowPrice > soup) {
                        //console.log("== 국_가격 넘어가서 재실행 ==")
                        i--;
                        break reStart;
                    }
                }
                if (soupsdata[0].ingredient === true) {

                    const subPrice100Check = data100.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice200Check = data200.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice300Check = data300.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice400Check = data400.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice500Check = data500.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })
                    const subPrice600Check = data600.data.item.filter((item) => {
                        if (item.item_name === soupsdata[0].ingredient) {
                            return true
                        }
                        return false
                    })

                    if (subPrice100Check !== []) {
                        subPriceCheckArray.push(...subPrice100Check);
                    };
                    if (subPrice200Check !== []) {
                        subPriceCheckArray.push(...subPrice200Check);
                    };
                    if (subPrice300Check !== []) {
                        subPriceCheckArray.push(...subPrice300Check);
                    };
                    if (subPrice400Check !== []) {
                        subPriceCheckArray.push(...subPrice400Check);
                    };
                    if (subPrice500Check !== []) {
                        subPriceCheckArray.push(...subPrice500Check);
                    };
                    if (subPrice600Check !== []) {
                        subPriceCheckArray.push(...subPrice600Check);
                    };

                    let sideSubPriceValue;
                    if (subPriceCheckArray.length === 0) {
                        //console.log("메뉴 정보 없음")
                        sideSubPriceValue = 0;
                        subSoupPriceArray.push(0);
                        subSoupPriceFinalArray.push(subSoupPriceArray);
                    } else if (subPriceCheckArray.length > 0) {
                        for (let a = 0; a < subPriceCheckArray.length; a++) {
                            sideSubPriceValue = subPriceCheckArray[a].dpr1.replace(/,/,"")
                            if (subPriceCheckArray[a].dpr1 === "-") {
                                sideSubPriceValue = subPriceCheckArray[a].dpr2.replace(/,/,"")
                                if (subPriceCheckArray[a].dpr2 === "-") {
                                    sideSubPriceValue = subPriceCheckArray[a].dpr3.replace(/,/,"")
                                    if (subPriceCheckArray[a].dpr3 === "-") {
                                        sideSubPriceValue = subPriceCheckArray[a].dpr6.replace(/,/,"")
                                        if (subPriceCheckArray[a].dpr6 === "-") {
                                            sideSubPriceValue = 0;
                                        }
                                    }
                                }
                            }
                            
                        let subPriceResult
                        let subOnePrice
                        const subSideCountType = subPriceCheckArray[a].unit;
                            if (subSideCountType.includes('kg')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('g')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('장')) {
                                subPriceResult = 1 / 2;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('마리')) {
                                subPriceResult = 1 / 4;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('2마리')) {
                                subPriceResult = 1 / 8;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('5마리')) {
                                subPriceResult = 1 / 20;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('개')) {
                                subPriceResult = 1 / 2;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            } else if (subSideCountType.includes('리터')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(sideSubPriceValue) * subPriceResult;
                            }
                            subSoupPriceArray.push(subOnePrice);
                        }

                        let lowSubPrice = subSoupPriceArray.reduce((p, c) => p + c, 0) / subSoupPriceArray.length;

                        if (lowSubPrice <= soup) {
                            //console.log("국_서브_가격 안넘어감")
                            let array = [];
                            array.push(lowSubPrice)
                            subSoupPriceFinalArray.push(array);
                        } else if (lowSubPrice > soup) {
                            //console.log("== 국_서브_가격 넘어가서 재실행 ==")
                            i--;
                            break reStart;
                        }
                    }
                }

                let finalPriceResult
                if (subSoupPriceFinalArray[y] >= 1) {
                    finalPriceResult = soupPriceFinalArray[y] + subSoupPriceFinalArray[y];
                } else if (subSoupPriceFinalArray[y] !== true) {
                    finalPriceResult = soupPriceFinalArray[y]
                };

                if (finalPriceResult <= soup) {
                    //console.log("합친_가격 안넘어감")
                    finalArray.push(...finalPriceResult);

                } else if (finalPriceResult > soup) {
                    //console.log("== 합친_가격 넘어가서 재실행 ==")
                    i--;
                    break reStart;
                }


// price 코드 공사중 ....---------------------------------------------------------------------------------


                if (filterAraay.length == 0) {
                    filterAraay.push(...soupsdata);
                } else if (filterAraay.length > 0) {
                    const arrayNum = filterAraay.length;
                    for (let o = 0; o < arrayNum; o++) {
                        const checkingre = filterAraay[o].main_ingredient === soupsdata[0].main_ingredient;
                        if (checkingre) {
                            y--;
                        } else if (!checkingre && y === 1) {
                            filterAraay.push(...soupsdata);
                        } else if (!checkingre && y === 2 && o === 1) {
                            filterAraay.push(...soupsdata);
                        }
                    }
                }
            }
            if (filterAraay.length === 0) {
                console.log("1일 중복 메뉴 검증 넘어감")

            } else if (filterAraay.length !== 0) {

                const soups = filterAraay;
                if (soupsAraay.length == 3) {
                    check1: for (let n = 0; n < 3; n++) {
                        const nameCheck = soups[n].menuname;
                        for (let u = 0; u < 3; u ++) {
                            const nameCheck2 = soupsAraay[u].menuname;
                            const final = nameCheck === nameCheck2;
                            if (final) {
                                i--;
                                break check1;
                            } else if (n == 2 && u == 2 && !final) {
                                ctx.body.sides.push(soups);
                                ctx.body.price.push(finalArray);
                            }
                        }
                        if (n == 2) {
                            soupsAraay.length = 0;
                        }
                    }
                } else if (soupsAraay.length == 0) {
                    soupsAraay.push(...soups);
                    ctx.body.soups.push(soups);
                    ctx.body.price.push(finalArray);
                }
            }
        } catch (e) {
            ctx.throw(500, e);
        }
    }
    console.log("soup 끝");
};