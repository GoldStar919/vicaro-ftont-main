import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
import { setCurrentLanguage } from '../redux/globalReducer';

function Language() {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState("en");

    const dispatch = useDispatch();

    const handleLangChange = evt => {
        const lang = evt.target.value;
        console.log(lang);
        setLanguage(lang);
        i18n.changeLanguage(lang);
        dispatch(setCurrentLanguage(lang));
    };

    return (
        <div className="px-4 m-auto">
            <select onChange={handleLangChange} value={language}>
                <option value="de">DE</option>
                <option value="en">EN</option>
            </select>
        </div>
    );
};

export default Language;
