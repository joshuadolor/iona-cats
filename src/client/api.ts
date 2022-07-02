import Http from "./http";
import {CATS_API_ENDPOINT_V1} from '../constants';

class ApiClient {
    static url = "";
    static readonly API_BASE = CATS_API_ENDPOINT_V1;

    //should return type ApiClient, but cannot create types for statics, ?_?
    public static setUrl(url:string): any {
        this.url = this.API_BASE + url;
        return ApiClient;
    }

    public static get(params?:any): Promise<any> {
        const http = new Http();
        return http.get(this.url, params);
    }
}

export default ApiClient;
