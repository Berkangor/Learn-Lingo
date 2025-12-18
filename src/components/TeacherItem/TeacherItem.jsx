import { useState } from "react";
import ShortInfo from "../ShortInfo/ShortInfo";
import css from "./TeacherItem.module.css";
import Reviews from "../Reviews/Reviews";
import LevelLanguages from "../LevelLanguages/LevelLanguages";
import BookTrial from "../BookTrial/BookTrial";

export default function TeachersItem({ teacher }) {
  const {
    id,
    avatar_url,
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    experience,
    reviews,
    levels,
  } = teacher;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <li className={css.item} key={id}>
      <ShortInfo teacher={teacher} />
      <img className={css.avatar} src={avatar_url} alt="Avatar" />
      <div>
        <p className={css.littleTitle}>Languages</p>
        <h2 className={css.name}>
          {name} {surname}
        </h2>
        <p className={css.littleTitle}>
          Speaks: <span className={css.descrLanguages}>{languages?.join(", ")}</span>
        </p>
        <p className={css.littleTitle}>
          Lessons info: <span className={css.descr}>{lesson_info}</span>
        </p>
        <p className={css.littleTitle}>
          Conditions: <span className={css.descr}>{conditions?.join("")}</span>
        </p>
        {isExpanded && (
          <>
            <p className={css.experience}>{experience}</p>
            <Reviews reviews={reviews} />
          </>
        )}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className={css.readMoreBtn}
          >
            Read more
          </button>
        )}
        <LevelLanguages levels={levels} />
        {isExpanded && (
          <button
            type="button"
            onClick={() => setIsBookOpen(true)}
            className={css.bookTrialBtn}
          >
            Book trial lesson
          </button>
        )}
        <BookTrial
          teacher={teacher}
          isBookOpen={isBookOpen}
          setIsBookOpen={setIsBookOpen}
        />
      </div>
    </li>
  );
}