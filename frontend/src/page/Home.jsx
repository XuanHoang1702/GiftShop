import React from 'react';
import HomeCategoryDisplay from '../components/category/HomeCategoryDisplay';
import PostList from '../components/PostList';
import BestSeler from '../components/product/BestSeler';
import NewProduct from '../components/product/NewProduct';
import Sale from '../components/product/Sale';
import Banner from '../layout/Banner';
import ContactUs from '../layout/ContactUs';
import Testimonial from '../layout/Testimonial';
import WhyUs from '../layout/WhyUs';

function Home() {
    return (
        <div>
            <Banner/>
            <HomeCategoryDisplay/>
            <NewProduct/>
            <Sale/>
            <BestSeler/>
            <PostList/>
            <WhyUs/>
            <Testimonial/>
            <ContactUs/>
        </div>
    )
}

export default Home