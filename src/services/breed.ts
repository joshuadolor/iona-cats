import ApiClient from "@/client/api";

import {Breed, IBreed} from "@/models/breed";
import {AxiosError} from 'axios';

export class BreedService {
    static endpoint = "/breeds";

    static fetch(): Promise<IBreed> {
        return ApiClient.setUrl(this.endpoint)
            .get()
            .then(( data: Array<Breed>) => {
                return data.map(d => new Breed(d));
            })
            .catch((e:AxiosError) => {
                return e;
            });
     
    }
}

