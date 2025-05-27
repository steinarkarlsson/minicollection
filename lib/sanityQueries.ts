import {
    AccessoryCard,
    AccessoryFull,
    ArmyList,
    Edition,
    Faction,
    FigureCard,
    FigureFull, PrintCard,
    PrintFull,
    ReleaseWave, SetCard,
    SetFull, TerrainCard,
    TerrainFull
} from "../typings";
import {sanityClient} from "./sanityClient";

export async function getFigures(searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '', count: number = 32) {

    const searchString = searchFilter ? `&& mainName match $searchFilter || character[]->name match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    const results = await sanityClient.fetch(`*[_type == "figure" ${searchString} ${factionString} ${releaseWaveString}] | order(releaseWave->releaseDate desc, faction[0]->name, type, mainName, defined(image.asset) desc)[0...${count}] {
        _id,
        _type,
        mainName,
        image,
        releaseWave->{name},
        faction[]->{name},
        armyList[]->{name},
        status,
    }`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
    return results as FigureCard[];
}


export async function getSets(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "set"] | order(defined(image.asset) desc) {
        _id,
        _type,
        mainName,
        image,
        releaseWave->{name},
        }[0...${count}]`,
        {},
        {next: {tags: ['sets']}}) as SetCard[];
}

export async function getTerrain(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "terrain"] {
        _id,
        _type,
        mainName,
        image,
        releaseWave->{name},
        featured
    } | order(mainName asc)[0...${count}]`,
        {},
        {next: {tags: ['terrain']}}) as TerrainCard[];
}

export async function getPrints(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "print"] {
        _id,
        _type,
        mainName,
        image,
        edition->{name},
        releaseWave->{name},
    } | order(mainName asc)[0...${count}]`,
        {},
        {next: {tags: ['prints']}}) as PrintCard[];
}

export async function getAccessories(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "accessory"] {
        _id,
        _type,
        mainName,
        image,
        releaseWave->{name},
    } | order(mainName asc)[0...${count}]`,
        {},
        {next: {tags: ['accessories']}}) as AccessoryCard[];
}

export async function getFactions() {
    return await sanityClient.fetch(`*[_type == "faction"] | order(alignment desc, name asc)`,
        {},
        {next: {tags: ['factions']}}) as Faction[];
}

export async function getArmyLists() {
    return await sanityClient.fetch(`*[_type == "armyList"] | order(alignment desc, name asc)`,
        {},
        {next: {tags: ['armyLists']}}) as ArmyList[];
}

export async function getReleaseWaves() {
    return await sanityClient.fetch(`*[_type == "releaseWave"] | order(releaseDate desc)`,
        {},
        {next: {tags: ['releaseWaves']}}) as ReleaseWave[];
}

export async function getEditions() {
    return await sanityClient.fetch(`*[_type == "edition"]`,
        {},
        {next: {tags: ['editions']}}) as Edition[];
}

export async function getFigureDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "figure" && _id == $id]{
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    faction[]->{name},
    armyList[]->{name},
    status,
    gallery,
    type,
    material,
    character[]->{name},
    baseSize,
    race[]->{name},
    description,
    officialDescription,
    references,
    alias,
    sculptor[]->{name},
    featured,
    }`, {id}) as FigureFull[];
}

export async function getSetDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "set" && _id == $id][0] {
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    figures[]->{
        _id,
        mainName, 
        image, 
        releaseWave->{name},
        faction[]->{name},
        armyList[]->{name},
        status,
     },
     print[]->{
        _id,
        mainName,
        image,
        edition->{name},
        releaseWave->{name},
     },
     terrain[]->{
        _id,
        mainName,
        image,
        releaseWave->{name},
     },
     accessory[]->{
        _id,
        mainName,
        image,
        releaseWave->{name},
     },
     description,
    }`, {id}) as SetFull;
}

export async function getPrintDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "print" && _id == $id][0] {
    _id,
    _type,
    mainName,
    image,
    edition->{name},
    releaseWave->{name},
    gallery,
    description,
    }`, {id}) as PrintFull;
}

export async function getAccessoryDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "accessory" && _id == $id][0] {
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    gallery,
    description,
    featured
    }`, {id}) as AccessoryFull;
}

export async function getTerrainDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "terrain" && _id == $id][0] {
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    featured,
    gallery
    }`, {id}) as TerrainFull;
}

export async function getFeaturedSets() {
    return await sanityClient.fetch(`*[_type == "set" && featured]{
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name}
    }`) as SetFull[];
}

export async function getFeaturedFigures() {
    return await sanityClient.fetch(`*[_type == "figure" && featured]{
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    faction[]->{name},
    armyList[]->{name},
    status,
    }`) as FigureCard[];
}

export async function getFeaturedTerrain() {
    console.log("getFeaturedTerrain");
    return await sanityClient.fetch(`*[_type == "terrain" && featured]{
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name}
    }`,
    {},
    {next: {tags: ['terrain']}}) as TerrainCard[];
}

export async function getFeaturedAccessories() {
    console.log("getFeaturedAccessories");
    return await sanityClient.fetch(`*[_type == "accessory" && featured]{
    _id,
    _type,
    mainName,
    image,
    releaseWave->{name},
    }`,
    {},
    {next: {tags: ['accessories']}}) as AccessoryCard[];
}

export async function getFeaturedPrint() {
    console.log("getFeaturedPrint");
    return await sanityClient.fetch(`*[_type == "print" && featured]{
    _id,
    _type,
    mainName,
    image,
    edition->{name},
    releaseWave->{name}
    }`,
    {},
    {next: {tags: ['prints']}}) as PrintCard[];
}