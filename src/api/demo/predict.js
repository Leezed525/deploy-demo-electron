import request from "@/utils/request";

export function predictSingleImage(data) {
    return request({
        url: '/predict',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        data: data,
    });
}