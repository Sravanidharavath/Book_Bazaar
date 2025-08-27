import React from 'react';
import { Link } from 'react-router-dom';



const About = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          About Online Book Bazaar
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg text-gray-700 text-center mb-10">
          Welcome to <span className="font-semibold">Online Book Bazaar</span> — your trusted platform to
          <span className="text-blue-600 font-semibold"> buy, sell, and exchange books</span>. Whether you’re
          a student looking to save money, a book lover seeking rare finds, or someone wanting to give
          your books a second life — we’re here to help you connect with the right readers.
        </p>

        {/* Two-column section */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Our Mission */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-6 md:pb-0 pr-0 md:pr-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Our goal is to create a sustainable book ecosystem by promoting reuse and reducing waste.
              We empower individuals to easily list their old books for sale or exchange, making knowledge
              more accessible and affordable for everyone.
            </p>
          </div>

          {/* What We Offer */}
          <div className="pt-6 md:pt-0 pl-0 md:pl-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Buy new and second-hand books at reasonable prices</li>
              <li>Exchange books with other users directly</li>
              <li>Sell your old books and earn extra cash</li>
              <li>Clean and secure seller dashboard for easy management</li>
              <li>Authentication via Email or Google</li>
              <li>Mobile-responsive interface for a smooth experience</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            to="/shop"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition"
          >
            Start Exploring Books
          </Link>
         
        </div>
      </div>
    </section>
  );
};

export default About;
