import React from 'react';

const MobileTechShopSection = () => {


  return (
    <>
        <section className="dark:bg-dark bg-primary mt-12 relative z-10 sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-16">
              <img className="join-img" src="/images/hero/join-img.svg" />
            </div>
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
              <span className="text-md top-bg-opt px-4 py-2 rounded-full w-max-content text-white family-poppins flex items-center"><img className="mr-3" src="/images/hero/track-icon.svg" /> Join the Techfleet Network</span>
              <h2 className="mb-8 mt-5 text-5xl font-medium text-white dark:text-white">
                <span className="text-green">Canada&apos;s </span> only Electronics Products & Service Marketplace
              </h2>
              <p className="text-white text-md font-normal mb-5 family-poppins">Whether you&apos;re a skilled individual technician or a repair shop owner, TechFleet offers you the platform to grow, connect, and succeed.</p>
               <div className="flex flex-wrap">
                 <button type="button" className="btn-gradient hover:btn-gradient mt-5 mr-3 mb-10 rounded-full text-white w-max-content px-10 py-3 family-poppins font-medium text-md">Join as Individual Technicians</button>
                 <button type="button" className="bg-dark hover:btn-gradient mt-5 mb-10 rounded-full text-white w-max-content px-10 py-3 family-poppins font-medium text-md">Join as Repair Shops</button>
               </div>
              
            </div>
            
          </div>
        </div>
      </section>

      <section className="dark:bg-dark bg-primary mt-12 relative z-10 web-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
              <div className="flex justify-center">
                <span className="text-md top-bg-opt px-4 py-2 rounded-full w-max-content text-white family-poppins flex items-center"><img className="mr-3" src="/images/hero/track-icon.svg" /> Join the Techfleet Network</span>
              </div>
              
              <h2 className="mb-8 mt-5 text-3xl text-center font-medium text-white dark:text-white">
                <span className="text-green">Canada&apos;s </span> only Electronics Products & Service Marketplace
              </h2>
              <p className="text-white text-md font-normal mb-2 family-poppins text-center">Whether you&apos;re a skilled individual technician or a repair shop owner, TechFleet offers you the platform to grow, connect, and succeed.</p>
               <div className="flex flex-wrap">
                 <button type="button" className="btn-gradient mt-5 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">Join as Individual Technicians</button>
                 <button type="button" className="bg-dark mt-5 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">Join as Repair Shops</button>
               </div>
            </div>
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
              <img className="join-img" src="/images/hero/join-img.svg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileTechShopSection; 