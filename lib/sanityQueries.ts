import {createClient} from "next-sanity";
import {Figure} from "../typings";

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

export async function getFigureGridInfo() {
    const results = await client.fetch(`*[_type == "figure" ]{mainName, image, releaseWave->{name}, faction->{name}}`);
    return results as Figure[];
}