import TeachersItem from "../TeacherItem/TeacherItem";
import css from "./TeachersList.module.css";

export default function TeachersList({ teachers }) {
  return (
    <>
  
         {teachers.length !== 0 ? (
        <ul className={css.list}>
          {teachers.map((teacher, index) => (
            <TeachersItem key={`${teacher.id}-${index}`} teacher={teacher} />
          ))}
        </ul>
      ) :(
        <div className={css.noFoundBox}>
          <h3>Ooops!</h3>
          <p>No teachers found. Change your filters.</p>
        </div>
      )  }
    </>
  );
}