import Carousel from "../components/Carousel";
import NavBar from "../components/Navbar";
import DataCard from "../components/DataCard";
import About from "../components/About";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactUs";
import styles from "./HomePage.module.css";

export default function HeroPage() {
  return (
    <>
      <NavBar />
      <Carousel />
      <About />
      <div className={styles.card}>
        <DataCard
          heading="10,000+ Fans Served"
          para="Join the league of over 10,000 fans who have celebrated their love for cricket with exclusive IPL merchandise and gear from FullToss."
        />
        <DataCard
          heading="500+ Products Available"
          para="Explore our wide range of 500+ authentic IPL products, from jerseys and caps to collectibles that capture the spirit of the game."
        />
        <DataCard
          heading="100% Authentic Merchandise"
          para="Shop with confidence knowing that all our products are officially licensed and crafted to meet the highest quality standards."
        />
      </div>
      <ContactForm />
      <Footer />
    </>
  );
}
