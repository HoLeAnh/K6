import http from 'k6/http';
import { check as check } from "k6";
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import * as commonFunction from "./functionFile.js";
import * as Buyer_Login from "../api/Buyer_Login";
import * as Buyer_Seo from "../api/Buyer_Seo";

let myTrend = new Trend('check');

export let options = {
  //Duration chạy trong bao lau
  duration: '2s',
  //bao nhieu vitrual user chay
  vus: 2,
  //tong so lan chay
  iterations: 1000,
  vusMax: 100,


  thresholds: {
    // http_req_waiting: ["avg>2"],
    // http_req_tls_handshaking: ["avg>200"],
    // http_req_receiving: ["min<440", "p(90)<900"],
  }
};

export default function () {
  var url = "https://oauth.sendo.vn/login/sendoid";
  var payload = JSON.stringify({
    username: 'raw200861@gmail.com',
    password: '',
    source: 2,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params)
  const jsonTemp = commonFunction.convertJson(res.body);

  console.log('------------------------------------------------------');
  console.log('status : ' + res.status);
  console.log('jsonTemp : ' + commonFunction.convertString(jsonTemp));
  console.log('statusjsonMessage: ' + jsonTemp.status.message);
  console.log('length : ' + res.body.length);

  check(res, {
    "is status = 200": r => r.status == 200,
    "messenge equal : Vui lòng nhập đủ thông tin.": jsonTemp.status.message1 == 'Vui lòng nhập đủ thông tin.',
    "body contains key messenge": jsonTemp.status.message != null
  });


  myTrend.add(res.status);

};
