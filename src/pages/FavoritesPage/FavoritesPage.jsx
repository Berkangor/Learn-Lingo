import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header";
import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./FavoritesPage.module.css";
import { useAuth } from "../../components/Context/AuthContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../api/firebase";
import useTeachers from "../../api/useTeachers";
import { TeacherSkeleton } from "../../components/TeacherSkeleton/TeacherSkeleton";

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const allTeachers = useTeachers();
  const [favorites, setFavorites] = useState(null); 

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

  const isLoading = !allTeachers || favorites === null;

  const favoriteTeachers = useMemo(() => {
    if (isLoading) return [];
    return allTeachers.filter((teacher) => {
      return teacher?.id && favorites.includes(String(teacher.id));
    });
  }, [allTeachers, favorites, isLoading]);

  return (
    <>
      <Header />
      <div className={`container ${css.favoritesPageContainer}`}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
            {[...Array(3)].map((_, i) => (
              <TeacherSkeleton key={i} />
            ))}
          </div>
        ) : favoriteTeachers.length > 0 ? (
          <TeachersList teachers={favoriteTeachers} />
        ) : (
          <div className={css.emptyState}>
            <h2>Your favorites list is empty</h2>
            <p>You haven't added any tutors to your favorites yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;