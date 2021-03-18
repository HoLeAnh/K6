import { check as check, sleep } from "k6";
import { Trend } from 'k6/metrics';
import { group } from 'k6';
import * as commonFunction from "../common/CommonFunction.js";
import * as Buyer_Login from "../api/Buyer_Login.js";
import * as Buyer_Seo from "../api/Buyer_Seo.js";

let myTrend = new Trend('check');

export let options = {
  duration: '20s',
  vus: 1,
  iterations: 2,
};

//init data
const resultPath = '/Users/autonomous/Desktop/K6/data/myjsonfile.json'

//common.writeFile('/Users/autonomous/Desktop/K6/data/myjsonfile.json', json)
var loginData = JSON.parse(open("../data/users.json"));
var listNumber = [];

var obj = {
  table: []
};

export function setup() {
  __ENV.temp = '--';
  console.log("setup : " + __ENV.temp)
}

export default function (data) {
  console.log('------------------------------------------------------');

  var resultObj = {
    table: []
  };

  //let index = commonFunction.randomNumberNotDuplicate(0, 2, listNumber)
  let index = commonFunction.randomNumber(0, 3)
  //console.log('index : ' + index)
  listNumber.push(index)
  //console.log('listNumber : ' + listNumber)

  let username = loginData.users[index].username
  console.log('username : ' + username)
  let password = loginData.users[index].password
  var token = null
  var seoItem = null

  group('login', function () {
    let resBuyerLogin = Buyer_Login.excute(username, password);
    let body = commonFunction.convertJson(resBuyerLogin.body)
    token = body && body.result && body.result.metaData && body.result.metaData.token
    console.log('token : ' + token)
    console.log('body : ' + resBuyerLogin.body)

    check(resBuyerLogin, {
      "is status = 200": r => r.status == 200,
    });
  });

  group('seo', function () {
    let resBuyerSeo = Buyer_Seo.excute(token);
    let body = commonFunction.convertJson(resBuyerSeo.body)
    seoItem = body.result.data.data.list[5].name
    console.log('list1 : ' + body.result.data.data.list[5].name)

    check(resBuyerSeo, {
      "is status = 200": r => r.status == 200,
    });
  });

  __ENV.temp = __ENV.temp + '{"username":"' + username + '","password":"' + password + '"},';
  console.log("function : " + __ENV.temp)
};

export function teardown(data) {
  console.log('this is teardown')
  let temp = __ENV.temp
  temp = temp.substring(2, temp.length - 1)

  var list = temp.split('},{');
  list.forEach(element => {
    element = element.replace("{", "")
    element = element.replace("}", "")
    element = '{' + element + '}'
    //console.log('element 2 : ' + element)
    obj.table.push(JSON.parse(element))
  });

  console.log('obj : ' + JSON.stringify(obj))
  console.log('write success')
}





