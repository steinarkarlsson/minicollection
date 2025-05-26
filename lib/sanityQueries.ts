import {Accessory, Edition, Faction, Figure, Print, ReleaseWave, Set, Terrain} from "../typings";
import {sanityClient} from "./sanityClient";

export async function getFigures(searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '', count: number = 32) {

    const searchString = searchFilter ? `&& mainName match $searchFilter || character[]->name match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    const results = await sanityClient.fetch(`*[_type == "figure" ${searchString} ${factionString} ${releaseWaveString}] | order(releaseWave->releaseDate desc, faction[0]->name, type, mainName, defined(image.asset) desc)[0...${count}] {
        _id,
        mainName,
        image,
        releaseWave->{name},
        faction[]->{name},
        armyList[]->{name},
    }`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
    return results as Figure[];
}


export async function getSets(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "set"] | order(defined(image.asset) desc) {
        _id,
        mainName,
        image,
        releaseWave->{name},
        figures[]->{mainName, image, _id}
        }[0...${count}]`) as Set[];
}

export async function getTerrain(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "terrain"] {
        _id,
        _type,
        mainName,
        image,
        gallery,
        releaseWave->{name},
        featured
    } | order(mainName asc)[0...${count}]`) as Terrain[];
}

export async function getPrints(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "print"] {
        _id,
        _type,
        mainName,
        image,
        gallery,
        description,
        releaseWave->{name},
        edition->{name},
        featured
    } | order(mainName asc)[0...${count}]`,
        {},
        {next: {tags: ['prints']}}) as Print[];
}

export async function getAccessories(count: number = 100) {
    return await sanityClient.fetch(`*[_type == "accessory"] {
        _id,
        _type,
        mainName,
        image,
        gallery,
        description,
        releaseWave->{name},
        featured
    } | order(mainName asc)[0...${count}]`) as Accessory[];
}

export async function getFactions() {
    return await sanityClient.fetch(`*[_type == "faction"] | order(alignment desc, name asc)`) as Faction[];
}

export async function getReleaseWaves() {
    return await sanityClient.fetch(`*[_type == "releaseWave"] | order(releaseDate desc)`) as ReleaseWave[];
}

export async function getEditions() {
    return await sanityClient.fetch(`*[_type == "edition"]`) as Edition[];
}

export async function getFigureDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "figure" && _id == $id]{
    _id,
    mainName,
    image,
    releaseWave->{name},
    faction[]->{name},
    type,
    material,
    character[]->{name},
    description,
    race,
    baseSize,
    alias
    }`, {id}) as Figure[];
}

export async function getSetDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "set" && _id == $id][0] {
    _id,
    mainName,
    image,
    releaseWave->{name},
    figures[]->{mainName, image, _id}
    }`, {id}) as Set;
}

export async function getPrintDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "print" && _id == $id][0] {
    _id,
    mainName,
    image,
    gallery,
    description,
    releaseWave->{name},
    }`, {id}) as Print;
}

export async function getAccessoryDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "accessory" && _id == $id][0] {
    _id,
    _type,
    name,
    image,
    gallery,
    description,
    releaseWave->{name},
    featured
    }`, {id}) as Accessory;
}

export async function getTerrainDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "terrain" && _id == $id][0] {
    _id,
    _type,
    mainName,
    image,
    gallery,
    releaseWave->{name},
    featured
    }`, {id}) as Terrain;
}

export async function getFeaturedSets() {
    return await sanityClient.fetch(`*[_type == "set" && featured]{
    _id,
    mainName,
    image,
    releaseWave->{name}
    }`) as Set[];
}

export async function getFeaturedFigures() {
    return await sanityClient.fetch(`*[_type == "figure" && featured]{
    _id,
    mainName,
    image,
    releaseWave->{name},
    faction[]->{name},
    material,
    }`) as Figure[];
}

export async function getFeaturedTerrain() {
    console.log("getFeaturedTerrain");
    return await sanityClient.fetch(`*[_type == "terrain" && featured]{
    _id,
    mainName,
    image,
    releaseWave->{name},
    }`) as Terrain[];
}

export async function getFeaturedAccessories() {
    console.log("getFeaturedAccessories");
    return await sanityClient.fetch(`*[_type == "accessory" && featured]{
    _id,
    mainName,
    image,
    releaseWave->{name},
    }`) as Accessory[];
}

export async function getFeaturedPrint() {
    console.log("getFeaturedPrint");
    return await sanityClient.fetch(`*[_type == "print" && featured]{
    _id,
    mainName,
    image,
    releaseWave->{name},
    edition->{name},
    }`) as Print[];
}