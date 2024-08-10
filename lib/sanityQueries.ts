import {Faction, Figure, GridFigure, ReleaseWave} from "../typings";
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

    const results = await sanityClient.fetch(`*[_type == "figure" ${searchString} ${factionString} ${releaseWaveString}] | order( defined(image.asset) desc, type, character[]->name, faction[]->name, releaseWave-> name)[0...${count}] {mainName, image, releaseWave->{name}, faction[]->{name}}`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
    return results as GridFigure[];
}

export async function getFactions() {
    return await sanityClient.fetch(`*[_type == "faction"]`) as Faction[];
}

export async function getReleaseWaves() {
    return await sanityClient.fetch(`*[_type == "releaseWave"]`) as ReleaseWave[];
}

export async function getFigureDetails(id: string) {
    return await sanityClient.fetch(`*[_type == "figure" && _id == $id]`, {id}) as Figure;
}