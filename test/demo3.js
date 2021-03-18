export let options = {
    duration: '20s',
    vus: 1,
    iterations: 2,
    noUsageReport: true,
};

export function setup() {
    console.log("RUNNING!!!");
    var data = 1
    __ENV.temp = 2
    console.log("setup : " + __ENV.temp);
   // console.log("setup : " + data);
    return data
};

export default function (data) {
    data = 2
    __ENV.temp = 1
    console.log("function : " + __ENV.temp);
    //console.log("function : " + data);
};

export function teardown(data) {
    //  console.log("teardown");
    console.log("Teardown : " + __ENV.temp);
    //console.log("Teardown : " + data);
};