import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerService from '../service/BannerService';

export default function Banner() {
    const [banners, setBanners] = useState([]);

    useEffect(()=>{
        const fecthBanner = async () =>{
            try {
                const response = await BannerService.getList();
                setBanners(response);
            }
            catch(error){
                console.log(error);
            }
        };
        fecthBanner();
    },[])


    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-lg">
            <Swiper
                effect={'fade'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className="w-full h-full"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <img
                            src={`http://localhost:8000/api/banner/${banner.id}/image`}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"></div>
            </Swiper>
        </div>
    );
}