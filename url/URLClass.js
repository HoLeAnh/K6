var config = JSON.parse(open("../data/config.json"));

var HOST = null
var KENO_LOGIN = null
var KENO_BUY_TICKET = null

if (config.environment == 'dev') {
    HOST = 'https://dev-api.keno88.vn'
    KENO_LOGIN = '/user/login'
    KENO_BUY_TICKET = ''
}


export { HOST, KENO_BUY_TICKET, KENO_LOGIN }
