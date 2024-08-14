import React, {useEffect, useState} from 'react';

const MailchimpForm = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className='flex' id="mc_embed_shell">
            <div id="mc_embed_signup">
                <form
                    action="https://app.us17.list-manage.com/subscribe/post?u=f18ce3fc44cd3f6e7478d303b&amp;id=1ef27549d2&amp;f_id=007200e3f0"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                    className="flex justify-center validate rounded-lg p-5" target="_blank">
                    <div id="flex flex-row container mc_embed_signup_scroll">
                        <div className="flex mc-field-group">
                            <label htmlFor="mce-EMAIL">Email Address</label>
                            <input type="email" name="EMAIL" className="required email flex bg-gray-800 w-full h-12 rounded-md hover:bg-gray-700 transition duration-200 lg:w-90
                      " id="mce-EMAIL" required/>
                        </div>

                        <div id="mce-responses" className="flex clear foot">
                            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                        </div>

                        <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}} className="flex ">
                            <input type="text" name="b_f18ce3fc44cd3f6e7478d303b_1ef27549d2" value=""/>
                        </div>

                        <div className="flex optionalParent mt-5">
                            <div className="clear foot">
                                <input type="submit" name="subscribe" id="mc-embedded-subscribe"
                                       className="flex justify-center items-center h-10 w-24 rounded-lg bg-gray-700 text-md transition duration-300 hover:bg-gray-600"
                                       value="Subscribe"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
            <script type="text/javascript">
                {`
                (function($) {
                    window.fnames = new Array();
                    window.ftypes = new Array();
                    fnames[0] = 'EMAIL';
                    ftypes[0] = 'email';
                    fnames[1] = 'FNAME';
                    ftypes[1] = 'text';
                    fnames[2] = 'LNAME';
                    ftypes[2] = 'text';
                    fnames[3] = 'ADDRESS';
                    ftypes[3] = 'address';
                    fnames[4] = 'PHONE';
                    ftypes[4] = 'phone';
                    fnames[5] = 'BIRTHDAY';
                    ftypes[5] = 'birthday';
                }(jQuery));
                var $mcj = jQuery.noConflict(true);
                `}
            </script>
        </div>
    );
};

export default MailchimpForm;