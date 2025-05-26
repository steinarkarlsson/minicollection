import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {Print, Set, Accessory, Terrain} from "../../typings";

export function SetDetailsTable({set}: { set: Set | Print | Accessory | Terrain | undefined }) {
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
