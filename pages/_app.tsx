import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import React from 'react';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp