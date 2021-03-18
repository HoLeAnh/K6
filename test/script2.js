import { check as check } from "k6";
import { Trend } from 'k6/metrics';
import { group } from 'k6';
import * as commonFunction from "../common/functionFile.js";
import * as Buyer_Login from "../api/Buyer_Login.js";
import * as Buyer_Seo from "../api/Buyer_Seo.js";

let myTrend = new Trend('check');

export let options = {
  //Duration chạy trong bao lau
  duration: '30s',
  //bao nhieu vitrual user chay
  vus: 1,
  //tong so lan chay
  iterations: 50,
};

const loginData = JSON.parse(open("/Users/autonomous/Desktop/K6/data/users.json"));
var listNumber = [];

export default function () {
  console.log('------------------------------------------------------');
  console.log("this is script2")
  //read excel file


  //let index = commonFunction.randomNumberNotDuplicate(0, 2, listNumber)
  let index = commonFunction.randomNumber(0, 3)
  //console.log('index : ' + index)
  listNumber.push(index)
  //console.log('listNumber : ' + listNumber)

  let username = loginData.users[index].username
  console.log('username : ' + username)
  let password = loginData.users[index].password

  var token = null
  group('login', function () {
    let resBuyerLogin = Buyer_Login.excute(username, password);
    let body = commonFunction.convertJson(resBuyerLogin.body)
    token = body && body.result && body.result.metaData && body.result.metaData.token
    console.log('token : ' + token)

    check(resBuyerLogin, {
      "is status = 200": r => r.status == 200,
    });
  });

  group('seo', function () {
    let resBuyerSeo = Buyer_Seo.excute(token);
    let body = commonFunction.convertJson(resBuyerSeo.body)
    console.log('list1 : ' + body.result.data.data.list[5].name)

    check(resBuyerSeo, {
      "is status = 200": r => r.status == 200,
    });
  });


};
