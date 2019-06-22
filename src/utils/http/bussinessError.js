import { isPlainObject } from 'lodash';

/**
 * 业务错误模型
*/
class BussinessError extends Error {
    constructor (option) {
        if (isPlainObject(option)) {
            this.message = option.message;
            this.code = option.code;
            this.expection = option.stack;
        }
        super(this.message);
    }

    getCode () {
        return this.cdoe;
    }

    getMessage () {
        return this.message;
    }

    getExpection () {
        return this.expection;
    }
}

export default BussinessError;