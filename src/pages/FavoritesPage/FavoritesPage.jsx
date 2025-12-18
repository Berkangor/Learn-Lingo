import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./FavoritesPage.module.css"
import { useAuth } from "../../components/Context/AuthContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../api/firebase";
import useTeachers from "../../api/useTeachers";

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const allTeachers = useTeachers();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const favRef = ref(db, `users/${currentUser.uid}/favorites`);
    const unsubscribe = onValue(favRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFavorites(Object.keys(data));
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const favoriteTeachers = allTeachers.filter((teacher) => {
    return teacher?.id && favorites.includes(String(teacher.id));
  });

  return (
    <>
      <Header />
      <div className={`container ${css.favoritesPageContainer}`}>
        <TeachersList teachers={favoriteTeachers} />
      </div>
    </>
  );
};

export default FavoritesPage;