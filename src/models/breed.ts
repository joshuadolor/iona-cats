// getters?
export interface IBreed {
    id: string;
    name: string;
    temperament: string;
    description: string;
    origin: string;
}

export class Breed implements IBreed{
    _id:string;
    _name: string;
    _temperament: string;
    _description: string;
    _origin : string;

    constructor(data:any) {
        this._id = data.id;
        this._name = data.name;
        this._temperament = data.temperament;
        this._description = data.description;
        this._origin = data.origin;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get temperament() {
        return this._temperament;
    }

    get description() {
        return this._description;
    }

    get origin() {
        return this._origin;
    }
}
