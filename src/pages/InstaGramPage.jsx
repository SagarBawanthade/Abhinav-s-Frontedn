import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons

const InstagramPage = () => {
  return (
    <div className="bg-headerBackGround text-center">
      {/* Instagram Icon */}
      <a href='https://www.instagram.com/abhinavsofficial/' target="_blank"><FaInstagram className="hover:scale-110 transition-transform marker text-6xl text-pink-500 mx-auto mb-4 mt-8 " /></a>
      
      {/* Text */}
      <p className="text-3xl forum-regular mb-5 text-gray-700 font-medium">
        Follow us on Instagram @Abhinav'sOfficial
      </p>
    </div>
  );
};

export default InstagramPage;
