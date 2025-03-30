import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Fandom = () => {
  const fandoms = [
    {
      id: 1,
      name: 'MARVEL',
      image: 'https://images.bewakoof.com/t640/men-s-salsa-red-hulk-graphic-printed-oversized-t-shirt-659573-1739538134-1.jpg',
      logo: 'https://www.tvstoreonline.com/cdn/shop/files/marvel-comics-logo.png?v=1613769576',
      link: '/shop/marvel'
    },
    {
      id: 2,
      name: 'DC',
      image: 'https://images.bewakoof.com/t640/men-s-red-the-batman-graphic-printed-oversized-t-shirt-480316-1737366167-1.jpg',
      logo: 'https://www.tvstoreonline.com/cdn/shop/files/dc-comics-logo.png?v=1613769574',
      link: '/shop/dc'
    },
    {
      id: 3,
      name: 'Spiderman',
      image: 'https://images.bewakoof.com/t640/men-s-red-friendly-neighbour-graphic-printed-oversized-t-shirt-660978-1738573645-1.jpg',
      logo: 'https://th.bing.com/th/id/OIP.85drFdpEqu_ldfAmMxjM3wHaCs?rs=1&pid=ImgDetMain',
      link: '/shop/spiderman'
    },
    {
      id: 4,
      name: 'DISNEY',
      image: 'https://images.bewakoof.com/t640/women-s-blue-mickey-and-mini-hyper-printed-oversized-t-shirt-391696-1707221665-1.jpg',
      logo: 'https://th.bing.com/th/id/OIP.w1qKu2FXRzq_mkZkpSnfyAHaEK?w=329&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      link: '/shop/disney'
    },
    {
      id: 5,
      name: 'Minions',
      image: 'https://images.bewakoof.com/t640/women-s-blue-relax-minion-graphic-printed-boyfriend-t-shirt-648810-1737444070-1.jpg',
      logo: 'https://cdn.ecommercedns.uk/files/4/254074/0/39786260/image.jpg',
      link: '/shop/minions'
    },
    {
      id: 6,
      name: 'Doraemon',
      image: 'https://www.swagshirts99.com/wp-content/uploads/2020/02/4F1E4FBE-F286-4CDE-86A6-707CDCEB5EF3-356x442.jpeg',
      logo: 'https://www.pngitem.com/pimgs/m/531-5313796_doraemon-logo-png-transparent-png.png',
      link: '/shop/doraemon'
    },
    {
      id: 7,
      name: 'Typography',
      image: 'https://images.bewakoof.com/t640/women-s-black-friends-typography-boyfriend-t-shirt-234669-1715257520-1.jpg',
      logo: 'https://th.bing.com/th/id/OIP.rElUO5LpqvuQDb96mBZUbQHaB_?rs=1&pid=ImgDetMain',
      link: '/shop/typography'
    },
    {
      id: 8,
      name: 'Trending Talks',
      image: 'https://images.bewakoof.com/t640/men-s-white-chill-guy-graphic-printed-oversized-t-shirt-655005-1733216144-1.jpg',
      logo: 'https://thumbs.dreamstime.com/b/trending-text-red-trapeze-stamp-sign-written-253130899.jpg',
      link: '/shop/trending-talks'
    },
    {
      id: 9,
      name: 'Aventure',
      image: 'https://images.bewakoof.com/t640/men-s-red-moon-rider-graphic-printed-t-shirt-475032-1737724095-1.jpg',
      logo: 'https://see.fontimg.com/api/renderfont4/YGZ2/eyJ3IjoxMDAwLCJoIjo4MCwiZnMiOjgwLCJyIjoiZnMiLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOm51bGwsImdpZCI6bnVsbH0/QWR2ZW50dXJl/adventure.png',
      link: '/shop/adventure'
    },
     ];

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Shop by Fandom</h2>
      
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-500',
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {fandoms.map((fandom) => (
            <SwiperSlide key={fandom.id}>
              <Link to={fandom.link} className="block">
                <div className="flex flex-col items-center">
                  {/* Fandom Image */}
                  <div className="rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 aspect-square w-full">
                    <img 
                      src={fandom.image} 
                      alt={`${fandom.name} merchandise`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Logo below the image */}
                  <div className="mt-6 w-32 md:w-40">
                    <img 
                      src={fandom.logo} 
                      alt={`${fandom.name} logo`} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom pagination styling */}
      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative;
          margin-top: 2rem;
        }
        :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          margin: 0 5px;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #3b82f6;
        }
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Fandom;