import React from 'react'
import mensCollectionImage from '../../assets/mens-collection.webp';
import womensCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const GenderCollectionSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: 'ease-in-out',
      mirror: true,
    });
  }, []);
  
  
  
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8 items-center justify-center pl-27 '>
            {/* womens collection */}
            <div className='relative flex-1 ' data-aos="flip-left">
               <img 
               src={womensCollectionImage}
               alt="Women's Collection"
               className='w-[80%]  h-[700px] object-cover'
               />
              <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
              <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                Women's Collection
              </h2>
              <Link
              to="/collections/all?gender=Women"
              className='text-gray-900 underline'
              >
                Shop Now
              </Link>
              </div>
            </div>
            {/* men's Collection */}
            <div className='relative flex-1' data-aos="flip-right">
               <img 
               src={mensCollectionImage}
               alt="Men's Collection"
               className='w-[80%] h-[700px] object-cover'
               />
              <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
              <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                Men's Collection
              </h2>
              <Link
              to="/collections/all?gender=Men"
              className='text-gray-900 underline'
              >
                Shop Now
              </Link>
              </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection