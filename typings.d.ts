
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
    image?: SanityImage
    character?:{
        name: string
    }[]
    status?: string
}

export interface GridFigure {
    _id: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    faction?: { name:string }[]
    status?:string
}

export interface Set {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    faction?: { name:string }[]
    figures: {
        _id: string,
        mainName:string,
        image?: SanityImage
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
    image?: SanityImage
    gallery?: SanityImage[]
    releaseWave?: { name: string }
    featured?: boolean
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
    image?: SanityImage
    gallery?: SanityImage[]
    description: {
        _type: string
        children: {
            text: string
        }[]
    }[]
    edition?: {name: string}
    releaseWave?: { name: string }
}

export interface Accessory {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    gallery?:  SanityImage[]
    description?: {
        _type: string
        children: {
            text: string
        }[]
    }[]
    releaseWave?: {
        name: string
    }
    featured?: boolean
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

export interface Edition {
    _id: string
    _type: string
    name: string
    releaseDate: string
    description: {
        _type: string
        children: {
            text: string
        }[]
    }[]
}

export interface SanityImage {
        _type: string,
        asset?: {
            _ref: string,
            _type: string
        }
}