module.exports = class AppResponse {
    /**
     * @param {ResponseCode}
     * @param {String} message
     * @param { []} errors 
     */
    constructor(ResponseCode, response, data = {}, errors = []) {
        this.ResponseCode = this.ResponseCode;
        this.message = message ;
        this.data = data ;
        this.errors = errors 
    }
} 
