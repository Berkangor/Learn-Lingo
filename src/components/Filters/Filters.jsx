import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import css from "./Filters.module.css";
import { useEffect } from "react";

export default function Filters({ onFilter }) {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const languages = [
    "All",
    "Türkçe",
    "French",
    "English",
    "German",
    "Polish",
  ];
  const level = [
    "All",
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
  ];
  const price = ["All", "10", "20", "30", "40"];
  useEffect(() => {
    const filterData = {
      selectedLanguage,
      selectedLevel,
      selectedPrice,
    };
    onFilter(filterData);
  },  [selectedLanguage, selectedLevel, selectedPrice, onFilter]);

  return (
    <div className={css.form}>
      <div className={css.select}>
        <p className={css.label}>Languages</p>
        <CustomSelect
          options={languages}
          value={selectedLanguage}
          onSelect={setSelectedLanguage}
        />
      </div>
      <div className={css.select}>
        <p className={css.label}>Level of knowledge</p>
        <CustomSelect
          options={level}
          value={selectedLevel}
          onSelect={setSelectedLevel}
        />
      </div>
      <div className={css.select}>
        <p className={css.label}>Price</p>
        <CustomSelect
          options={price.map((p) => (p === "All" ? p : `${p} $`))}
          value={selectedPrice}
          onSelect={setSelectedPrice}
        />
      </div>
    </div>
  );
}