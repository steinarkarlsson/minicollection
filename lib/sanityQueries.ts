import {Faction, DetailedFigure, ReleaseWave, Set} from "../types";
import {sanityClient} from "./sanityClient";

export async function getAllCollections() {
    const figure = await sanityClient.fetch(`*[_type == "figure"]`);
    const set = await sanityClient.fetch(`*[_type == "set"]`);
    const terrain = await sanityClient.fetch(`*[_type == "terrain"]`);
    const print = await sanityClient.fetch(`*[_type == "print"]`);
    const character = await sanityClient.fetch(`*[_type == "character"]`);
    const faction = await sanityClient.fetch(`*[_type == "faction"]`);
    const releaseWave = await sanityClient.fetch(`*[_type == "releaseWave"]`);

    return {
        props: {
            figure,
            set,
            terrain,
            print,
            character,
            faction,
            releaseWave,
        }
    };
}

export async function getFigureGridInfo(searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '', count: number = 32) {

    const searchString = searchFilter ? `&& mainName match $searchFilter || character[]->name match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    const results = await sanityClient.fetch(`*[_type == "figure" ${searchString} ${factionString} ${releaseWaveString}] | order(releaseWave->releaseDate desc, faction[0]->name, type, mainName, defined(image.asset) desc)[0...${count}] {
        _id,
        mainName,
        image,
        releaseWave->{name},
        faction[]->{name}
    }`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
    return results as DetailedFigure[];
}

export async function getGridInfo(type: string, searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '', count: number = 32) {

    const searchString = searchFilter ? `&& mainName match $searchFilter || character[]->name match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    return await sanityClient.fetch(`*[_type == "${type}" ${searchString} ${factionString} ${releaseWaveString}] | order(releaseWave->releaseDate desc, faction[0]->name, type, mainName, defined(image.asset) desc)[0...${count}] {
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
    }`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
}

export async function getFactions() {
    return await sanityClient.fetch(`*[_type == "faction"] | order(alignment desc, name asc)`) as Faction[];
}

export async function getReleaseWaves() {
    return await sanityClient.fetch(`*[_type == "releaseWave"] | order(releaseDate desc)`) as ReleaseWave[];
}

export async function getSets() {
    return await sanityClient.fetch(`*[_type == "set" && defined(image.asset)] {
        _id,
        mainName,
        image,
        releaseWave->{name},
        figures[]->{mainName, image, _id}
        }`) as Set[];
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
    race[]->{name},
    baseSize,
    alias
    }`, {id}) as DetailedFigure[];
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
    }`) as DetailedFigure[];
}