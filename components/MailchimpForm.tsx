'use client'
//@ts-nocheck
import React, {useEffect, useState} from 'react';

let mailChimpHTMLContent: string;

mailChimpHTMLContent = '<div id="mc_embed_shell">\n' +
    '      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">\n' +
    '  <style type="text/css">\n' +
    '        #mc_embed_signup{ false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 500px;}\n' +
    '        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n' +
    '           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n' +
    '</style>\n' +
    '<div id="mc_embed_signup">\n' +
    '    <form action="https://app.us17.list-manage.com/subscribe/post?u=f18ce3fc44cd3f6e7478d303b&amp;id=1ef27549d2&amp;f_id=007200e3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">\n' +
    '        <div id="mc_embed_signup_scroll"><h2>Subscribe</h2>\n' +
    '            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n' +
    '            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""></div>\n' +
    '        <div id="mce-responses" class="clear foot">\n' +
    '            <div class="response" id="mce-error-response" style="display: none;"></div>\n' +
    '            <div class="response" id="mce-success-response" style="display: none;"></div>\n' +
    '        </div>\n' +
    '    <div aria-hidden="true" style="position: absolute; left: -5000px;">\n' +
    '        /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */\n' +
    '        <input type="text" name="b_f18ce3fc44cd3f6e7478d303b_1ef27549d2" tabindex="-1" value="">\n' +
    '    </div>\n' +
    '        <div class="optionalParent">\n' +
    '            <div class="clear foot">\n' +
    '                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" style="background-color: #374151" value="Subscribe">\n' +
    '                <p style="margin: 0px auto;"><a href="http://eepurl.com/iW4AaA" title="Mailchimp - email marketing made easy and fun"><span style="display: inline-block; background-color: black; border-radius: 4px;"><img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-light.svg" alt="Intuit Mailchimp" style="width: 220px; height: 40px; display: flex; padding: 2px 0px; justify-content: center; align-items: center;"></span></a></p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</form>\n' +
    '</div>\n' +
    '<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';fnames[3]=\'ADDRESS\';ftypes[3]=\'address\';fnames[4]=\'PHONE\';ftypes[4]=\'phone\';fnames[5]=\'BIRTHDAY\';ftypes[5]=\'birthday\';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>\n';

const MailchimpFormRaw = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className='border-2 rounded-lg border-gray-700' dangerouslySetInnerHTML={{ __html: mailChimpHTMLContent}}/>
    );
};

export default MailchimpFormRaw;