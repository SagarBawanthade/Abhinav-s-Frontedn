import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Fandom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [initialSlide, setInitialSlide] = useState(0);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

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
        link: '/shop/tag/spider-man'
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
    },
    {
      id: 24,
      name: 'Friends',
      image: '/images/fandom-24.jpg',
      logo: 'https://example.com/tom-and-jerry-logo.png',
      link: '/shop/tag/friends'
  }
  ];

  // Function to find the index of a fandom by its tag from the URL
  const findFandomIndexByTag = (tag) => {
    if (!tag) return 0;
    
    const cleanTag = tag.replace("/shop/tag/", "");
    const fandomIndex = fandoms.findIndex(fandom => 
      fandom.link.includes(cleanTag)
    );
    return fandomIndex !== -1 ? fandomIndex : 0;
  };

  // Save exact position information when navigating away
  useEffect(() => {
    const saveFandomPosition = () => {
      if (sectionRef.current) {
        // Save more detailed position information
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate the exact position of the section relative to the page
        const absoluteTop = rect.top + scrollTop;
        const sectionHeight = rect.height;
        
        // Store comprehensive position data
        const positionData = {
          top: absoluteTop,
          height: sectionHeight,
          // Center point of the section for more accurate restoration
          center: absoluteTop + (sectionHeight / 2),
          // How far the section is from the viewport top (for viewport-relative positioning)
          offset: rect.top,
          timestamp: Date.now()
        };
        
        localStorage.setItem('fandomPositionData', JSON.stringify(positionData));
      }
      
      // Also save active slide index
      if (swiperRef.current && swiperRef.current.swiper) {
        localStorage.setItem('activeFandomSlide', swiperRef.current.swiper.activeIndex.toString());
      }
    };

    // Listen for navigation events
    const handleBeforeUnload = () => {
      saveFandomPosition();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Save position when clicking fandom links
  const saveCurrentPosition = () => {
    if (sectionRef.current) {
      // Get the section's position relative to viewport
      const rect = sectionRef.current.getBoundingClientRect();
      // Get current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Save absolute position of the section in the page
      localStorage.setItem('fandomSectionTop', (rect.top + scrollTop).toString());
      // Save viewport-relative position as percentage of viewport height
      localStorage.setItem('fandomSectionViewportOffset', (rect.top / window.innerHeight).toString());
    }
  };

  // Check if user is returning from a fandom page
  useEffect(() => {
    const checkIfReturning = () => {
      const referrer = document.referrer;
      const isFromFandom = referrer && 
                           (referrer.includes('/shop/tag/') || 
                            location.state?.fromFandom);
                            
      setIsReturning(isFromFandom);
      
      // If returning, prepare for restoration
      if (isFromFandom) {
        const lastVisitedFandom = localStorage.getItem('lastVisitedFandom');
        if (lastVisitedFandom) {
          const index = findFandomIndexByTag(lastVisitedFandom);
          setInitialSlide(index);
        }
      }
    };
    
    checkIfReturning();
  }, [location]);

  // Main position restoration effect
  useEffect(() => {
    if (!isReturning) return;
    
    // Multi-phase restoration for reliability
    const restorePosition = () => {
      // Get the position data
      const positionData = localStorage.getItem('fandomPositionData');
      const activeFandomSlide = localStorage.getItem('activeFandomSlide');
      
      // First restore the slider position
      if (activeFandomSlide && swiperRef.current?.swiper) {
        const slideIndex = parseInt(activeFandomSlide);
        swiperRef.current.swiper.slideTo(slideIndex, 0, false);
      }
      
      // Now handle scroll position restoration
      if (positionData) {
        try {
          const position = JSON.parse(positionData);
          
          // Multi-phase scroll restoration for reliability
          // First attempt - immediate restoration
          scrollToSection(position.top - 100); // Slight offset for better visibility
          
          // Second attempt - after small delay to let page render
          setTimeout(() => {
            scrollToSection(position.top - 100);
          }, 50);
          
          // Third attempt - after longer delay for full page load
          setTimeout(() => {
            scrollToSection(position.top - 100, 'smooth');
            
            // Final positioning fine-tune to center the section
            setTimeout(() => {
              if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });
              }
            }, 200);
          }, 300);
        } catch (error) {
          console.error("Error restoring position:", error);
        }
      }
    };
    
    // Helper function to scroll to a position
    const scrollToSection = (position, behavior = 'auto') => {
      window.scrollTo({
        top: position,
        behavior: behavior
      });
    };
    
    if (swiperInitialized) {
      restorePosition();
    }
  }, [isReturning, swiperInitialized]);

  // Handle swiper initialization
  const handleSwiperInit = () => {
    setSwiperInitialized(true);
    
    // Additional check for returning from fandom page
    const lastVisitedFandom = localStorage.getItem('lastVisitedFandom');
    const activeFandomSlide = localStorage.getItem('activeFandomSlide');
    
    if (lastVisitedFandom && activeFandomSlide && swiperRef.current?.swiper) {
      const slideIndex = parseInt(activeFandomSlide);
      setTimeout(() => {
        swiperRef.current.swiper.slideTo(slideIndex, 0, false);
      }, 100);
    }
  };

  // Custom Link component with enhanced position saving
  const FandomLink = ({ to, className, children, fandom }) => {
    const handleClick = (e) => {
      e.preventDefault();
      
      // Save the fandom route
      localStorage.setItem('lastVisitedFandom', to);
      
      // Save detailed position information
      saveCurrentPosition();
      
      // Save slider position
      if (swiperRef.current?.swiper) {
        localStorage.setItem('activeFandomSlide', swiperRef.current.swiper.activeIndex.toString());
      }
      
      // Navigate programmatically with state
      navigate(to, { state: { fromFandom: true } });
    };

    return (
      <a href={to} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  };

  // Add an ID to the section for direct navigation
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.id = "shop-by-fandom";
    }
  }, []);

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
  
  

  
      <div className="max-w-6xl mx-auto p-2">
        <Swiper
          ref={swiperRef}
          slidesPerView={2}
          spaceBetween={20}
          initialSlide={initialSlide}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            dynamicBullets: true,
            dynamicMainBullets: 5,
          }}
          loop={true}
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
          onInit={handleSwiperInit}
          onSlideChange={(swiper) => {
            localStorage.setItem('activeFandomSlide', swiper.activeIndex.toString());
          }}
        >
          {fandoms.map((fandom) => (
            <SwiperSlide key={fandom.id}>
              <FandomLink to={fandom.link} className="block" fandom={fandom}>
                <div className="flex flex-col items-center">
                  {/* Fandom Image */}
                  <div className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 aspect-square w-full relative">
                    <img 
                      src={fandom.image} 
                      alt={`${fandom.name} merchandise`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white font-semibold text-lg">{fandom.name}</p>
                      <p className="text-white/80 text-sm flex items-center">
                        Explore Collection
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="M5 12h14m-7-7l7 7-7 7" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              </FandomLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom pagination styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .swiper-pagination {
            position: relative;
            margin-top: 2rem;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 5px;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: #3e3232 !important;
            transform: scale(1.2);
          }
          .swiper-button-next,
          .swiper-button-prev {
            color: #3e3232;
          }
        `
      }} />
    </div>
  );
};

export default Fandom;