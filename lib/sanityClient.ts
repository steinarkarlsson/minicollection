import {createClient} from "next-sanity";

export const sanityClient = createClient(
    {
        projectId: '4llymfg7',
        dataset: 'production',
        apiVersion: "2023-06-12",
        useCdn: false
    }
);