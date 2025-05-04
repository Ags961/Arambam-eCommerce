import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from 'framer-motion';

// ✅ About Page - Displays company background, mission, benefits and newsletter signup
const About = () => {
  return (
    <div className="overflow-hidden">

      {/* ✅ Main Page Heading */}
      <motion.div
        className="text-2xl text-center pt-8 border-t border-white/20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      {/* ✅ About Section: Image + Description */}
      <div className="my-16 flex flex-col md:flex-row gap-16 px-6">
        {/* Left: About Image */}
        <motion.img
          src={assets.about_img}
          alt="About Us"
          className="w-full md:max-w-[450px] rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-700"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Right: About Description */}
        <motion.div
          className="flex flex-col justify-center gap-6 md:w-2/4 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p>
            Arambam was founded with the goal of transforming online shopping through a passion for innovation.
            Our aim is to create a seamless platform where customers can explore, review, and shop premium-quality items with confidence.
          </p>
          <p>
            We curate a diverse collection—from modern fashion to tech—sourced from trusted brands, ensuring excellence and satisfaction with every order.
          </p>

          {/* ✅ Hoverable Mission Statement */}
          <motion.b
            className="text-teal-300 text-lg"
            whileHover={{ scale: 1.1, color: '#38bdf8' }}
            transition={{ duration: 0.3 }}
          >
            Our Mission
          </motion.b>
          <motion.p
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            At Arambam, we strive to provide choice, ease, and trust by delivering a smooth shopping and delivery journey to all customers.
          </motion.p>
        </motion.div>
      </div>

      {/* ✅ Why Choose Us Section */}
      <motion.div
        className="text-xl text-center py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      {/* ✅ Benefits Cards */}
      <motion.div
        className="flex flex-col md:flex-row text-sm mb-20 px-6 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          {
            title: 'Quality Assurance:',
            desc: 'We meticulously select and vet each product to meet strict quality standards.',
          },
          {
            title: 'Convenience:',
            desc: 'Enjoy an easy, user-friendly interface and smooth ordering process.',
          },
          {
            title: 'Exceptional Customer Service:',
            desc: 'Our team is ready 24/7 to help and ensure complete satisfaction.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-transform"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <b className="text-teal-300">{item.title}</b>
            <p className="text-white">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ Newsletter Signup Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;