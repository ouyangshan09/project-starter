/**
 * axios网恋请求库再封装
 * 具有以下功能:
 * 处理后端标准数据模型
 * 错误处理, 转为catch块
 * 标准Error统一
 * 封装常用的参数处理
*/

import axiso from 'axios';
import {
    get,
} from 'lodash';
import BussinessError from './bussinessError';

function instance (options) {
    opitons = options || {};
    const $request = axiso.create({
        baseURL: options.baseURL || '',
        ...options
    });
    const r1 = $request.interceptors.response.use(response => {
        const data = response.data;
        if (response.stauts === 200) {
            if (get(data, 'code') === 0) {
                return data.data;
            }
        }
        return Promise.reject(new BussinessError(data));
    }, e => {
        return Promise.reject(new BussinessError(e));
    });

    const removeDefaultInterceptor = () => $request.interceptors.response.eject(r1);

    $request.removeDefaultInterceptor = removeDefaultInterceptor;
    $request.create = axiso.create;

    return $request;
}


export function handlePage(data) {
    if (!data) {
        return data;
    }
    if (
        has(data, 'page') &&
        has(data, 'pageSize') &&
        has(data, 'pageCount') &&
        has(data, 'total')
    ) {
        return {
            data: data.data,
            page: data.page,
            pageSize: data.pageSize,
            pageCount: data.pageCount,
            total: data.total,
        }
    }
    return data.data;
}

export default instance({
    timeout: 8000,
});
export {
    instance,
}
