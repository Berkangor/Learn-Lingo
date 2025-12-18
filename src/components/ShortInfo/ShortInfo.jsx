
import Favorite from "../Favorite/Favorite";
import css from "./ShortInfo.module.css";

export default function ShortInfo({ teacher }) {

  return (
    <div className={css.wrapperShortInfo}>
      <div className={css.wrapper}>
        <svg width="16" height="16" className={css.bookIcon}>
          <use href="/sprite.svg#icon-book"></use>
        </svg>
        <p>Lessons online</p>
      </div>
      <hr className={css.line}/>

      <p>Lessons done: {teacher.lessons_done}</p>
      <hr className={css.line}/>
      <div className={css.wrapper}>
        <svg width="20" height="20" className={css.starIcon}>
          <use href="/sprite.svg#icon-star"></use>
        </svg>
        <p>Rating: {teacher.rating}</p>
      </div>
      <hr className={css.line}/>
      <p>
        Price / 1 hour: <span className={css.accent}>{teacher.price_per_hour}$</span>
      </p>
     <Favorite teacher={teacher}/>
    </div>
  );
}