import axios from "axios";
import APITypeEnum from "../constants/APITypeEnum";
import HttpResponse from "../models/HttpResponse";

/**
 * @param {string} path The path of the API.
 * @param {APITypeEnum} type The type of the API.
 * @param {object} json A javascript object that is later converted to JSON.
 * @param {string | number} parameter The parameter to be added to the API path.
 * @returns {HttpResponse}
 */
export default async function HttpRequest(path, type, json = null, parameter = null) {
    if (parameter != null) {
        path += '/' + parameter;
    }
    let callback;
    switch (type) {
        case APITypeEnum.POST:
            callback = axios.post(path, json);
            break;
        case APITypeEnum.PUT:
            callback = axios.put(path, json);
            break;
        case APITypeEnum.GET:
            callback = axios.get(path);
            break;
        case APITypeEnum.DELETE:
            callback = axios.delete(path);
            break;
        default:
            return null;
    }
    try {
        const response = await callback;
        //Note: response.status === 200 is considered a bad practice to determine if the request is successful. But our API will always return a 200 if the request is successful.
        return new HttpResponse(response.data, response.status === 200);
    } catch(err) {
        return new HttpResponse(err, false);
    }
}