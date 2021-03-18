
import http from 'k6/http';

export function excute(username, password) {
    let url = "https://oauth.sendo.vn/login/sendoid";

    let params = null
    var payload = JSON.stringify({
        username,
        password,
        source: 2,
    });

    let res = http.post(url, payload, params)
    return res;
}