import React from 'react';

const HeroSection = () => {
  return (
    <>
        <section className="py-5 dark:bg-dark sm-none">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <img src="/images/hero/how-work.svg" />
          </div>
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-16">
            <h2 className="text-white font-medium text-5xl mb-5 mt-5 font-dm-serif-display">How It Works?</h2>
            <p className="text-white font-normal text-md family-poppins">Simple Steps to Solve Your Tech Needs</p>
            <div className="dashed sm-none"></div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="blue-gradient h-max-content rounded-md px-2 py-1 text-white font-semibold text-md family-poppins mr-3">01</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">Choose Your Service</h5>
                <p className="text-light text-sm family-poppins font-normal w-2/3">Select the service you need—repair, trade-in, or tech support—on our website or app.</p>
              </div>
            </div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="btn-gradient h-max-content rounded-md px-2 py-1 text-white font-semibold text-md family-poppins mr-3">02</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">Schedule and Relax</h5>
                <p className="text-light text-sm family-poppins font-normal w-2/3">Pick a time and location that works for you. Our on-demand technicians will come to you, or choose our mail-in option.</p>
              </div>
            </div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="blue-gradient h-max-content rounded-md px-2 py-1 text-white font-semibold text-md family-poppins mr-3">03</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">We Fix or Trade Your Device</h5>
                <p className="text-light text-sm family-poppins font-normal w-2/3">{`Our experts handle the rest. Whether it's a repair, trade-in, or tech issue, we'll get it done with guaranteed quality.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-5 dark:bg-dark web-none">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <img src="/images/hero/how-work.svg" />
          </div>
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-16">
            <h2 className="text-white font-medium text-5xl mb-5 mt-5 font-dm-serif-display">How It Works?</h2>
            <p className="text-white font-normal text-md family-poppins">Simple Steps to Solve Your Tech Needs</p>
            <div className="dashed"></div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="blue-gradient h-max-content rounded-xl px-3 py-2 text-white font-semibold text-2xl family-poppins mr-3">01</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">Choose Your Service</h5>
                <p className="text-light text-sm family-poppins font-normal">Select the service you need—repair, trade-in, or tech support—on our website or app.</p>
              </div>
            </div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="btn-gradient h-max-content rounded-xl px-3 py-2 text-white font-semibold text-2xl family-poppins mr-3">02</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">Schedule and Relax</h5>
                <p className="text-light text-sm family-poppins font-normal">Pick a time and location that works for you. Our on-demand technicians will come to you, or choose our mail-in option.</p>
              </div>
            </div>
            <div className="flex items-start mt-12 relative z-10">
              <div className="blue-gradient h-max-content rounded-xl px-3 py-2 text-white font-semibold text-2xl family-poppins mr-3">03</div>
              <div>
                <h5 className="text-white text-lg family-poppins font-normal">We Fix or Trade Your Device</h5>
                <p className="text-light text-sm family-poppins font-normal">{`Our experts handle the rest. Whether it's a repair, trade-in, or tech issue, we'll get it done with guaranteed quality.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection; 