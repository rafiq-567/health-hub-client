import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';

const CategorySection = () => {
  const {
    data: categories = [], // ডেটা না এলে একটি ফাঁকা অ্যারে হিসাবে শুরু হবে
    isLoading,
    isError, // ত্রুটি স্থিতি ট্র্যাক করার জন্য
    error // ত্রুটির বিবরণ অ্যাক্সেস করার জন্য
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://server-mauve-seven.vercel.app/categories');
      // HTTP স্ট্যাটাস কোড 2xx না হলে ত্রুটি ধরুন
      if (!res.ok) {
        const errorData = await res.json(); // ব্যাকএন্ড থেকে আসা ত্রুটি বার্তা
        throw new Error(errorData.message || 'নেটওয়ার্ক রেসপন্স ঠিক ছিল না');
      }
      return res.json(); // সফল রেসপন্স একটি অ্যারে হবে বলে আশা করা হচ্ছে
    }
  });

  // --- লোডিং এবং ত্রুটি স্থিতি হ্যান্ডলিং ---
  if (isLoading) {
    return <p className="text-center py-8">ক্যাটাগরি লোড হচ্ছে...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-8 text-red-600">
        ক্যাটাগরি লোড করতে ব্যর্থ হয়েছে: {error.message || 'অজানা ত্রুটি'}
      </p>
    );
  }

  // --- ডেটা টাইপ নিশ্চিত করা এবং ক্যাটাগরি না থাকার হ্যান্ডলিং ---
  // নিশ্চিত করুন যে 'categories' একটি অ্যারে এবং এতে উপাদান আছে
  if (!Array.isArray(categories) || categories.length === 0) {
      return <p className="text-center py-8 text-gray-600">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>;
  }

  // --- সফলভাবে ডেটা লোড হলে কম্পোনেন্ট রেন্ডার করা ---
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse By Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {categories.slice(0, 6).map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
