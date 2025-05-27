
export interface FigureCard {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    faction?: { name:string }[]
    armyList?: { name: string }[]
    status?:string
}

export interface FigureFull extends FigureCard {
    gallery?: SanityImage[]
    type?: string
    material?: string[]
    character?:{ name: string }[]
    baseSize?: string
    race?: {name: string}[]
    description?: Description
    officialDescription?: Description
    references?: string[]
    alias?: string
    sculptor?: { name: string}[]
    featured?: boolean
}

export interface SetCard {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
}

export interface SetFull extends SetCard {
    figures: FigureCard[]
    print: PrintCard[]
    terrain: TerrainCard[]
    accessory: AccessoryCard[]
    description: Description
}

export interface TerrainCard {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
    featured?:boolean
}

export interface TerrainFull extends TerrainCard {
    gallery?: SanityImage[]
}

export interface PrintCard {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    edition?: {name: string}
    releaseWave?: { name: string }
}

export interface PrintFull extends PrintCard {
    gallery?: SanityImage[]
    description: Description
}

export interface AccessoryCard {
    _id: string
    _type: string
    mainName: string
    image?: SanityImage
    releaseWave?: { name: string }
}

export interface AccessoryFull extends AccessoryCard {
    gallery?:  SanityImage[]
    description?: Description
    featured?: boolean
}

export interface Character {
    _id: string
    _type: string
    name: string
}

export interface Faction {
    _id: string
    _type: string
    name: string
    alignment?: string
    icon?: SanityImage
}

export interface ArmyList {
    _id: string
    _type: string
    name: string
    alignment?: string
    icon?: SanityImage
}

export interface ReleaseWave {
    _id: string
    _type: string
    name: string
    releaseDate?: string
}

export interface Edition {
    _id: string
    _type: string
    name: string
    releaseDate?: string
    description?: Description
}

export interface SanityImage {
        _type: string,
        asset?: {
            _ref: string,
            _type: string
        }
}

export interface Description {
    _type: string
    children: {
        text: string
    }[]
}[]

export interface Sculptor {
    _id: string
    _type: string
    name: string
}

export interface Packaging {
    _id: string
    _type: string
    name: string
    image?: SanityImage
    description?: Description
}