 "use strict";
 
 //ユーザーのリクエストから調べるべきワードを分析するモジュール
 const requestAnalyzer = require('./request-analyzer');

 //apiで単語に該当する記事を取得するモジュール
 const apiFetcher = require('./api-fetcher');
 
 

exports.handler = (event, context, callback) => {
    requestAnalyzer.analyze(event,{
        onOneBook:(genre) => {
            apiFetcher.fetchOne(genre,{
                onFetch:(bookName,thumbnail) => {
                    console.log(bookName);
                    console.log("ok");
                    callback(null,{message:"『"+bookName+"』だよ\n"+thumbnail});
                },
                onNotFetch:()=>callback() //結果が無かったので何も返さない
            })
        },
        onRankingBook:(genre) => {
            apiFetcher.fetchRanking(genre,{
                onFetch:(bookNames) => {
                    callback(null,{message:bookNames.map(bookName => "『"+bookName+"』") .join("\n")+"だよ"});
                },
                onNotFetch:()=>callback() //結果が無かったので何も返さない
            })
        },
        onNotDetect:() => {
            callback();
        }
        
        
        
        })
};