import React from "react";
import img2 from "../images/Img2.jpg";
import img3 from "../images/Img3.jpg";

const AboutSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900" id="about">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Want to Know About Us?
          </h2>
          <p className="mb-4">
            FULLTOSS is your gateway to the exciting world of IPL fandom! We are
            passionate about connecting cricket fans with their favorite teams
            in a fun and engaging way. When you register with FULLTOSS, our
            platform will assign you a random IPL team, bringing an element of
            surprise and excitement to the experience. Whether you're rooting
            for RCB, MI, CSK, or any other team, FULLTOSS ensures you feel like
            a part of the cricketing family.
          </p>
          <p>
            Our mission is to make the IPL even more enjoyable by fostering team
            spirit and creating an engaging fan community. So, are you ready to
            discover your IPL destiny? Click the button below and get started
            today!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={img2}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src={img3}
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
