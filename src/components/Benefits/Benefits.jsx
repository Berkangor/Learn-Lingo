import css from "./Benefits.module.css";

export default function Benefits() {
  return (
    <div className={`section ${css.benefitsContainer}`}>
      <ul className={css.list}>
        <li className={css.item}>
          <h3 className={css.titleBenefits}>32,000 +</h3>
          <p className={css.descrBenefits}>Experienced tutors</p>
        </li>
        <li className={css.item}>
          <h3 className={css.titleBenefits}>300,000 +</h3>
          <p className={css.descrBenefits}>5-star tutor reviews</p>
        </li>
        <li className={css.item}>
          <h3 className={css.titleBenefits}>120 +</h3>
          <p className={css.descrBenefits}>Subjects taught</p>
        </li>
        <li className={css.item}>
          <h3 className={css.titleBenefits}>200 +</h3>
          <p className={css.descrBenefits}>Tutor nationalities</p>
        </li>
      </ul>
    </div>
  );
}