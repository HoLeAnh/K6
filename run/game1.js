import { check as check, sleep } from "k6";
import { Trend } from 'k6/metrics';
import { group } from 'k6';
import * as commonFunction from "../common/CommonFunction.js";
import * as Keno_Login from "../api/Keno_Login.js"

let myTrend = new Trend('check');
var obj = {
    table: []
};

export let options = {
    duration: '20s',
    vus: 1,
    iterations: 5,
};

//Init data
var loginData = JSON.parse(open("../data/kenoUsers.json"));
var listNumber = [];

export function setup() {
    __ENV.temp = '--';
}

export default function () {
    console.log('------------------------------------------------------');

    //let index = commonFunction.randomNumberNotDuplicate(0, 2, listNumber)
    let index = commonFunction.randomNumber(0, 0)

    //console.log('index : ' + index)
    //listNumber.push(index)
    //console.log('listNumber : ' + listNumber)

    let phoneNumber = loginData.users[index].phoneNumber
    let password = loginData.users[index].password
    var token = null

    group('Login', function () {

        let resKenoLogin = Keno_Login.excute(phoneNumber, password)
        let body = commonFunction.convertJson(resKenoLogin.body)
        token = body && body.token

        console.log('token : ' + token)
        check(resKenoLogin, {
            "is status 201": r => r.status == 201
        })
    });

    group('Buy Ticket', function () {
        /////
    });
    __ENV.temp = __ENV.temp + '{"Number":"' + 1 + '","Token":"' + token + '"},';
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

    console.log('data : ' + JSON.stringify(obj))
    console.log('write success')
}





