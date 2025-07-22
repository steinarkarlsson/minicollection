export const pageConfigs = {
    accessories: {
        title: "Accessories",
        filters: ["releaseWave"],
        query: `*[_type == "terrain"]{_id, name, releaseWave, ...}`,
    },
    miniatures: {
        title: "Miniatures",
        filters: ["faction", "releaseWave", "race", "character","type", "material"],
        query: `*[_type == "miniature"]{_id, name, faction, releaseWave, ...}`,
    },
    print: {
        title: "Print",
        filters: ["releaseWave"],
        query: `*[_type == "print"]{_id, name, releaseWave, ...}`,
    },
    sets: {
        title: "Sets",
        filters: ["releaseWave"],
        query: `*[_type == "set"]{_id, name, releaseWave, ...}`,
    },
    terrain: {
        title: "Terrain",
        filters: ["releaseWave"],
        query: `*[_type == "terrain"]{_id, name, releaseWave, ...}`,
    },
};