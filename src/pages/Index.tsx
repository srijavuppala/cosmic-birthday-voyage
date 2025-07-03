import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import BirthdaySpace from "@/components/BirthdaySpace";
import APOD from "@/components/APOD";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Timeline />
      <BirthdaySpace />
      <APOD />
    </div>
  );
};

export default Index;
