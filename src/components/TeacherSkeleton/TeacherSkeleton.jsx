import css from "./TeacherSkeleton.module.css";

export const TeacherSkeleton = () => {
  return (
    <div className={css.skeletonItem}>
      <div className={css.skeletonAvatar}></div>
      <div className={css.skeletonContent}>
        <div className={css.skeletonTitle}></div>
        <div className={css.skeletonText}></div>
        <div className={css.skeletonText} style={{ width: '80%' }}></div>
        <div className={css.skeletonText} style={{ width: '60%' }}></div>
        <div className={css.skeletonButton}></div>
      </div>
    </div>
  );
};