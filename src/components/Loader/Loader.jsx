import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ text = "Yükleniyor..." }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <div className={styles.spinner}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Loader;