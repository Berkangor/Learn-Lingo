import { useState, useMemo, useCallback } from "react";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./TeachersPage.module.css";
import useTeachers from "../../api/useTeachers";
import { TeacherSkeleton } from "../../components/TeacherSkeleton/TeacherSkeleton"; 

const teachersPerPage = 4;

const TeachersPage = () => {
  const teachers = useTeachers(); 
  const isLoading = !teachers || teachers.length === 0; 

  const [filters, setFilters] = useState({
    selectedLanguage: "All",
    selectedLevel: "All",
    selectedPrice: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const filteredTeachers = useMemo(() => {
    const safeTeachers = teachers || []; 
    const { selectedLanguage, selectedLevel, selectedPrice } = filters;

    return safeTeachers.filter((teacher) => {
      const matchesLanguage =
        selectedLanguage === "All" ||
        teacher.languages?.includes(selectedLanguage);

      const matchesLevel =
        selectedLevel === "All" ||
        teacher.levels?.includes(selectedLevel);

      const matchesPrice =
        selectedPrice === "All" ||
        teacher.price_per_hour <= Number(selectedPrice);

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }, [teachers, filters]);

  const currentTeachers = useMemo(() => {
    const end = currentPage * teachersPerPage;
    return filteredTeachers.slice(0, end);
  }, [filteredTeachers, currentPage]);

  const hasMoreTeachers = currentTeachers.length < filteredTeachers.length;

  const handleFilter = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Header />
      <div className={`container ${css.teachersPageContainer}`}>
        <Filters onFilter={handleFilter} />
        
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
            {[...Array(4)].map((_, i) => <TeacherSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <TeachersList teachers={currentTeachers} />
            
            {currentTeachers.length > 0 && (
              hasMoreTeachers ? (
                <button className={css.btnMore} onClick={handleLoadMore}>
                  Load more
                </button>
              ) : (
                <p className={css.noMore}>No more teachers.</p>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TeachersPage;