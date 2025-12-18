import { useState } from "react";
import css from "./ThemeChanger.module.css";

export default function ThemeChanger({ setTheme }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleColorChange = (primaryColor, accentColor, newImage) => {
    
    setTheme((prev) => ({
      ...prev,
      primary: primaryColor,
      accent: accentColor,
      image: newImage,
    }));
  };

  return (
    <div
      className={css.themeContainer}
      style={{
        left: isVisible ? "0" : "-30px",
      }}
    >
      <div className={css.colorButtons}>
        <button
          onClick={() =>
            handleColorChange("#f4c550", "#fbe9ba", "/iMac/iMac-yellow.svg")
          }
        ></button>
        <button
          onClick={() =>
            handleColorChange(
              "#9fbaae",
              "#cbded3",
              "/iMac/iMac-lightBlue.svg"
            )
          }
        ></button>
        <button
          onClick={() =>
            handleColorChange(
              "#9fb7ce",
              "#bfd6ea",
              "/iMac/iMac-darkBlue.svg"
            )
          }
        ></button>
        <button
          onClick={() =>
            handleColorChange("#e0a39a", "#f2c0bd", "/iMac/iMac-red.svg")
          }
        ></button>
        <button
          onClick={() =>
            handleColorChange("#f0aa8d", "#f4c8ba", "/iMac/iMac-orange.svg")
          }
        ></button>
        <p className={css.textTheme}>Change theme</p>
      </div>

      <button className={css.closeBtn} onClick={() => setIsVisible(!isVisible)}>
        <svg width="16" height="14" >
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}