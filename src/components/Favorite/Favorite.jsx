import { useEffect, useState } from "react";
import {
  addFavoriteTeacher,
  removeFavoriteTeacher,
} from "../../api/FavoritesTeacher";
import css from "./Favorite.module.css";
import { onValue, ref } from "firebase/database";
import { useAuth } from "../Context/AuthContext";
import { db } from "../../api/firebase";
import ModalAlert from "../ModalAlert/ModalAlert";

export default function Favorite({ teacher }) {
  const { currentUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const favRef = ref(db, `users/${currentUser.uid}/favorites/${teacher.id}`);
    onValue(favRef, (snapshot) => setIsFavorite(snapshot.exists()));
  }, [teacher.id, currentUser]);


  
  const toggleFavorite = () => {
    if (!currentUser) return;
    if (isFavorite) {
      removeFavoriteTeacher(teacher.id, currentUser.uid);
    } else {
      addFavoriteTeacher(teacher.id, currentUser.uid);
    }
  };
  return (
    <>
      <button
        className={
          css.heartBtn
        }
      onClick={currentUser ?  toggleFavorite  : ()=>{setIsModalAlertOpen(true)} }
      type="button"
    >
      <svg
        width="26"
        height="26"
         className={
          !isFavorite ? css.heartIcon : `${css.heartIcon} ${css.heartColor}`
        }
      >
        <use href="/sprite.svg#icon-heart"></use>
      </svg>
    </button>
      <ModalAlert isModalAlertOpen={isModalAlertOpen} setIsModalAlertOpen={setIsModalAlertOpen} />
      </>
  );
}