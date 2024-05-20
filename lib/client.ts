import {createClient} from "next-sanity";

export const client = createClient(
    {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID as string,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
        apiVersion: "2023-06-12",
        useCdn: false
    }
);