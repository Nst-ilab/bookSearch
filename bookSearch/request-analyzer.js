"use strict"

/**
 * eventから調べるべき文字列を探す関数
 * @param {object} event lambdaから渡されたeventオブジェクト
 * @param {object} callbacks この関数に引き渡すcallback関数群
 * @return undefined
 * */
 const analyze = (event,callbacks) =>{
     const defaultCallbacks = {
         onOneBook:(genre) => console.log("Callback:onOneBook is not specified."),
         onRankingBook:(genre) => console.log("Callback:onRankingBook is not specified."),
         onNotDetect:() => console.log("Callback:onNotDetect is not specified.")
     };
     
     const mergedCallbacks = Object.assign({},defaultCallbacks,callbacks);
     
     //const detectedGenre = findDetectedGenre(event);
     
    if(isBookRequest(event)){
    //本だったら
        const genre = getGenre(event);
    
        if(isOneBook(event)){
            //一冊の時
            mergedCallbacks.onOneBook(genre)
        }
        else
        {
            //Rankingの時
            mergedCallbacks.onRankingBook(genre);
        }

    }
    else
    //本ではない
    {
        mergedCallbacks.onNotDetect();
    }


 };
 
const isBookRequest =(event) =>{
    return event.lineMessage.events[0].message.text.indexOf("本") > -1;
    //本という文字が含まれる場合
}

const isOneBook =(event) =>{
    return event.lineMessage.events[0].message.text.indexOf("ランキング") == -1;
    //ランキングという文字が含まれなかった場合;
}

const getGenre =(event) =>{
    const indexOfKeyword =　event.lineMessage.events[0].message.text.indexOf("の本");
    return event.lineMessage.events[0].message.text.substr(0,indexOfKeyword);
    //"の"の前までの文字列を返す
}



//analyze関数をexport。
exports.analyze = analyze;
 