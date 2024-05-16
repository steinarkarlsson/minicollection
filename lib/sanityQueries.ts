import {createClient} from "next-sanity";
import {GridFigure, Figure} from "../typings";

export const client = createClient(
    {
        projectId: process.env.SANITY_PROJECTID,
        dataset: process.env.SANITY_DATASET,
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

export async function getFigureGridInfo(searchFilter?: string, factionFilter?: string, releaseWaveFilter?: string) {

    searchFilter = 'númenor';
    factionFilter = 'Númenor';
    releaseWaveFilter = 'The Fellowship of the Ring (2001)';

    const results = await client.fetch(`*[
            _type == "figure" 
            && mainName match $searchFilter
            && $factionFilter in faction[]->name 
            && releaseWave->name== $releaseWaveFilter
            ] | order(releaseWave-> {name}) 
            {
                mainName, 
                image, 
                releaseWave->{name}, 
                faction[]->{name}}`, {
        searchFilter,
        factionFilter,
        releaseWaveFilter,
    });
    console.log(results)
    return results as GridFigure[];
}

export async function getFigureDetails(id: string) {
    const figure = await client.fetch(`*[_type == "figure" && _id == $id]`, {id});
    return figure as Figure;
}