import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { myTeacher } from "./deneme";

const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const teachersRef = ref(db, "/");

    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Firebase teachers snapshot:", data);

        if (!data) {
          setTeachers([myTeacher]);
          return;
        }

        const teachersArray = Array.isArray(data)
          ? data.map((teacher, index) => ({
              id: index,
              ...teacher
            }))
          : Object.entries(data).map(([id, teacher]) => ({
              id,
              ...teacher
            }));

        const extendedTeachers = [myTeacher, ...teachersArray];

        setTeachers(extendedTeachers);
      },
      (error) => {
        console.error("Firebase teachers error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return teachers;
};

export default useTeachers;
