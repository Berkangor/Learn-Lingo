import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // 🔹 root'u dinle, çünkü veriler 0,1,2... olarak root altında
    const teachersRef = ref(db, "/");

    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Firebase teachers snapshot:", data);

        if (!data) {
          setTeachers([]);
          return;
        }

        // data büyük ihtimalle array; ama object olsa da çalışsın:
        const teachersArray = Array.isArray(data)
          ? data.map((teacher, index) => ({
              id: index,
              ...teacher,
            }))
          : Object.entries(data).map(([id, teacher]) => ({
              id,
              ...teacher,
            }));

        setTeachers(teachersArray);
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
