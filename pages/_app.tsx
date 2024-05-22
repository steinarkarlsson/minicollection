import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import React from 'react';
import {SpeedInsights} from "@vercel/speed-insights/next";

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
            <SpeedInsights/>
        </RecoilRoot>
    );
};

export default MyApp;