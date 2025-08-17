import React from 'react';

const AboutUs = () => {
    return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        About Health Hub Express
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Welcome to <span className="font-semibold text-blue-600">Health Hub Express</span>, 
        your trusted multi-vendor e-commerce platform for medicines and healthcare products. 
        Our mission is to make healthcare accessible, affordable, and reliable for everyone.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        We bring together multiple verified vendors, ensuring you get authentic medicines, 
        wellness products, and healthcare essentials all in one place. With our easy-to-use 
        platform, you can explore a wide range of products, compare options, and shop with confidence.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Beyond shopping, Health Hub Express empowers you to 
        <span className="font-semibold"> submit queries and connect with experts</span> 
        for personalized guidance, making healthcare support just a click away.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        We are constantly working to improve your experience by ensuring 
        <span className="font-semibold"> secure transactions, responsive design, and fast delivery</span>. 
        Our future plans include integrating advanced features like AI-driven recommendations, 
        health blogs, and a complete patient-care ecosystem.
      </p>
    </section>
  );
};

export default AboutUs;