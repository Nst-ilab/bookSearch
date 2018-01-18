"use strict";

//node.js組み込みのhttpsクライアント
const https = require('https');

const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

const fetchOne = (genre,callbacks) =>{
    const targetUrl = baseUrl + encodeURIComponent(genre);
            /**
         * https.getの使い方は下記参照。正直、res.on('end')以外はおまじないと捉えても構わない
         * @see https://qiita.com/n0bisuke/items/788dc4379fd57e8453a3
         * */
        https.get(targetUrl + "&country=JP",(res)=>{
            //response bodyを格納する変数。再代入するのでletで宣言。
            let body = '';
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                  //chunkを取得するたびにbody変数に追記する
                  body += chunk;
            });
            
            res.on('end', (res) => {
                const result = JSON.parse(body);
                if (result.items){
                    const i = result.items.length;
                    const item = result.items[Math.floor( Math.random() * i)];
                    console.log(item.volumeInfo.title);

                    callbacks.onFetch(item.volumeInfo.title,item.volumeInfo.imageLinks.smallThumbnail);
                }else{
                    console.log("探している本は見つかりませんでした");
                    callbacks.onNotFetch();//onNotFetchにコールバックする
                }
            });
        }).on('error',(e)=>{
            //そもそもrequestがエラーになった場合
            console.log(e);//エラーの原因をログに吐いて
            callbacks.onNotFetch();//onNotFetchにコールバックする
        });
};

const fetchRanking = (genre,callbacks) =>{
    const targetUrl = baseUrl + encodeURIComponent(genre);
        /**
         * https.getの使い方は下記参照。正直、res.on('end')以外はおまじないと捉えても構わない
         * @see https://qiita.com/n0bisuke/items/788dc4379fd57e8453a3
         * */
        https.get(targetUrl + "&country=JP",(res)=>{
            //response bodyを格納する変数。再代入するのでletで宣言。
            let body = '';
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                  //chunkを取得するたびにbody変数に追記する
                  body += chunk;
            });
            
            res.on('end', (res) => {
                const result = JSON.parse(body);
                console.log(result.items[0].volumeInfo.title);
                const titles = result.items.map((item) => item.volumeInfo.title);
                callbacks.onFetch(titles);
            });
        }).on('error',(e)=>{
            //そもそもrequestがエラーになった場合
            console.log(e);//エラーの原因をログに吐いて
            callbacks.onNotFetch();//onNotFetchにコールバックする
        });
};



exports.fetchOne = fetchOne;
exports.fetchRanking = fetchRanking;