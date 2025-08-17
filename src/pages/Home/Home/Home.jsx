import React from 'react';
import Slider from '../Slider/Slider';
import CategorySection from './CategorySection';
import DiscountProducts from './DiscountProducts/DiscountProducts';
import TestimonialSection from './TestimonialSection/TestimonialSection';
import HealthTipsSection from './HealthTipsSection/HealthTipsSection';
import BestSellers from '../BestSellers/BestSellers';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import LatestBlogs from '../LatestBlogs/LatestBlogs';


const Home = () => {
    return (
        <div>
           
            <Slider></Slider>
            <CategorySection></CategorySection>
            <DiscountProducts></DiscountProducts>
            <TestimonialSection></TestimonialSection>
            <HealthTipsSection></HealthTipsSection>
            <BestSellers></BestSellers>
            <WhyChooseUs></WhyChooseUs>
            <LatestBlogs></LatestBlogs>
        </div>
    );
};

export default Home;