import React from 'react';

const JoinNetworkSection = () => {
  return (
   <>
        <section className="py-5 dark:bg-dark track-bg mt-12 relative z-10 sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
              <span className="text-md top-bg-opt px-4 py-2 rounded-full w-max-content text-white family-poppins flex items-center"><img className="mr-3" src="/images/hero/track-icon.svg" /> Newly Launched</span>
              <h2 className="mb-8 mt-5 text-5xl font-medium text-green dark:text-white">
                <span className="text-white">Track your </span> Technician
              </h2>
              <p className="text-white text-md font-normal mb-5 family-poppins">On the day of your repair, TechFleet will send you an email link to track your technician&apos;s exact location in real time.</p>
              <p className="text-white text-md mb-4 font-normal family-poppins">As soon as they&apos;re on their way, you&apos;ll see their ETA clearly displayed, so you know exactly when to expect them.</p>
              <button type="button" className="btn-gradient hover:btn-gradient mt-5 mb-10 rounded-full text-white w-max-content px-10 py-3 family-poppins font-medium text-md">Book A Service</button>
            </div>
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-16">
              <img className="hand-img" src="/images/hero/hand.svg" />
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-dark track-bg mt-12 relative z-10 web-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
              <div className="flex justify-center w-full">
                <span className="text-md top-bg-opt px-4 py-2 rounded-full w-max-content text-white family-poppins flex items-center"><img className="mr-3" src="/images/hero/track-icon.svg" /> Newly Launched</span>
              </div>
              
              <h2 className="mb-8 mt-5 text-4xl text-center font-medium text-green dark:text-white">
                <span className="text-white">Track your </span> Technician
              </h2>
              <p className="text-white text-center text-md font-normal mb-5 family-poppins">{`On the day of your repair, TechFleet will send you an email link to track your technician's exact location in real time.`}</p>
              <p className="text-white text-center text-md mb-4 font-normal family-poppins">{`As soon as they're on their way, you'll see their ETA clearly displayed, so you know exactly when to expect them.`}</p>
              <button type="button" className="btn-gradient mt-5 mb-10 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">Book A Service</button>
            </div>
            <div className="w-full md:w-1/1 lg:w-6/12 mt-16">
              <img className="hand-img" src="/images/hero/hand.svg" />
            </div>
          </div>
        </div>
      </section>
   </>
  );
};

export default JoinNetworkSection; 