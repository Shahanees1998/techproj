import React from 'react';

const HowItWorksSection = () => {

  return (
   <>
       <section className="py-5 relative dark:bg-dark mt-5 sm-none">
      <div className="container">
        <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5">Explore Our Mobile Tech Shop</h2>
        <p className="text-white font-normal text-center text-md family-poppins">Our workshop on wheels is equipped to fix your devices at your doorstep. Here&apos;s what makes it unique!</p>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <div className="bg-secondary flex items-start mt-5 blue-border-l px-5 py-5 rounded-xl">
              <img className="mr-3" src="/images/hero/shop1.svg" />
              <h6 className="text-white font-normal text-md family-poppins">We bring the repair shop to your location, saving you time and hassle.</h6>
            </div>
            <div className="bg-secondary flex items-start mt-5 blue-border-l px-5 py-5 rounded-xl">
              <img className="mr-3" src="/images/hero/shop2.svg" />
              <h6 className="text-white font-normal text-md family-poppins">Our van is stocked with advanced tools to handle even complex repairs.</h6>
            </div>
            <div className="bg-secondary flex items-start mt-5 blue-border-l px-5 py-5 rounded-xl">
              <img className="mr-3" src="/images/hero/shop3.svg" />
              <h6 className="text-white font-normal text-md family-poppins">Track your repair, Stay informed with real-time updates on your repair progress.</h6>
            </div>
            <div className="bg-secondary flex items-start mt-5 blue-border-l px-5 py-5 rounded-xl">
              <img className="mr-3" src="/images/hero/shop4.svg" />
              <h6 className="text-white font-normal text-md family-poppins">Only the best certified experts to provide fast and reliable service.</h6>
            </div>
          </div>
           <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <img className="absolute right-0 w48 mt-12 sm-car" src="/images/hero/van.svg" />
          </div>
        </div>
      </div>
      <img className="absolute right-0 bottom-0" src="/images/hero/blur.svg" />
    </section>

    <section className="py-5 relative dark:bg-dark mt-5 web-none">
      <div className="container">
        <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5">Explore Our Mobile Tech Shop</h2>
        <p className="text-white font-normal text-center text-md family-poppins">Our workshop on wheels is equipped to fix your devices at your doorstep. Here&apos;s what makes it unique!</p>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-5">
            <div className="bg-secondary flex items-center mt-5 blue-border-l px-5 py-3 rounded-xl">
              <img className="mr-3" src="/images/hero/shop1.svg" />
              <h6 className="text-white font-normal text-xs family-poppins">We bring the repair shop to your location, saving you time and hassle.</h6>
            </div>
            <div className="bg-secondary flex items-center mt-5 blue-border-l px-5 py-3 rounded-xl">
              <img className="mr-3" src="/images/hero/shop2.svg" />
              <h6 className="text-white font-normal text-xs family-poppins">Our van is stocked with advanced tools to handle even complex repairs.</h6>
            </div>
            <div className="bg-secondary flex items-center mt-5 blue-border-l px-5 py-3 rounded-xl">
              <img className="mr-3" src="/images/hero/shop3.svg" />
              <h6 className="text-white font-normal text-xs family-poppins">Track your repair, Stay informed with real-time updates on your repair progress.</h6>
            </div>
            <div className="bg-secondary flex items-center mt-5 blue-border-l px-5 py-3 rounded-xl">
              <img className="mr-3" src="/images/hero/shop4.svg" />
              <h6 className="text-white font-normal text-xs family-poppins">Only the best certified experts to provide fast and reliable service.</h6>
            </div>
          </div>
           <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <img className="absolute right-0 w48 mt-12 sm-car" src="/images/hero/van.svg" />
          </div>
        </div>
      </div>
      <img className="absolute right-0 bottom-0" src="/images/hero/blur.svg" />
    </section>
   </>
  );
};

export default HowItWorksSection; 