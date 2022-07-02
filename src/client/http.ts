import axios from 'axios';

import { AxiosRequestConfig, AxiosResponse, Method, AxiosPromise } from 'axios'

interface IHttp {
    config: AxiosRequestConfig;
    get: (url:string) => Promise<any>;
}

export default class Http implements IHttp {
    constructor() {
        this.config = {
            url: '',
            data: {},
            method: 'get',
            params: {},
        };
    }

    config:AxiosRequestConfig = {};

    get(url:string, params = {}): Promise<any> {
        this.prepareXhr(url, 'get');
        this.config.params = params;
        return this.send();
    }

    private prepareXhr(url:string, method:Method): void {
        this.config.url = url;
        this.config.method = method;
    }

    private send(): AxiosPromise<AxiosResponse> {
        return axios(this.config).then((response) => {
            return response.data;
        });
    }
}
