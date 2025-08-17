import React from 'react';
import Slider from '../Slider/Slider';
import CategorySection from './CategorySection';
import DiscountProducts from './DiscountProducts/DiscountProducts';
import TestimonialSection from './TestimonialSection/TestimonialSection';
import HealthTipsSection from './HealthTipsSection/HealthTipsSection';


const Home = () => {
    return (
        <div>
           
            <Slider></Slider>
            <CategorySection></CategorySection>
            <DiscountProducts></DiscountProducts>
            <TestimonialSection></TestimonialSection>
            <HealthTipsSection></HealthTipsSection>
        </div>
    );
};

export default Home;