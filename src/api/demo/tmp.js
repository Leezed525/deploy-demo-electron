import request from "@/utils/request";

export function helloWorldReq() {
    return request({
        url: 'helloWorld',
        method: 'get',
    });
}

export function tmpReq(query) {
    return request(query);
}