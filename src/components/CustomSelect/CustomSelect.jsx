import { useState } from "react";
import css from "./CustomSelect.module.css";

export default function CustomSelect({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={css.selectWrapper}>
      <div
        className={css.select}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption}</span>
        <span className={css.arrow}></span>
      </div>

      {isOpen && (
        <ul className={css.dropdown} role="listbox">
          {options.map((option, index) => (
            <li
              key={index}
              className={`${css.option} ${
                selectedOption === option ? css.selected : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}