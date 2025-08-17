import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const DiscountProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['discounted-medicines'],
    queryFn: async () => {
      const res = await fetch('https://server-mauve-seven.vercel.app/medicines/discount');
      return res.json();
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Discounted Medicines</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3500 }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product._id}>
            <div className="border rounded-lg shadow-md hover:shadow-xl bg-white p-4 h-full flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-cover rounded"
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.genericName}</p>
                <p className="mt-2 text-green-700 font-semibold">
                  ${product.price?.toFixed(2)}{' '}
                  <span className="text-red-500 text-sm ml-2">({product.discount}% Off)</span>
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm w-full">
                  View
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm w-full">
                  Select
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
