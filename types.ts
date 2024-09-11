export interface Description {
    _type: string
    children: {
        text: string
    }[]
}

export interface SanityImage {
    _type: string
    asset: {
        _ref: string
        _type: string
    }
}

export interface CardFigure {
    _id: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    faction?: { name: string }[]
}

export interface DetailedFigure extends CardFigure {
    type?: 'Warrior' | 'Hero'
    material?: ('metal' | 'plastic' | 'resin')[];
    character?: { name: string }[]
    race? : { name: string }[]
    description?: Description
    baseSize: '25mm' | '40mm' | '60mm';
    alias?: string
    featured?: boolean

}

export interface Set {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    faction?: { name: string }[]
    figures: {
        _id: string,
        mainName: string,
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

export interface Collection {
    owned: {
        id:string
        quantity: number
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