import {Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import './Swipper.scss';

function Swipper(){
    return(
        <Swiper id='swipper' modules={[Autoplay]} spaceBetween={50} slidesPerView={1} autoplay = {true}>
            <SwiperSlide>
                <p id='text'>FREE STANDARD DELIVERY WITH MIN.SPEND OF $60</p>
            </SwiperSlide> 

            <SwiperSlide>
                <p id='text'>FOR ANY QUERY CONTACT US</p>
            </SwiperSlide>
        </Swiper>
    );
}
export default Swipper;