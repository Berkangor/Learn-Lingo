import { useContext } from "react";
import { ThemeContext } from "../../components/Context/ThemeContext";
import Benefits from "../../components/Benefits/Benefits";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import ThemeChanger from "../../components/ThemeChanger/ThemeChanger";
import css from "./HomePage.module.css"; 

const HomePage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`container ${css.homeContainer}`}>
      <Header />
      <div className={css.themeWrapper}>
        <ThemeChanger setTheme={setTheme} />
      </div>
      
      <Hero image={theme.image} />
      <Benefits />
    </div>
  );
};

export default HomePage;