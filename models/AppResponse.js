module.exports = class AppResponse {
    /**
     * @param {ResponseCode}
     * @param {String} message
     * @param { []} errors 
     */
    constructor(ResponseCode, message, data = {}, errors = []) {
        this.ResponseCode = ResponseCode;
        this.message = message ;
        this.data = data ;
        this.errors = errors 
    }
} 
