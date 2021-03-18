
import http from 'k6/http'
import * as URLClass from "../url/URLClass.js"

export function excute(phoneNumber, password) {
    let url = URLClass.HOST + URLClass.KENO_BUY_TICKET
    let param = null
    var payload = JSON.stringify({
       //
    });

    let res = http.post(url, payload, params)
    return res;
}