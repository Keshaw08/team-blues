import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import Hero from "@/components/Hero";
import MarathonDetails from "@/components/MarathonDetails";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

type Props = {};

function Landing({}: Props) {
  return (
    <div>
      <Header />
      <Hero />
      <CountdownTimer />
      <MarathonDetails />
      <News />
      <Gallery />
      <Footer />
      {/* <RegistrationPopup /> */}
    </div>
  );
}

export default Landing;
