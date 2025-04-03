import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

const Fandom = () => {

   const [showHeading, setShowHeading] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
        setShowHeading(true);
      }, 100); // Adjust the delay as needed
  
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  , []);
  
  const fandoms = [
    {
        id: 1,
        name: 'MARVEL',
        image: '/images/fandom-16.net',
        logo: 'https://www.tvstoreonline.com/cdn/shop/files/marvel-comics-logo.png?v=1613769576',
        link: '/shop/tag/marvel'
    },
    {
        id: 2,
        name: 'DC',
        image: '/images/fandom-17.jpeg',
        logo: 'https://www.tvstoreonline.com/cdn/shop/files/dc-comics-logo.png?v=1613769574',
        link: '/shop/tag/dc'
    },
    {
        id: 3,
        name: 'Spiderman',
        image: '/images/fandom-18.jpeg',
        logo: 'https://th.bing.com/th/id/OIP.85drFdpEqu_ldfAmMxjM3wHaCs?rs=1&pid=ImgDetMain',
        link: '/shop/tag/spiderman'
    },
    {
        id: 4,
        name: 'Disney',
        image: '/images/fandom-19.jpeg',
        logo: 'https://th.bing.com/th/id/OIP.w1qKu2FXRzq_mkZkpSnfyAHaEK?w=329&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        link: '/shop/tag/disney'
    },
    {
        id: 5,
        name: 'Minions',
        image: '/images/fandom-20.jpeg',
        logo: 'https://cdn.ecommercedns.uk/files/4/254074/0/39786260/image.jpg',
        link: '/shop/tag/minions'
    },
    {
        id: 6,
        name: 'Doraemon',
        image: '/images/fandom-21.png',
        logo: 'https://www.pngitem.com/pimgs/m/531-5313796_doraemon-logo-png-transparent-png.png',
        link: '/shop/tag/doraemon'
    },
    {
        id: 7,
        name: 'Typography',
        image: '/images/fandom-22.png',
        logo: 'https://th.bing.com/th/id/OIP.rElUO5LpqvuQDb96mBZUbQHaB_?rs=1&pid=ImgDetMain',
        link: '/shop/tag/typography'
    },
    {
        id: 8,
        name: 'Trending Talks',
        image: '/images/fandom-23.jpg',
        logo: 'https://thumbs.dreamstime.com/b/trending-text-red-trapeze-stamp-sign-written-253130899.jpg',
        link: '/shop/tag/trending-talks'
    },
    {
        id: 9,
        name: 'Adventure',
        image: '/images/fandom-1.jpg',
        logo: 'https://see.fontimg.com/api/renderfont4/YGZ2/eyJ3IjoxMDAwLCJoIjo4MCwiZnMiOjgwLCJyIjoiZnMiLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOm51bGwsImdpZCI6bnVsbH0/QWR2ZW50dXJl/adventure.png',
        link: '/shop/tag/adventure'
    },
    {
        id: 10,
        name: 'Pikachu',
        image: '/images/fandom-2.jpg',
        logo: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
        link: '/shop/tag/pikachu'
    },
    {
        id: 11,
        name: 'Bear',
        image: '/images/fandom-14.jpg',
        logo: 'https://example.com/bear-logo.png',
        link: '/shop/tag/bear'
    },
    {
        id: 12,
        name: 'Stay Wild',
        image: '/images/fandom-13.jpg',
        logo: 'https://example.com/stay-wild-logo.png',
        link: '/shop/tag/stay-wild'
    },
    {
        id: 13,
        name: 'Pooh',
        image: '/images/fandom-12.jpg',
        logo: 'https://example.com/pooh-logo.png',
        link: '/shop/tag/pooh'
    },
    {
        id: 14,
        name: 'Shinchan',
        image: '/images/fandom-11.jpg',
        logo: 'https://example.com/shinchan-logo.png',
        link: '/shop/tag/shinchan'
    },
    {
        id: 15,
        name: 'Mickey Mouse',
        image: '/images/fandom-10.jpg',
        logo: 'https://example.com/mickey-mouse-logo.png',
        link: '/shop/tag/mickey-mouse'
    },
    {
        id: 16,
        name: 'Panda',
        image: '/images/fandom-9.jpg',
        logo: 'https://example.com/panda-logo.png',
        link: '/shop/tag/panda'
    },
    {
        id: 17,
        name: 'Explore',
        image: '/images/fandom-15.jpg',
        logo: 'https://example.com/explore-logo.png',
        link: '/shop/tag/explore'
    },
    {
        id: 18,
        name: 'Duck',
        image: '/images/fandom-7.jpg',
        logo: 'https://example.com/duck-logo.png',
        link: '/shop/tag/duck'
    },
    {
        id: 19,
        name: 'Goku',
        image: '/images/fandom-6.jpg',
        logo: 'https://example.com/goku-logo.png',
        link: '/shop/tag/goku'
    },
    {
        id: 20,
        name: 'I am Groot',
        image: '/images/fandom-5.jpg',
        logo: 'https://example.com/i-am-groot-logo.png',
        link: '/shop/tag/i-am-groot'
    },
    {
        id: 21,
        name: 'Ride',
        image: '/images/fandom-4.jpg',
        logo: 'https://example.com/ride-logo.png',
        link: '/shop/tag/ride'
    },
    {
        id: 22,
        name: 'Ghost',
        image: '/images/fandom-3.jpg',
        logo: 'https://example.com/ghost-logo.png',
        link: '/shop/tag/ghost'
    },
    {
        id: 23,
        name: 'Tom & Jerry',
        image: '/images/fandom-1.jpg',
        logo: 'https://example.com/tom-and-jerry-logo.png',
        link: '/shop/tag/tom-and-jerry'
    }
];

  return (
    <div className="forum-regular bg-headerBackGround py-10">
    {/* Heading Section */}
    <div className="text-center mt-10 mb-10">
      <h1
        className={`text-7xl text-left ml-4 text-gray-800 transition-all duration-1000 ease-out transform ${
          showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
       Fandoms
      </h1>
    </div>
  
    <hr className="border-t mt-5 mb-10 border-black w-full" />
  
  

  
      <div className="max-w-6xl mx-auto">
      <Swiper
  slidesPerView={2}
  loop={true}
  spaceBetween={20}
        className="sm:block lg:hidden mySwiper"
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  
  modules={[Pagination, Autoplay]} >
          {fandoms.map((fandom) => (
            <SwiperSlide key={fandom.id}>
              <Link to={fandom.link} className="block">
                <div className="flex flex-col items-center">
                  <div className="relative rounded-lg overflow-hidden shadow-sm aspect-square w-full">
                    <img 
                      src={fandom.image} 
                      alt={`${fandom.name} merchandise`} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
                      <p className="text-white font-forumNormal font-medium text-center">{fandom.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative;
          margin-top: 2rem;
        }
        :global(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          background: #CBD5E1;
          opacity: 0.7;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #64748B;
          opacity: 1;
        }
      `}</style>
    </div>
   
  );
};

export default Fandom;