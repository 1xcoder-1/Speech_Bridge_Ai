import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => (
  <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
    <IconLanguage size={20} className="text-gray-300 mr-2" />
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="bg-transparent text-white focus:outline-none cursor-pointer"
    >
      {languages.map((language) => (
        <option key={language} value={language} className="bg-gray-800 text-white">
          {language}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageSelector;