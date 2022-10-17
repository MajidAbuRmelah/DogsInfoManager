export default class HttpResponse {
    /**
     * @param {any} data 
     * @param {boolean} isSuccess 
     */
    constructor(data, isSuccess) {
        this.data = data;
        this.isSuccess = isSuccess;
    }
}