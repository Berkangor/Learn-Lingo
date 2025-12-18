import {  ref, set, remove } from "firebase/database";
import { db, auth } from "./firebase";


export const addFavoriteTeacher = (teacherId) => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    set(ref(db, `users/${userId}/favorites/${teacherId}`), true)
      .then(() => console.log("Teacher added to favorites"))
      .catch((error) => console.error("Error adding favorite:", error));
  }
};

export const removeFavoriteTeacher = (teacherId) => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    remove(ref(db, `users/${userId}/favorites/${teacherId}`))
      .then(() => console.log("Teacher removed from favorites"))
      .catch((error) => console.error("Error removing favorite:", error));
  }
};