import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {DetailedFigure} from "../../types";
import {useRouter} from "next/navigation";
import React from "react";

function DetailsTable({figure}: { figure: DetailedFigure | undefined }) {

    const raceNames = figure?.race?.map(race => race.name) || [];

    const router = useRouter();

    const handleClick = (filter: string, name: string) => {
        if (name) {
            router.push(`/miniatures/?${filter}=${name}`);
        } else {
            router.push('');
        }
    };

    return (
        <TableContainer component={Box}>
            <Table size="small" aria-label="simple table">
                <tbody>
                <DetailsTableRow header={'Name'} data={figure?.mainName}/>
                <DetailsTableRow header={figure?.material?.length === 1 ? 'Material' : 'Materials'}
                                 data={figure?.material?.join(', ')}/>
                <DetailsTableRow
                    header={figure?.character?.length === 1 ? 'Character' : 'Characters'}
                    data={React.Children.toArray(
                        figure?.character?.map(character => (
                            <span
                                key={character.name}
                                onClick={() => handleClick('searchFilter', character.name)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                {character.name}
                            </span>
                        ))
                    ).reduce((prev, curr) => [prev, prev  ? ', ' : ''  , curr], '') as unknown as string}/>
                <DetailsTableRow
                    header={figure?.faction?.length === 1 ? 'Faction' : 'Factions'}
                    data={React.Children.toArray(
                        figure?.faction?.map(faction => (
                            <span
                                key={faction.name}
                                onClick={() => handleClick('factionFilter', faction.name)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                {faction.name}
                            </span>
                        ))
                    ).reduce((prev, curr) => [prev, prev  ? ', ' : ''  , curr], '') as unknown as string}/>
                <DetailsTableRow header={'Release Wave'} data={
                    <span
                    key={figure?.releaseWave?.name}
                    onClick={() => handleClick('releaseWaveFilter', figure?.releaseWave?.name || '')}
                    className="text-blue-500 hover:underline cursor-pointer"
                    >
                                {figure?.releaseWave?.name}
                            </span> as unknown as string
                }
                />
                <DetailsTableRow header={'Material'} data={figure?.material?.join(', ')}/>
                <DetailsTableRow header={'Type'} data={figure?.type}/>
                <DetailsTableRow header={'Alias'} data={figure?.alias}/>
                <DetailsTableRow header={'Base Size'} data={figure?.baseSize}/>
                <DetailsTableRow header={'Race'} data={raceNames.join(', ')}/>
                </tbody>
            </Table>
        </TableContainer>
    );
}

export default DetailsTable;