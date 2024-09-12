import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {DetailedFigure} from "../../types";
import {useRouter} from "next/navigation";

function DetailsTable({figure}: { figure: DetailedFigure | undefined }) {

    const raceNames = figure?.race?.map(race => race.name) || [];

    const router = useRouter();

    const handleClick = (filter:string, name: string) => {
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
                <DetailsTableRow header={figure?.character?.length === 1 ? 'Character' : 'Characters'}
                                 data={figure?.character?.map(character => (
                                     <span key={character.name} onClick={() => handleClick('searchFilter', character.name)} className="text-blue-500 hover:underline cursor-pointer">
                                         {character.name}
                                     </span>
                                 )).reduce((prev, curr) => [prev, ', ', curr])}/>
                <DetailsTableRow header={'Factions'} data={figure?.faction?.map((faction) => faction.name).join(', ')}/>
                <DetailsTableRow header={'Release Wave'} data={figure?.releaseWave?.name}/>
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