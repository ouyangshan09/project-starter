import cookies from 'js-cookie';
import urlParse from 'url-parse';

const regIp = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;;

/**
 * 符合Ip地址
 * @param {string} hosname
*/
export const isIp = hosname => regIp.test(hosname);

/**
 * 链接顶级域名
 * @param {string} url
*/
export const getTopLevelDomain = url => {
    url = url || window.location.href;
    let hosname = urlParse(url).hostname || url;
    if (isIp(hosname) || hosname.match(/\./g) || hosname.match(/\./g).length < 2) {
        return hosname;
    }
    const regex = /([^]*).*/;
    const match = hosname.match(regex);
    if (match != null) {
        hosname = match[1];
    }
    if (hosname != null) {
        const strArr = hosname.split('.');
        if (strArr.length > 1) {
            hosname = strArr[strArr.length - 2] + '.' + strArr[strArr.length - 1];
        }
    }
    return hosname;
}

/**
 * 设置当前顶级域名值
 * @param {string} name
 * @param {*} value
 * @param {object} [options]
*/
export const setTopLevelCookie = (name, value, options = {}) => {
     const topLevelDomain = getTopLevelDomain();
     const defaultOptions = {
         domain: topLevelDomain,
         expires: 1
     };
     options = Object.assign({}, defaultOptions, options);
     cookies.set(name, value, options);
}

/**
 * 移除当前顶级域名值
 * @param {string} name
*/
export const removeTopLevelCookie = name => {
    const topLevelDomain = getTopLevelDomain();
    cookies.remove(name, {
        domain: topLevelDomain,
    });
}

/**
 * 移除当权顶级域名所有cookies
*/
export const removeAllCookies = () => {
    const topLevelDomain = getTopLevelDomain();
    const all = cookies.get();
    Object.keys(all).forEach((key) => {
        cookies.remove(key);
        cookies.remove(key, {
            domain: topLevelDomain,
        });
    });
}

/**
 * 比较2个链接顶级域名相等
 * @param {string} l1
 * @param {string} l2
*/
export const isTopDomainEqual = (l1, l2) => {
    return getTopLevelDomain(l1) === getTopLevelDomain(l2);
}

/**
 * 取本地cookie值
 * @param {string} name
*/
export const getCookie = name => cookies.get(name);

/**
 * 取cookie全部值
*/
export const getCookieAll = () => cookies.get();

/**
 * 添加或覆盖cookie值
 * @param {string} name
 * @param {*} value
 * @param {object} [options]
*/
export const setCookie = (name, value, options) => cookies.set(name, value, options);

/**
 * 删除cookie值
 * @param {string} name
 * @param {object} options
*/
export const removeCookie = (name, options) => cookies.remove(name, options);
