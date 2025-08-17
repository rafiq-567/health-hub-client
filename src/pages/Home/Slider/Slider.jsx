import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Slider = () => {
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['slider'],
    queryFn: async () => {
      const res = await fetch('https://server-two-rosy-34.vercel.app/slider');
      return res.json();
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-10 mt-26">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-lg overflow-hidden"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide._id}>
            <div className="relative">
              <img src={slide.image} alt={slide.description || 'Slider image'} className="w-full h-[300px] object-cover" />
              {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p>{slide.description}</p>
              </div> */}
              {slide.description && (
                <div className="absolute bottom-0 p-4 text-white bg-black bg-opacity-50 w-full">
                  <p>{slide.description}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
