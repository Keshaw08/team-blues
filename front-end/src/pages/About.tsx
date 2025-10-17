import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";

type Props = {};

const About = ({}: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <AboutUs />
      <Footer />
    </div>
  );
};
export default About;
