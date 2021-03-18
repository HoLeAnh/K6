import http from 'k6/http';

export function excute(token) {
    let url = "https://www.sendo.vn/m/wap_v2/home/seo-footer?";
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };

    let res = http.get(url, params)
    return res;
}