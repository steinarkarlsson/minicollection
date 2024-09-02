
export interface Figure {
    _id: string
    type?: string
    releaseWave?: {
        name: string
    }
    mainName: string
    material?: string[]
    faction?: {
        name: string
    }[]
    image?: {
        _type: string,
        asset?: {
            _ref: string,
            _type: string
        }
    }
    character?:{
        name: string
    }[]
}

export interface GridFigure {
    _id: string
    mainName: string
    image?: {
        _type: string,
        asset?: {
            _ref: string,
            _type: string
        }
    }
    releaseWave?: { name: string }
    faction?: { name:string }[]
}

export interface Set {
    _id: string
    _type: string
    mainName: string
    image?: {
        _type: string,
        asset?: {
            _ref: string,
            _type: string
        }
    }
    releaseWave?: { name: string }
    faction?: { name:string }[]
    figures: {
        _id: string,
        mainName:string,
        image?: {
            _type: string,
            asset?: {
                _ref: string,
                _type: string
            }
        }
    }[]
    print: {
        _ref: string
    }[]
    terrain: {
        _ref: string
    }[]
    description: {
        _type: string
        children: {
            text: string
        }[]
    }[]
}

export interface GridSet {
    _id: string
    _type: string
    mainName: string
}

export interface Terrain {
    _id: string
    _type: string
    mainName: string
}

export interface GridTerrain {
    _id: string
    _type: string
    mainName: string
}

export interface Print {
    _id: string
    _type: string
    mainName: string
}

export interface GridPrint {
    _id: string
    _type: string
    mainName: string
}

export interface Character {
    _id: string
    _type: string
    name: string
}

export interface Faction {
    _id: string
    _type: string
    alignment: string
    name: string
}

export interface ReleaseWave {
    _id: string
    _type: string
    name: string
    releaseDate: string
}