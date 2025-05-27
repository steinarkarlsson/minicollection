//@ts-nocheck
'use client'
import {AccessoryFull, Edition, Faction, FigureFull, PrintFull, ReleaseWave, SetFull, TerrainFull} from "../typings";
import Card from "./Card";
import Title from "./gridComponents/Title";

interface GenericGridProps {
    type: 'miniature' | 'set' | 'terrain' | 'print' | 'accessory'
    items: FigureFull[] | SetFull[] | TerrainFull[] | PrintFull[] | AccessoryFull[]
    grouping: ReleaseWave[] | Faction[] | Edition[]
    groupBy: 'releaseWave' | 'faction' | 'edition'
}

export function GroupedGrid({type, items, grouping, groupBy}: GenericGridProps) {

    const detail1 =
        type === 'miniature' ? 'faction' :
            type === 'set' ? 'releaseWave' :
                type === 'print' ? 'releaseWave' :
                    type === 'accessory' ? 'releaseWave' :
                        null;

    const detail2 =
        type === 'miniature' ? 'releaseWave' :
            type === 'print' ? 'edition' :
                type === 'terrain' ? 'releaseWave' :
                null;

    const name =
        type === 'miniature' ||
        type === 'accessory' ||
        type === 'set' ||
        type === 'terrain' ||
        type === 'print'
            ? 'mainName' : 'name';

    function checkIfItemInGroup(item: FigureFull | SetFull | TerrainFull | PrintFull | AccessoryFull, group: ReleaseWave | Faction | Edition, groupBy: 'releaseWave' | 'faction' | 'edition') {
        const groupValue = item[groupBy];
        if (Array.isArray(groupValue)) {
            return groupValue.some(obj => obj.name === group.name);
        }
        return groupValue?.name === group.name;
    }

    return (
        <div className="flex flex-row flex-wrap">
            {grouping.map((group) => (
                items.some(item => checkIfItemInGroup(item, group, groupBy)) ? (
                        <div key={type+'-'+group.name} className="flex flex-col">
                            <Title label={group.name}/>
                            <div className="flex flex-wrap">
                                {items.map((item) => {
                                // Handle array of objects (like faction)
                                    if (Array.isArray(item[groupBy])) {
                                        return (item[groupBy] as {name: string}[]).some(obj => obj.name === group.name) ?
                                                <Card
                                                key={`${group.name}-${item._id}-${groupBy}`}
                                                type={type}
                                                name={item[name]}
                                                image={item.image}
                                                detail1={item[detail1]}
                                                detail2={item[detail2]}
                                                id={item._id}
                                            />
                                            : null;
                                    }
                                    // Handle single object (like releaseWave)
                                    else {
                                        return item[groupBy]?.name === group.name ?
                                            <Card
                                                type={type}
                                                key={`${group.name}-${item._id}-${groupBy}`}
                                                name={item[name]}
                                                image={item.image}
                                                //@ts-nocheck
                                                detail1={item[detail1]}
                                                //@ts-nocheck
                                                detail2={item[detail2]}
                                                id={item._id}
                                            />
                                            : null;
                                    }
                                })}
                            </div>
                        </div>
                    ) : null
            ))}
        </div>
    )
}