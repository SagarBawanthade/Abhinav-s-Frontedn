import {Link} from 'react-router-dom';

const Footer = () => {

  return (
    <>
    <footer className=" bg-[#E9EBCA] text-gray-800 py-12 min-h-full">
      <div className="max-w-10xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mt-12 mb-24">
          <h2 className="forum-regular text-5xl font-playfair-display-hero3">Abhinav's Best of World</h2>
        </div>

        

        {/* Three Joined Boxes */}
        
        <div className="grid grid-cols-1 md:border-slate-900 forum-avenir md:grid-cols-3 border-t ">
          {/* Box 1 */}
          <div className="border-t border-slate-900 md:border-t-0 md:border-r ml-9 pl-2.5 flex items-center ">
            <div className=" mb-36 mt-8 space-y-0 text-left">
              <Link to="/privacy"><p className="text-lg">Privacy Policy</p></Link>
              <Link to="/terms"><p className="text-lg">Terms & Conditions</p></Link>
            
          
             
            </div>
          </div>

          {/* Box 2 */}
          <div className="border-t border-slate-900 md:border-t-0 md:border-r ml-9 pl-2.5 flex items-center ">
            <div className="mb-36 space-y-0 mt-8 text-left">
              <p className="text-lg ">Headquarter</p>
            
              <p className="text-lg">Mumbai</p>
            </div>
          </div>

         {/* Box 3 */}
<div className="border-t border-slate-900 md:border-t-0 ml-9 pl-2.5 flex items-center">
  <div className="space-y-0 mb-36 mt-8 text-left">
    <p className="text-lg">8828458883</p>
    <p className="text-lg">7620397865</p>
    {/* Show email only on mobile and large screens (laptop/desktop), hide on tablets */}
    <a href="mailto:abhinavsofficial033@gmail.com" className="text-lg block md:hidden break-words hover:cursor-auto ">
  abhinavsofficial033@gmail.com
</a>
<a href="mailto:abhinavsofficial033@gmail.com" className="text-lg hidden lg:block break-words ">
  abhinavsofficial033@gmail.com
</a>

  </div>
</div>

        </div>
        </div>

        
     
    </footer>
    
  </>
  );
};

export default Footer;
