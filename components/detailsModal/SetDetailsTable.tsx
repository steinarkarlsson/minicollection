import {Box, Table, TableContainer} from "@mui/material";
import DetailsTableRow from './DetailsTableRow';
import {Set} from "../../typings";

export default function SetDetailsTable({set}: { set: Set | null }) {
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
