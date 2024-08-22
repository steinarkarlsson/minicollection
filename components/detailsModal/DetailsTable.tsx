import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {Figure} from "../../typings";
function DetailsTable({figure}: {figure : Figure | null }) {
    return (
        <TableContainer component={Box}>
            <Table size="small" aria-label="simple table">
                <tbody>
                <DetailsTableRow header={'Main Name'} data={figure?.mainName}/>
                <DetailsTableRow header={figure?.material?.length === 1 ? 'Material' : 'Materials'} data={figure?.material?.join(', ')}/>
                <DetailsTableRow header={figure?.character?.length === 1 ? 'Character' : 'Characters'} data={figure?.character?.map(character => character.name).join(', ')}/>
                <DetailsTableRow header={'Factions'} data={figure?.faction?.map((faction) => faction.name).join(', ')}/>
                <DetailsTableRow header={'Release Wave'} data={figure?.releaseWave?.name}/>
                </tbody>
            </Table>
        </TableContainer>
    );
}
export default DetailsTable;