import request from "@/utils/request";

export function predictSingleImage(data) {
    return request({
        url: '/predictSingle',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        data: data,
    });
}

export function predictMultipleImage(data) {
    return request({
        url: '/predictMulti',
        method: 'post',
        data: data,
    });
}