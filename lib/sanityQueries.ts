import {createClient} from "next-sanity";
import {Faction, Figure, GridFigure, ReleaseWave} from "../typings";

export const client = createClient(
    {
        projectId: '4llymfg7',
        dataset: 'production',
        apiVersion: "2023-06-12",
        useCdn: false
    }
);

export async function getAllCollections() {
    const figure = await client.fetch(`*[_type == "figure"]`);
    const set = await client.fetch(`*[_type == "set"]`);
    const terrain = await client.fetch(`*[_type == "terrain"]`);
    const print = await client.fetch(`*[_type == "print"]`);
    const character = await client.fetch(`*[_type == "character"]`);
    const faction = await client.fetch(`*[_type == "faction"]`);
    const releaseWave = await client.fetch(`*[_type == "releaseWave"]`);

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

export async function getFigureGridInfo(searchFilter: string = '', factionFilter: string = '', releaseWaveFilter: string = '') {

    const searchString = searchFilter ? `&& mainName match $searchFilter` : ``;
    const factionString = factionFilter ? `&& $factionFilter in faction[]->name` : ``;
    const releaseWaveString = releaseWaveFilter ? `&& releaseWave->name== $releaseWaveFilter` : ``;

    const results = await client.fetch(`*[
            _type == "figure" 
            ${searchString}
            ${factionString} 
            ${releaseWaveString}
            ] | order(releaseWave-> {name}) 
            {
                mainName, 
                image, 
                releaseWave->{name}, 
                faction[]->{name}}`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter
    });
    return results as GridFigure[];
}

export async function getFactions() {
    return await client.fetch(`*[_type == "faction"]`) as Faction[];
}

export async function getReleaseWaves() {
    return await client.fetch(`*[_type == "releaseWave"]`) as ReleaseWave[];
}

export async function getFigureDetails(id: string) {
    return await client.fetch(`*[_type == "figure" && _id == $id]`, {id}) as Figure;
}