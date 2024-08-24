import MiniCardGrid from "../components/MiniCardGrid";
import {getFactions, getFigureGridInfo, getReleaseWaves} from "../lib/sanityQueries";
import Welcome from '../components/Welcome';
import Link from "next/link";
import Search from "../components/Search";
import {MenuItem, Select} from "@mui/material";
import {ClearFilters} from "../components/ClearFilters";

export default async function Home({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const searchFilter = typeof searchParams.searchFilter === 'string' ? searchParams.searchFilter : undefined;
    const factionFilter = typeof searchParams.factionFilter === 'string' ? searchParams.factionFilter : undefined;
    const releaseWaveFilter = typeof searchParams.releaseWaveFilter === 'string' ? searchParams.releaseWaveFilter : undefined;

    const figures = await getFigureGridInfo();
    const factions = await getFactions();
    const releaseWaves = await getReleaseWaves();

    // const inputStyle = "flex bg-gray-800 w-full h-12 text-lg pl-3 rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200 lg:w-90";
    // const labelStyle = "flex text-lg text-gray-400";
    // const groupStyle = "p-2";

    return (
        <div className="flex flex-col items-center mt-10 space-y-2 md:space-y-5 p-4">
            <Welcome/>
            {/*<div className="flex justify-center pt-16">*/}
            {/*    <form onSubmit={handleSubmit(data => console.log(data))} className="flex flex-col md:flex-row">*/}
            {/*        <div className={groupStyle}>*/}
            {/*            <label className={labelStyle}>Search</label>*/}
            {/*            <input {...register('searchTerm')} className={inputStyle}*/}
            {/*                   onChange={(e) => handleChange('searchTerm', e.target.value)} />*/}
            {/*        </div>*/}
            {/*        <div className={groupStyle}>*/}
            {/*            <label className={labelStyle}>Faction</label>*/}
            {/*            <select {...register('faction')} className={inputStyle}*/}
            {/*                    onChange={(e) => handleChange('faction', e.target.value)}>*/}
            {/*                <option key="" value=""></option>*/}
            {/*                {factions.map((faction) => (*/}
            {/*                    <option key={faction._id} value={faction.name}>{faction.name}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*        <div className={groupStyle}>*/}
            {/*            <label className={labelStyle}>Release Wave</label>*/}
            {/*            <select {...register('releaseWave')} className={inputStyle}*/}
            {/*                    onChange={(e) => handleChange('releaseWave', e.target.value)}>*/}
            {/*                <option key="" value=""></option>*/}
            {/*                {releaseWaves.map((releaseWave) => (*/}
            {/*                    <option key={releaseWave.name} value={releaseWave.name}>{releaseWave.name}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*        <div className="pt-10">*/}
            {/*            <input type="submit"*/}
            {/*                   className="h-10 w-24 rounded-lg bg-gray-700 text-lg transition duration-300 hover:bg-gray-600" />*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}

            <div
                className='flex flex-col lg:flex-row justify-center items-center p-2 space-y-4 lg:space-y-0 lg:space-x-10 w-full xl:w-2/3 border-2'>
                <Search searchFilter={searchFilter}/>

                <Select
                    variant='filled'
                    label='Faction'
                    className='flex bg-gray-800 text-white w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
                >
                    {factions.map((faction) => (
                        <MenuItem
                            value={faction.name}
                            key={faction._id}
                        >
                            <Link
                                href={{
                                    pathname: '/',
                                    query: {
                                        ...(searchFilter ? {searchFilter} : {}),
                                        factionFilter: `${faction.name}`,
                                        ...(releaseWaveFilter ? {releaseWaveFilter} : {}),
                                    }
                                }}
                            >
                                {faction.name}
                            </Link>
                        </MenuItem>
                        // <ul>
                        //     <Link
                        //         href={{
                        //             pathname: '/',
                        //             query: {
                        //                 ...(searchFilter ? {searchFilter} : {}),
                        //                 factionFilter: `${faction.name}`,
                        //                 ...(releaseWaveFilter ? {releaseWaveFilter} : {}),
                        //             }
                        //         }}
                        //     >
                        //         {faction.name}
                        //     </Link>
                        // </ul>
                    ))}
                </Select>
                <Select variant='outlined'
                        className='flex bg-gray-800 w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
                >
                    {releaseWaves.map((releaseWave) => (
                        <ul>
                            <Link
                                href={{
                                    pathname: '/',
                                    query: {
                                        ...(searchFilter ? {searchFilter} : {}),
                                        ...(factionFilter ? {factionFilter} : {}),
                                        releaseWaveFilter: `${releaseWave.name}`,
                                    }
                                }}
                            >
                                {releaseWave.name}
                            </Link>
                        </ul>
                    ))}
                </Select>
                <ClearFilters/>
            </div>
            <div className='flex flex-col'>
                <MiniCardGrid
                    figures={figures}
                    searchFilter={searchFilter || ''}
                    factionFilter={factionFilter || ''}
                    releaseWaveFilter={releaseWaveFilter || ''}
                    factions={factions}
                    releaseWaves={releaseWaves}
                />
            </div>
        </div>
    );
}