import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Testimonials = () => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeading(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    { id: 1, name: "Priya Sharma", location: "Mumbai, Maharashtra", rating: 5, review: "Amazing quality hoodies! The fabric is so soft and comfortable. Perfect for Mumbai's AC weather. Delivered within 2 days!", product: "Mickey Cotton Body Fit Red Hoodie", avatar: "PS" },
    { id: 2, name: "Rahul Patel", location: "Andheri, Mumbai", rating: 5, review: "Best t-shirts I've bought online! The print quality is excellent and hasn't faded even after multiple washes. Highly recommend!", product: "Graphic Print T-Shirt", avatar: "RP" },
    { id: 3, name: "Sneha Joshi", location: "Pune, Maharashtra", rating: 4, review: "Great collection and fast delivery! The hoodie fits perfectly. Customer service was very helpful when I had size queries.", product: "Printed Panda Hoodie", avatar: "SJ" },
    { id: 4, name: "Arjun Singh", location: "Bandra, Mumbai", rating: 5, review: "Fantastic quality at affordable prices! The Marvel t-shirt material is premium and the design is trendy. Will definitely order again!", product: "Marvel T-Shirt", avatar: "AS" },
    { id: 5, name: "Kavya Menon", location: "Thane, Mumbai", rating: 5, review: "Love the hoodie! Perfect for college wear. The color is exactly as shown in pictures. Great job abhinavdsofficial team!", product: "Red Hoodie", avatar: "KM" },
    { id: 6, name: "Vikram Gupta", location: "Powai, Mumbai", rating: 4, review: "Good quality t-shirts with Spiderman Prints. Delivery was on time and packaging was neat. Value for money purchase!", product: "Spiderman T-Shirt", avatar: "VG" },
    { id: 7, name: "Riya Kapoor", location: "Malad, Mumbai", rating: 5, review: "The hoodies are super comfortable and stylish! Perfect fit and the material quality exceeded my expectations. Highly satisfied!", product: "Lavender Hoodie", avatar: "RK" },
    { id: 8, name: "Aarav Sharma", location: "Navi Mumbai", rating: 5, review: "Impressed with the print quality and fabric! The oversized t-shirt is breathable and comfortable for Mumbai's humid weather.", product: "Oversized T-Shirt", avatar: "AS" },
    { id: 9, name: "Ishita Desai", location: "Kandivali, Mumbai", rating: 4, review: "Beautiful collection! The hoodie is perfect for evening outings. Great customer support and hassle-free returns policy.", product: "Santa Hoodie", avatar: "ID" },
    { id: 10, name: "Karan Mehta", location: "Borivali, Mumbai", rating: 5, review: "Outstanding quality and trendy designs! The polo t-shirt fits perfectly and looks exactly like the website photos. Recommended!", product: "Premium Polo T-Shirt", avatar: "KM" }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="forum-regular bg-headerBackGround py-10">
      <div className="text-center mt-10 mb-10">
        <h1
          className={` text-5xl md:text-7xl text-left ml-4 text-gray-800 transition-all duration-1000 ease-out transform ${
            showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          What Our Customers Say
        </h1>
      </div>

      <hr className="border-t mt-5 mb-10 border-black w-full" />

      <section className="bg-headerBackGround py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our amazing customers from across India have to say about their experience with abhinavdsofficial.
            </p>
          </div>

          <div className="max-w-6xl mx-auto p-2">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative overflow-hidden group h-full font-forumNormal">
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-8 h-8 text-blue-500" />
                    </div>

                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        ({testimonial.rating}.0)
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.review}"
                    </p>

                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {testimonial.product}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>


       {/* Call to Action */}
          <div className="text-center mt-5">
            <div className="bg-white rounded-2xl font-forumNormal shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Thousands of Happy Customers!
              </h3>
              <p className="text-gray-600 mb-6">
                Experience the premium quality and comfort that our customers love. Shop now and become part of the abhinavsofficial family.
              </p>
              <a href="/shop" className="bg-gray-900 hover:bg-gray-800 transform transition-all duration-300 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Now
              </a>
            </div>

            </div>
    </div>
  );
};

export default Testimonials;
