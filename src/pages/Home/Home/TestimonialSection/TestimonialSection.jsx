// components/TestimonialSection.jsx

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      review: 'Quick delivery and authentic medicines. Highly recommend HealthHub!',
      rating: 5,
    },
    {
      name: 'John D.',
      review: 'The discount section is a lifesaver for my monthly prescriptions.',
      rating: 4,
    },
  ];

  return (
    <section className="my-10 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <p className="text-gray-700 italic">"{t.review}"</p>
            <p className="font-semibold mt-3">— {t.name}</p>
            <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
