import { useContext, } from "react";
import { ThemeContext } from "../../components/Context/ThemeContext";
import Benefits from "../../components/Benefits/Benefits";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import ThemeChanger from "../../components/ThemeChanger/ThemeChanger";


const HomePage = () => {
   const { theme, setTheme } = useContext(ThemeContext);
        
  return (
    <div className="container">
      <Header />
      <ThemeChanger setTheme={setTheme} />
      <Hero image={theme.image} />
      <Benefits/>
    </div>
  );
};

export default HomePage;