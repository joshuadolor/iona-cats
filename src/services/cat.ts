import ApiClient from "@/client/api";

import {ICat, Cat as Model} from "@/models/cat";

export type FetchParameters = {
    page: number;
    limit: number;
    breed_id: string;
}; 

import {AxiosError} from 'axios';

export class CatService {
    static endpoint = "/images";

    static fetch(params?:FetchParameters): Promise<Array<Model>> {
        return ApiClient.setUrl(this.endpoint + '/search')
            .get(params)
            .then(( data: Array<ICat> = []) => {

                return data.map(d => new Model(d));
            })
            .catch((e:unknown) => {
                throw e;
            });
     
    }

    static getById(id:string):Promise<Model> {
        return ApiClient.setUrl(this.endpoint + `/${id}`)
            .get()
            .then(( data: ICat) => {
                return new Model(data);
            })
            .catch((e:AxiosError) => {
                throw e;
            });
    }
}

