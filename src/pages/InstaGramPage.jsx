import { useState, useEffect } from "react";

const InstagramPage = () => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    setShowHeading(true); // Trigger the heading transition on page load
  }, []);

  return (
    <div className=" bg-headerBackGround forum-regular py-10">
      {/* Left Section */}
     

        {/* Heading Section */}
        <div className="mb-12">
          <h2
            className={`text-8xl text left ml-4   text-gray-800 transition-all duration-1000 ease-out transform ${
              showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
           follow Us
          </h2>
        </div>
        <hr className="border-t mt-5 mb-10 border-black w-full"/>

        {/* Instagram Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {/* Image 1 */}
          <div className="overflow-hidden">
            <img
              src="/images/insta1.jpg"
              alt="Instagram Image 1"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Image 2 */}
          <div className="overflow-hidden">
            <img
              src="/images/insta2.jpg"
              alt="Instagram Image 2"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Image 3 */}
          <div className="overflow-hidden">
            <img
              src="/images/insta3.jpg"
              alt="Instagram Image 3"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Image 4 */}
          <div className="overflow-hidden">
            <img
              src="/images/insta4.jpg"
              alt="Instagram Image 4"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Instagram Follow Text */}
        <div className="mt-8 text-center">
          <p className="text-2xl text-gray-700 font-medium">
            Follow us on Instagram @Abhinav's
          </p>
        </div>
      </div>
    
  );
};

export default InstagramPage;
