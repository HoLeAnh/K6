import http from 'k6/http';
import { check as check } from "k6";
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('check');

export let options = {
    //Duration chạy trong bao lau, neu het thoi gian ma iterations chua het thi se dung test
    duration: '10s',
    //bao nhieu vitrual user chay
    vus: 2,
    vusMax: 2,
    //tong so lan chay
    iterations: 10,

};


export default function () {

    //getmempoolinfo
    let url = 'https://staging-api-service.incognito.org/pool/request-withdraw'
    let body = JSON.stringify({
        "ProductID": "364ab697-33aa-1234-1234-7756f813735e",
        "ValidatorKey": "1234",
        "QRCode": "0205-123458",
        "PaymentAddress": "12RzMKmcShLdtgiyLxU2iKQp58YaP5PiGTeX2a7ojnNRJLZ8WXLCMfhPd8Cf2yoMziKQP2yCfVHu9trrEQmXu5owZMYiuyQD3q5ZpE3"
    });

    let param = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9uZ0B5b3BtYWlsLmNvbSIsImV4cCI6MTkxMjIxOTIwOCwiaWQiOjExLCJvcmlnX2lhdCI6MTU5NzcyMzIwOH0.RWalpchl0D-zy0628IcxIrCBBr1Kh__g2MreZiXC_Lo',
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, body, param)
    let bodyResponse = JSON.parse(res.body)
    console.log('bodyResponse : ' + JSON.stringify(bodyResponse))

    //console.log('body : ' + res.body)
    check(res, {
        "is status = 500": r => r.status == 500,
    });
}
