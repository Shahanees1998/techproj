import React from 'react';

const DeviceFinder = () => {
  return (
    <>
      <section className="py-5 mt-12 bg-primary-gradient dark:bg-dark sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 flex justify-between md:w-1/2 lg:w-4/12">
              <img src="/images/hero/mask-image.png" />
            </div>
            <div className="w-full px-20 md:w-1/2 lg:w-8/12">
              <h2 className="text-white mb-5 text-5xl font-medium">Accidents Happen. <br /><span className="text-green">We’ve Got You Covered.</span></h2>
              <p style={{width: '80%'}} className="text-white mb-5 family-poppins text-md font-normal">With TechFleet Membership, enjoy 24/7 priority tech care and repairs for just $9.99/month. Say goodbye to unexpected costs and hello to hassle-free support for all your devices.</p>
              <button type="button" className="bg-full-dark hover:btn-gradient px-10 py-3 text-white font-normal family-poppins text-md rounded-full">Our Membership Plan</button>
            </div>
          </div>
        </div>
      </section>
      <div className="px-5 web-none">
        <section className="mt-12 bg-primary rounded-xl dark:bg-dark ">
          <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full flex justify-between md:w-1/2 lg:w-4/12">
                <img src="/images/hero/img-pro.svg" />
              </div>
              <div className="w-full px-5 md:w-1/2 lg:w-8/12">
                <h2 className="text-white mb-5 text-2xl text-center mt-5 font-medium">Accidents Happen. <br /><span className="text-green">We’ve Got You Covered.</span></h2>
                <p className="text-white mb-5 family-poppins text-md text-center font-normal">With TechFleet Membership, enjoy 24/7 priority tech care and repairs for just $9.99/month. Say goodbye to unexpected costs and hello to hassle-free support for all your devices.</p>
                <button type="button" className="bg-full-dark w-full px-10 mb-5 py-3 text-white font-normal family-poppins text-md rounded-full">Our Membership Plan</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeviceFinder; 