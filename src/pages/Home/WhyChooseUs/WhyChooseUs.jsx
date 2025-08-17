import { FaTruck, FaShieldAlt, FaCapsules, FaUserMd } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { icon: <FaTruck size={30} />, title: "Fast Home Delivery", desc: "Get medicines delivered at your doorstep within 24 hours." },
    { icon: <FaShieldAlt size={30} />, title: "100% Secure Payments", desc: "Safe transactions with multiple payment options." },
    { icon: <FaCapsules size={30} />, title: "Verified Medicines", desc: "All medicines are certified and approved for safety." },
    { icon: <FaUserMd size={30} />, title: "24/7 Doctor Support", desc: "Consult with licensed doctors anytime." },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-10 dark:text-black">Why Choose HealthHub Express?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <div className="text-blue-600 mb-4 flex justify-center">{f.icon}</div>
              <h3 className="font-semibold text-lg dark:text-black">{f.title}</h3>
              <p className="text-gray-700 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
