import {IBreed} from './breed';

export interface ICat {
    _breeds: Array<IBreed>;
    id: string;
    url: string;
    breed: IBreed;
}

export class Cat implements ICat{
    _id:string;
    _url: string;
    _breeds: Array<IBreed> = [];

    constructor(data:any) {
        this._id = data.id;
        this._url = data.url;
        this._breeds = data.breeds;
    }

    get id() {
        return this._id;
    }

    get url() {
        return this._url;
    }

    get breed() : IBreed{
        return this._breeds[0]
    }
}
