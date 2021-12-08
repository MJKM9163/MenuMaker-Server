import Menu from "../../models/menu";

export const riceList = async ctx => {
    const request = parseInt(ctx.request.body.number);
    const { data100, data200, data300, data400, data500, data600 } = ctx.request.body;
    const { rice } = ctx.request.body.percentObject;
    console.log(ctx.request.body.percentObject)
    console.log(data100.data.item[0])
    const ricesArray = [];
    const priceResponseArray = [];
    const priceArray = [];
    const subPriceArray = [];
    ctx.body = ({
        rices: [],
        price: [],
    })

    for (let i = 0; i < request; i++) {
        const mainCostArray = [];
        const subCostArray = [];
        const ricesPrice = [];
        try {
            const rices = await Menu.aggregate([
                {$match: { category: '밥' }},
                {$sample: { size: 3 }}
            ]);
            for (let min = 0; min < 3; min++) {
                mainCostArray.push(rices[min].main_ingredient)
                subCostArray.push(rices[min].ingredient)
            }
            console.log(mainCostArray)
            console.log(subCostArray)

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
                            ctx.body.push(rices);
                        }
                    }
                    if (n == 2) {
                        ricesArray.length = 0;
                    }
                }
            } else if (ricesArray.length == 0) {
                ricesArray.push(...rices);
                priceResponseArray.push(rices)

                for (let b = 0; b < 3; b++) {
                    const subGatherArray = [];
                    const bodyLength = priceResponseArray.length - 1;
                    const mainCheck = priceResponseArray[bodyLength][b].main_ingredient;
                    const subMainCheck = priceResponseArray[bodyLength][b].ingredient;
                    const mainPriceCheck = data100.data.item.filter(item=>{
                        if (item.item_name === mainCheck) {
                            return true
                        }
                        return false
                    })
                    priceArray.push(mainPriceCheck);

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
                            if (subMainCountType.includes('kg')) {
                                subPriceResult = 90 / 1000;
                                subOnePrice = Number(subPriceValue) * subPriceResult;
                            } else if (subMainCountType.includes('마리')) {
                                subPriceResult = 1 / 4;
                                subOnePrice = Number(subPriceValue) * subPriceResult;
                            } else if (subMainCountType.includes('개')) {
                                subPriceResult = 1 / 2;
                                subOnePrice = Number(subPriceValue) * subPriceResult;
                            }
                        } catch (e) {
                            console.log("서브재료의 가격이 없습니다.")
                        }
                        const mainCountType = priceArray[c][d].unit;
                        if (mainCountType.includes('kg')) {
                            priceResult = 90 / 1000;
                            onePrice = Number(priceValue) * priceResult;
                        } else if (mainCountType.includes('마리')) {
                            priceResult = 1 / 4;
                            onePrice = Number(priceValue) * priceResult;
                        } else if (mainCountType.includes('개')) {
                            priceResult = 1 / 2;
                            onePrice = Number(priceValue) * priceResult;
                        }

                        let finalPriceResult
                        console.log(subOnePrice)
                        if (subOnePrice >= 1) {
                            console.log("서브메뉴 true")
                            finalPriceResult = onePrice + subOnePrice;
                        } else if (subOnePrice !== true) {
                            console.log("서브메뉴 false")
                            finalPriceResult = onePrice
                        };
                        // console.log(onePrice)
                        // console.log(subOnePrice)
                        // console.log(finalPriceResult)

                        if (finalPriceResult <= rice && c === 2) {
                            ricesPrice.push(finalPriceResult)
                            ctx.body.rices.push(rices)
                            ctx.body.price.push(ricesPrice)
                            //console.log(ctx.body)
                        } else if (finalPriceResult <= rice) {
                            ricesPrice.push(finalPriceResult)
                        } else if (finalPriceResult === undefined) {
                            ricesPrice.push(0)
                        } else if (finalPriceResult > rice) {
                            console.log("가격이 넘어가서 재실행")
                            ricesArray.length = 0;
                            i--;
                            break priceBreak;
                        }
                    }
                }
                priceResponseArray.length = 0;
                priceArray.length = 0;
                subPriceArray.length = 0;
            };
        } catch (e) {
            ctx.throw(500, e);
        };
    };
    console.log("rice 끝");
};


export const mainList = async ctx => {
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    const mainData = []; // 일일 메뉴 list
    const list = []; // 이때까지 나왔던 메뉴 list
    ctx.body = [];
    for (let i = 0; i < request; i++) {
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
                        ctx.body.push(mainSlice);
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
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    ctx.body = [];
    for (let i = 0; i < request; i++) {
        const checkCycle = [];
        const sideArray = [];
        const mainFindArray = [];
        try {
            for (let n = 0; n < 9; n++) {
                const sides = await Menu.aggregate([
                    {$match: {
                        main: false,
                        main_ingredient: { $nin: outList },
                        ingredient: { $nin: allOutList },
                        category: { $nin: ["밥", "김치"]},
                        cook_type: { $nin: ["국", "찌개"]} }},
                    {$sample: { size: 1 }}
                ]);
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
                    n--;
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
                        ctx.body.push(sideArray);
                    }
                }
        } catch (e) {
            ctx.throw(500, e);
        };
    }
    console.log("side 끝");
};

export const soupList = async ctx => {
    const request = parseInt(ctx.request.body.number);
    const outList = ctx.request.body.outList;
    const allOutList = ctx.request.body.allOutList;
    const soupsAraay = [];
    ctx.body = [];
    for (let i = 0; i < request; i++) {
        const filterAraay = [];
        try {
            for (let y = 0; y < 3; y++) {
                const soupsdata = await Menu.aggregate([
                    {$match: { cook_type: '국', main_ingredient: { $nin: outList }, ingredient: { $nin: allOutList } }},
                    {$sample: { size: 1 }}
                ]);
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
                            ctx.body.push(soups);
                        }
                    }
                    if (n == 2) {
                        soupsAraay.length = 0;
                    }
                }
            } else if (soupsAraay.length == 0) {
                soupsAraay.push(...soups);
                ctx.body.push(soups)
            }
        } catch (e) {
            ctx.throw(500, e);
        }
    }
    console.log("soup 끝");
};