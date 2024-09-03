
const headerStyle = 'text-4xl font-bold';
const paragraphStyle = 'pl-8';
const indentStyle = 'pl-16';

export default function Privacy () {
    return (
        <div className='flex h-screen bg-gradient-to-b lg:h-[140vh]} !h-screen'>
            <div className='space-y-8'>
                <p className='text-5xl font-bold'>Privacy Policy</p>

                <p>Effective Date: 3 September 2024</p>

                <p className={headerStyle}>Personal Information:</p>
                <p className={paragraphStyle}>This Privacy Policy outlines how MiniCollection ("we," "our," or "us") accesses, uses, stores, and
                    shares information when you use our services. This policy, together with our product-specific
                    privacy disclosures, explains how we handle your information when you use Google as an OAuth
                    provider.</p>

                <p className={headerStyle}>Information We Collect</p>
                <p className={paragraphStyle}>When you log in to MiniCollection using your Google account, we collect the following
                    information from your Google profile:</p>
                <p className={indentStyle}>1. Primary Google Account Email Address: This is the email address associated with your
                    Google account.</p>
                <p className={indentStyle}>2. Personal Information: This includes your name, profile picture, and any other
                    personal information you have made publicly available on your Google account.</p>

                <p className={headerStyle}>How We Use Your Information</p>
                <p className={paragraphStyle}>The information we collect from your Google account is used solely for account creation and authentication by MiniCollection. Specifically, we use your Google account email address and profile picture on account creation </p>

                <p className={headerStyle}>How We Store Your Information</p>
                <p className={paragraphStyle}>All information collected through your Google account is securely stored in accordance with industry standards. We implement various security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>

                <p className={headerStyle}>Contact Us</p>
                <p className={paragraphStyle}>If you have any questions or concerns about this Privacy Policy, please contact us at steinar@minicollection.app.</p>
            </div>
        </div>
    );
};