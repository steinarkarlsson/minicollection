// File: privacyPolicy.tsx

import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

const labelStyle = "text-lg text-gray-400";


const PrivacyPolicy = () => {
    return (
        <div className='flex h-screen bg-gradient-to-b lg:h-[140vh]} !h-screen'>
            {/*<Head>*/}
            {/*    <title>Mini Collection</title>*/}
            {/*    <link rel="icon" href="/icon.png"/>*/}
            {/*</Head>*/}
            <Header/>
        <div>
            <Head>
                <title>Privacy Policy</title>
            </Head>
            <main className=" relative text-lg text-gray-400">
                <p>Welcome to MiniCollection.app! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and app.</p>

                <p>2. Information We Collect</p>

                <p>Personal Information:</p>
                <p>When you log in with your Google account using oAuth, we collect your name and email address</p>

                Usage Data:
                We collect the collections you create

            </main>
        </div>
        </div>
    );
};

export default PrivacyPolicy;