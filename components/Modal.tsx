import MuiModal from '@mui/material/Modal';
import { modalState, figureState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import {Box, Grid, Table, TableContainer, Typography} from '@mui/material';
import Image from 'next/image';

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [figure] = useRecoilState(figureState);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>
                    <div
                        className="modal-container bg-gray-900 rounded shadow-lg z-50 overflow-y-auto m-5 lg:w-3/5 lg:h-3/5">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">{figure?.mainName}</p>
                            </div>
                            <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} className="flex justify-center">
                                    {figure && figure.image?.asset ? (
                                        <Image
                                            src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                                            alt={figure.mainName}
                                            width={600}
                                            height={600}
                                            style={{ objectFit: 'contain', width: '300px', height: '400px' }}
                                        />
                                    ) : null}
                                </Grid>
                                    <Grid item xs={6}>
                                        <TableContainer component={Box}>
                                            <Table size="small" aria-label="simple table">
                                                <tbody>
                                                <tr>
                                                    <td className="text-lg font-bold">Main Name</td>
                                                    <td className="text-md">{figure?.mainName}</td>
                                                </tr>
                                                {/*<tr>*/}
                                                {/*    <td className="text-lg font-bold">Type</td>*/}
                                                {/*    <td className="text-md">{figure?.type}</td>*/}
                                                {/*</tr>*/}
                                                {/*<tr>*/}
                                                {/*    <td className="text-lg font-bold">Material(s)</td>*/}
                                                {/*    <td className="text-md">{figure?.material}</td>*/}
                                                {/*</tr>*/}
                                                {/*<tr>*/}
                                                {/*    <td className="text-lg font-bold">Character(s)</td>*/}
                                                {/*    <td className="text-md">{figure?.character}</td>*/}
                                                {/*</tr>*/}
                                                <tr>
                                                    <td className="text-lg font-bold">Factions</td>
                                                    <td className="text-md">
                                                        {figure?.faction?.map((faction, index) => (
                                                            <Typography key={index}>{faction.name}</Typography>
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg font-bold">Release Wave</td>
                                                    <td className="text-md">{figure?.releaseWave?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg font-bold">Included in sets</td>
                                                    <td className="text-md"></td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </TableContainer>

                                        {/*<Grid container spacing={2}>*/}
                                        {/*    <Grid item xs={6}>*/}
                                        {/*        <div className="text-lg font-bold border-2">Factions</div>*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid item xs={6}>*/}
                                        {/*    <div className="text-md border-2">*/}
                                        {/*        {figure?.faction?.map((faction, index) => (*/}
                                        {/*            <Typography key={index}>{faction.name}</Typography>*/}
                                        {/*        ))}*/}
                                        {/*    </div>*/}
                                        {/*    </Grid>*/}

                                        {/*    <Grid item xs={6}>*/}
                                        {/*        <div className="text-lg font-bold border-2">Release Wave</div>*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid>*/}
                                        {/*        <div className="text-md border-2">{figure?.releaseWave?.name}</div>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                    </Grid>
                            </Grid>
                            </Box>

                            <div className="mt-4 flex justify-end">
                                <button
                                    className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
                                    onClick={handleClose}>Close
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        </MuiModal>
    );
}

export default Modal;