import css from "./LevelLanguages.module.css";

export default function LevelLanguages({ levels }) {

  return (
    <ul className={css.levelList}>
      {levels.map((level, index) => (
        <li key={index} className={css.levelItem}>
              <p>{level}</p>
        </li>
      ))}
    </ul>
  );
}