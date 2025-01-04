import { useEffect, useRef } from 'react';
import { HiShieldCheck, HiUser, HiLockClosed, HiLink } from 'react-icons/hi'; // Icons for various sections
import { useLocation } from 'react-router-dom';

const PolicyPage = () => {
  const policyRef = useRef(null);

  // Scroll to the element when the component is mounted
  useEffect(() => {
    if (policyRef.current) {
      policyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  

  return (
    <div ref={policyRef} className="bg-headerBackGround min-h-screen py-8">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-5xl forum-regular font-extrabold text-orange-800 mb-6">Privacy Policy</h2>

        <p className="font-forumNormal mb-8 text-lg text-gray-700 dark:text-gray-300">
          This privacy policy sets out how our website uses and protects any information that you give us when you use
          this website.
        </p>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-5xl forum-regular font-extrabold text-orange-700 dark:text-orange-300 mb-4">Information We Collect</h2>
          <div className="space-y-4 font-forumNormal text-gray-700 dark:text-gray-300">
            <div className="flex  items-center space-x-3">
              <HiUser className="text-green-600 dark:text-green-400 text-xl" />
              <p>Your name and contact information</p>
            </div>
            <div className="flex items-center space-x-3">
              <HiShieldCheck className="text-green-600 dark:text-green-400 text-xl" />
              <p>Demographic information</p>
            </div>
            <div className="flex items-center space-x-3">
              <HiLockClosed className="text-green-600 dark:text-green-400 text-xl" />
              <p>Other information relevant to customer surveys and/or offers</p>
            </div>
          </div>
        </section>

        {/* How We Use the Information */}
        <section className="mb-12">
          <h2 className="text-5xl forum-regular font-extrabold text-orange-700 dark:text-orange-300 mb-4">How We Use the Information</h2>
          <p className="mb-4 font-forumNormal text-gray-700 dark:text-gray-300">
            We require this information to understand your needs and provide you with a better service, particularly for
            the following reasons:
          </p>
          <ul className="list-inside font-forumNormal list-disc mb-6 text-gray-700 dark:text-gray-300">
            <li>Internal record keeping</li>
            <li>Improving our products and services</li>
            <li>Sending promotional emails about new products or offers</li>
            <li>Contacting for market research purposes from time to time</li>
          </ul>
        </section>

        {/* Security */}
        <section className="mb-12">
          <h2 className="text-3xl forum-regular font-semibold text-orange-700 dark:text-orange-300 mb-4">Security</h2>
          <p className="mb-6 font-forumNormal text-gray-700 dark:text-gray-300">
            We are committed to ensuring that your information is secure. In order to prevent unauthorized access or
            disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and
            secure the information we collect online.
          </p>
        </section>

        {/* Links to Other Websites */}
        <section className="mb-12">
          <h2 className="text-3xl forum-regular font-semibold text-orange-700 dark:text-orange-300 mb-4">Links to Other Websites</h2>
          <p className="mb-6 font-forumNormal text-gray-700 dark:text-gray-300">
            Our website may contain links to other websites of interest. Once you have used these links to leave our site,
            we do not have control over those websites. We are not responsible for the protection and privacy of any
            information you provide on those sites. You should review their privacy policies.
          </p>
        </section>

        {/* Controlling Your Personal Information */}
        <section>
          <h2 className="text-3xl forum-regular font-semibold text-orange-700 dark:text-orange-300 mb-4">
            Controlling Your Personal Information
          </h2>
          <p className="mb-4 font-forumNormal text-gray-700 dark:text-gray-300">
            You may choose to restrict the collection or use of your personal information in the following ways:
          </p>
          <ul className="list-inside font-forumNormal list-disc mb-6 text-gray-700 dark:text-gray-300">
            <li>If you previously agreed to use your information for marketing, you may change your mind by contacting us.</li>
            <li>We will not sell, distribute, or lease your personal information without your permission unless required by law.</li>
            <li>You may request details of personal information we hold about you.</li>
          </ul>

          <p className="mb-6 font-forumNormal text-gray-700 dark:text-gray-300">
            If you believe that any information we hold is incorrect or incomplete, please contact us, and we will promptly
            correct any inaccuracies.
          </p>
        </section>

        <p className="text-sm font-avenir text-gray-500 dark:text-gray-300">
          This privacy policy is subject to change without notice.
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
