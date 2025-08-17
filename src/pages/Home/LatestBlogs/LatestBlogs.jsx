const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips for Boosting Immunity",
      desc: "Simple lifestyle changes that can strengthen your immune system.",
      image: "https://i.ibb.co/MpJNYQy/immunity.jpg",
    },
    {
      id: 2,
      title: "Managing Diabetes with Diet",
      desc: "Learn how to control blood sugar naturally with food choices.",
      image: "https://i.ibb.co/Fq9g4vJ/diabetes.jpg",
    },
    {
      id: 3,
      title: "Why Regular Health Checkups Matter",
      desc: "Early detection is the key to a healthier life.",
      image: "https://i.ibb.co/7SfrHss/checkup.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Health Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="rounded-lg shadow hover:shadow-lg bg-white overflow-hidden">
            <img src={blog.image} alt={blog.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{blog.desc}</p>
              <button className="mt-3 text-blue-600 hover:underline">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
