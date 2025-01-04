import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ServicesPage = () => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    setShowHeading(true); // Trigger the heading transition on page load
  }, []);

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  

  return (
    <div className="forum-regular  bg-[#E6FF87] py-10">
      {/* Services Heading */}
      <div className="text-center mt-20 mb-20">
        <h2
          className={`text-8xl text-left ml-4 forum-regular  text-gray-800 transition-all duration-1000 ease-out transform ${
            showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Services
        </h2>
      </div>

      {/* Services Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-6">
        {/* Left Section - Picture */}
        <div className="hidden md:block md:w-1/2 w-full mb-8 md:mb-0">
        {/* <div className="md:hidden w-full md:w-1/2 mb-8  md:mb-0"> */}
          <div className="overflow-hidden">
            <img
              src="/images/Services.jpg" // Replace with the actual image URL
              alt="Service Image"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Right Section - Service Boxes */}
        <div className="bg-[#E6FF87] w-full md:w-1/2 grid grid-cols-2 gap-4">
          {/* Box 1 */}
          <div className="bg-none border-gray-800 border-t">
            <div className="h-full flex flex-col justify-between p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Styling </h3>
              <p className="text-gray-600 text-xl mb-10">Personalized Fashion Advice.</p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="border-t border-l border-gray-800 rounded-tr ">
            <div className="h-50 flex flex-col justify-between p-6">
              <h3 className="text-2xl font-semibold mb-12 text-gray-800">Tailoring</h3>
              <p className="text-gray-600 text-xl mb-10">Perfect Fit Guaranteed</p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="border-t  border-gray-800  ">
            <div className="h-full flex flex-col justify-between p-6 ">
              <h3 className="text-2xl font-semibold text-gray-800">Customization</h3>
              <p className="text-gray-600 text-xl mb-10">Create Your unique style.</p>
            </div>
          </div>

          {/* Box 4 */}
          <div className="border-t border-l border-gray-800">
            <div className="h-full flex flex-col justify-between p-6">
              <h3 className="text-2xl font-semibold mb-10  text-gray-800">Alteration</h3>
              <p className="text-gray-600 text-xl mb-10">Revamp Your WarDrope.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
