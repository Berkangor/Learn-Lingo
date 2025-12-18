import { useNavigate } from "react-router-dom";
import css from "./Hero.module.css";


export default function Hero({ image }) {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/teachers");
  };
  
  return (
    <div className={`section ${css.heroContainer}`}>
      <div className={css.firstContainer}>
        <h1 className={css.title}>
          Unlock your potential with the best{" "}
          <span className={css.titleAccent}>language</span> tutors
        </h1>
        <p className={css.descr}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <button type="button" onClick={handleButtonClick} className={css.btn}>
          Get started
        </button>
      </div>
      <div className={css.secondContainer}>
        <img className={css.womanImage} src="/woman.svg" alt="woman" />
        <img
          className={css.iMacImage}
          src={image}
          alt="iMac"
        />
      </div>
    </div>
  );
}