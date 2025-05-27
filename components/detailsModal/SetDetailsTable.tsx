import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {PrintFull, SetFull, AccessoryFull, TerrainFull} from "../../typings";

export function SetDetailsTable({set}: { set: SetFull | PrintFull | AccessoryFull | TerrainFull | undefined }) {
    return (
        <TableContainer component={Box}>
            <Table size="small" aria-label="simple table">
                <tbody>
                <DetailsTableRow header={'Main Name'} data={set?.mainName}/>
                <DetailsTableRow header={'Release Wave'} data={set?.releaseWave?.name}/>
                </tbody>
            </Table>
        </TableContainer>
    );
}
