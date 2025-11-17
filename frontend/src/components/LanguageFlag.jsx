import { LANGUAGE_TO_FLAG } from "../constants";

const LanguageFlag = ({ language, showText = false, text = "" }) => {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <span className="inline-flex items-center">
                <img
                    src={`https://flagcdn.com/24x18/${countryCode}.png`}
                    alt={`${langLower} flag`}
                    className="h-3 mr-1 inline-block"
                />
                {showText && text && <span>{text}</span>}
            </span>
        );
    }
    return null;
};

export default LanguageFlag;