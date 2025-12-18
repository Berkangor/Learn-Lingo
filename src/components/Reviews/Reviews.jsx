import css from "./Reviews.module.css";
import { VscAccount } from "react-icons/vsc";

export default function Reviews({ reviews }) {

  return (
    <ul className={css.reviewsList}>
      {reviews.map((review, index) => (
        <li key={index} className={css.reviewItem}>
          <div className={css.reviewerBox}>
            <VscAccount className={css.userIcon} />
            <div>
              <p className={css.name}>{review.reviewer_name}</p>
              <div className={css.ratingBox}>
                <svg width="20" height="20" className={css.starIcon}>
                  <use href="/sprite.svg#icon-star"></use>
                </svg>
                <p>{`${review.reviewer_rating}.0`}</p>
              </div>
            </div>
          </div>
          <p>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}