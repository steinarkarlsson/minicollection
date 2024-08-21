import React, {useEffect} from 'react';

function GoogleSignIn() {


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div id="g_id_onload"
                 data-client_id={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                 data-login_uri={`${process.env.NEXTAUTH_URL}`}
                 // data-auto_prompt="false"
            >
            </div>
            <div className="g_id_signin"
                 data-type="standard"
                 data-size="large"
                 data-theme="outline"
                 data-text="sign_in_with"
                 data-shape="rectangular"
                 data-logo_alignment="left">
            </div>
        </div>
    );
}

export default GoogleSignIn;