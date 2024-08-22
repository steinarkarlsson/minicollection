import MailchimpForm from './MailchimpForm';

const Welcome: React.FC = () => {
    return (
        <div className="lg:flex lg:justify-center lg:items-center">
        <div className="text-center pt-28">
            <h1 className="header text-2xl lg:text-4xl lg:mb-5">Welcome to the MESBG Collection Database</h1>
            <div className="flex flex-col lg:flex-row container justify-center align-center border-2 lg:rounded-xl border-gray-700 lg:h-56">
                <div className="flex justify-center items-center">
                    <p className="flex lg:text-start align-top text-md lg:text-xl p-5 pb-0">
                        This database is a comprehensive resource made for collectors of Middle-earth Strategy
                        Battle Game
                        miniatures.<br/><br/>
                        We are continually adding new content and features, so if you’d like to be notified when new
                        features are available, please sign up to the mailing list.
                    </p>
                </div>
                <div className="flex">
                    <MailchimpForm/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Welcome;