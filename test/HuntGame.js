import http from 'k6/http';
import { check as check } from "k6";
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('check');

export let options = {
  //Duration chạy trong bao lau, neu het thoi gian ma iterations chua het thi se dung test
  duration: '200s',
  //bao nhieu vitrual user chay
  vus: 10,
  vusMax: 10,
  //tong so lan chay
  iterations: 2000,

};


export default function () {



  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMTJTNHBjMXBFQk5lZVZONWVYZVFHR0h1cUNOVDJCTGdtZnlkcXNDcnRheHFLRkxXVVhWcFZNMTVqMTNFd3AyVWttNTVteDhjVEJUOUpzaW1YcUg1THNUSzVlcGEzbnRoYmU5N2E1YSIsImV4cCI6MTYwOTA3MDE5NiwiaWQiOjg1fQ.gfDZBZsD2fMOPSMUgp_R111EuKNmff2XQ838rEiEp7c'
  let url = "https://api-hunt-staging.incognito.org/api/spin";

  //getmempoolinfo
  let urlChain = 'https://testnet.incognito.org/fullnode'
  let payloadChain = JSON.stringify({
    "jsonrpc": "1.0",
    "method": "getmempoolinfo",
    "params": [],
    "id": 1
  });

  let paramsChain = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let resChain = http.post(urlChain, payloadChain, paramsChain)
  let bodyChain = JSON.parse(resChain.body)
  //console.log('resChain : ' + JSON.stringify(bodyChain.Result.ListTxs[0].TxID))

  if (bodyChain.Result && bodyChain.Result.ListTxs && bodyChain.Result.ListTxs[0].TxID) {
    let txCount = bodyChain.Result.ListTxs.length

    for (let index = 0; index < txCount; index++) {
      let tx = bodyChain.Result.ListTxs[index].TxID
      console.log('tx : ' + tx)

      let payload = JSON.stringify({
        "tx": tx
      });

      let params = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };

      let res = http.post(url, payload, params)
      let resBody = res.body

      //console.log('test : ' + resBody)
      console.log('resBody : ' + JSON.stringify(resBody))
      if (resBody.Data && resBody.Data.proof && JSON.stringify(resBody.Data.proof)) {
        console.log('proof : ' + JSON.stringify(resBody.Data.proof))
      }


      //console.log('body : ' + res.body)
      check(res, {
        "is status = 500": r => r.status == 500,
        "is Message = invalid Memo": r => JSON.stringify(r.body.Message) == 'the memo is empty or invalid. invalid Memo'
      });
    }


  }

};
