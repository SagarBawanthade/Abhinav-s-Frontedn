import { useEffect, useRef } from 'react';
import { HiCheckCircle } from 'react-icons/hi'; // Icon for bullet points

const TermsAndConditions = () => {
  const termsRef = useRef(null);
  useEffect(() => {
    if (termsRef.current) {
      termsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <div ref={termsRef} className="bg-headerBackGround text-black font-forumNormal  dark:bg-black dark:text-white">
      <div className="container mx-auto px-12 md:px-16 py-8">
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          <strong className='font-avenir'>Effective Date:</strong> 2024-07-15
        </p>
        <div className="w-full flex">
          <h1 className="text-5xl forum-regular font-extrabold mb-6 text-orange-800 dark:text-orange-300">
            Terms of Service for Your Business
          </h1>
        </div>
        <p className="mb-6 text-base text-gray-800 dark:text-gray-200">
          Welcome to the Abhinav's Best of World. Please read these terms of service carefully before using the website. By using the
          website, you agree to be bound by these terms of service. If you do not agree to these terms of service, you may
          not use the website. These terms of service govern your use of the website and all services provided by the
          website. 
        </p>

        <div className="font-forumNormal pb-5">
          <h2 className="text-3xl forum-regular font-extrabold text-orange-700 dark:text-orange-300 mb-5">General</h2>
          <ul className="space-y-5">
            <li className="flex items-start space-x-4 text-base text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-black-600 dark:text-green-400 text-2xl mt-1" />
              <p className='font-forumNormal'>
                By accessing Abhinav's, you agree to be bound by these terms of service, all applicable laws and
                regulations, and agree that you are responsible for compliance with any applicable local laws. If you do
                not agree with any of these terms, you are prohibited from using or accessing this site. The materials
                contained in this website are protected by applicable copyright and trademark law.
              </p>
            </li>
            <li className="flex items-start space-x-4 text-base text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-black-600 dark:text-green-400 text-2xl mt-1" />
              <p>
                We reserve the right to change these terms of service at any time without notice. By using this website,
                you are agreeing to be bound by the then-current version of these terms of service. Any updates will be
                notified via email.
              </p>
            </li>
            <li className="flex items-start space-x-4 text-base text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-black-600 dark:text-green-400 text-2xl mt-1" />
              <p>
                The website may be temporarily unavailable due to technical issues or maintenance. We will try to ensure
                that the site is always accessible but cannot guarantee uninterrupted service.
              </p>
            </li>
          </ul>
        </div>

        <div className="pb-5">
          <h2 className="text-3xl forum-regular font-extrabold text-orange-700 dark:text-orange-300 mb-5">Limitation of Liability</h2>
          <ul className="space-y-5">
            <li className="flex items-start space-x-4 text-base text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-black-600 dark:text-green-400 text-2xl mt-1" />
              <p>
                To the fullest extent permitted by law, we are not liable for any damages resulting from your use or inability
                to use this website, including but not limited to lost profits, data loss, or other incidental damages.
              </p>
            </li>
            <li className="flex items-start space-x-4 text-base text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-black-600 dark:text-green-400 text-2xl mt-1" />
              <p>
                Our liability is limited to the amount you paid for the services, and we shall not be responsible for any
                indirect, special, or consequential damages.
              </p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
