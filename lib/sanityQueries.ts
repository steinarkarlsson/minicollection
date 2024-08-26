import {Faction, Figure, GridFigure, ReleaseWave, Set} from "../typings";
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
    return results as GridFigure[];
}

export async function getGridInfo(type: string, searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '', count: number = 32) {

    const searchString = searchFilter ? `&& mainName match $searchFilter || character[]->name match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    const results = await sanityClient.fetch(`*[_type == "${type}" ${searchString} ${factionString} ${releaseWaveString}] | order(releaseWave->releaseDate desc, faction[0]->name, type, mainName, defined(image.asset) desc)[0...${count}] {
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
    return results;
}

export async function getFactions() {
    return await sanityClient.fetch(`*[_type == "faction"] | order(alignment desc, name asc)`) as Faction[];
}

export async function getReleaseWaves() {
    return await sanityClient.fetch(`*[_type == "releaseWave"] | order(releaseDate desc)`) as ReleaseWave[];
}

export async function getSets() {
    return await sanityClient.fetch(`*[_type == "set"] | order(defined(image.asset) desc) {
        _id,
        mainName,
        image,
        releaseWave->{name},
        }`) as Set[];
}

export async function getFigureDetails(_id: string) {
    return await sanityClient.fetch(`*[_type == "figure" && _id == $_id]{
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
    }`, {_id}) as Figure[];
}