// components/HealthTipsSection.jsx
const HealthTipsSection = () => {
  const tips = [
    {
      title: '5 Ways to Boost Your Immune System',
      image: 'https://livewellcc.com/wp-content/uploads/2020/01/5-Ways-To-Boost-Your-Immune-System-Naturally-.png',
      description: 'Learn how vitamins, sleep, and hydration can protect you from illness.',
    },
    {
      title: 'How to Store Medicines Safely at home',
      image: 'https://www.reanfoundation.org/wp-content/uploads/2024/10/medicine-storage-organize.jpg',
      description: 'Proper storage can maintain effectiveness and safety of your medicines.',
    },
  ];

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Health Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, i) => (
          <div key={i} className="border rounded overflow-hidden shadow hover:shadow-lg transition">
            <img src={tip.image} alt={tip.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{tip.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{tip.description}</p>
              <button className="text-blue-600 mt-2 text-sm">Read more →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthTipsSection;
