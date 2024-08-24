import MailchimpForm from "./MailchimpForm";

const Welcome: React.FC = () => {
    return (
        <div className="lg:flex lg:justify-center lg:items-center">
            <div className="text-center pt-12">
                <h1 className="header text-2xl lg:text-4xl lg:mb-5">Welcome to the MESBG Collection Database</h1>
                <div
                    className="flex flex-row container justify-center align-center mb-20">
                    <div className="flex justify-center items-center">
                        <p className="flex lg:text-start align-top text-md lg:text-xl p-5 pb-0">
                            This database is a comprehensive resource made for collectors of Middle-earth Strategy
                            Battle Game
                            miniatures.<br/><br/>
                            We are continually adding new content and features, so if you’d like to be notified when new
                            features are available, please sign up to the mailing list.
                        </p>
                    </div>
                    <div className="flex justify-center text-white items-center">
                        <MailchimpForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;