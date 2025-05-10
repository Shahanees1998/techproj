import React from 'react';

const TradeInSection = () => {
  return (
    <div
      id="home"
      className="relative overflow-hidden pt-[120px] md:pt-[130px] lg:pt-[130px]"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-10 mt-16 sm-mt-0 sm-px-10 md:w-1/2 lg:w-1/2">
            <div className="wow fadeInUp group" data-wow-delay=".1s">
              <span className="text-md w-auto top-bg-opt sm-fs12 flex justify-center px-4 py-2 rounded-full w-max-content text-white family-poppins flex items-center"><img className="mr-3" src="/images/hero/wifi.svg" /> We’re available in your area immediately</span>
              <h1 className="mb-8 mt-5 sm-banner-FS text-5xl font-medium text-white dark:text-white">
                <span className="text-gradient">Canada’s Tech</span> Trade-in, Care, Repair & Support
              </h1>
        
              <p className="mb-0 mt-4 web-none text-white font-normal family-poppins dark:text-dark-6 lg:mb-9 sm-center">
                Find, sell, fix, compare & learn about tech.
              </p>
              <p className="mb-8 sm-none text-white font-normal family-poppins dark:text-dark-6 lg:mb-9 sm-center">
                Find, sell, fix, compare & learn about tech.
              </p>
              <div className="sm-none bg-white mt-12 mb-10 flex justify-between items-center rounded-full h-80">
                <div className="search-border">
                  <div className="px-5 py-2 flex items-center">
                    <img className="mr-3" src="/images/hero/search-img.svg" />
                    <div>
                      <span className="text-light family-poppins text-sm">What needs help?</span>
                      <h6 className="text-dark family-poppins text-md font-medium">Phones, etc.</h6>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-2 flex items-center">
                  <div>
                    <span className="text-light family-poppins text-sm">Sell / Repair</span>
                    <h6 className="text-white blue-gradient flex items-center family-poppins text-sm px-2 py-1 rounded-full font-medium">Repair <img src="/images/hero/repair.svg" className="ml-2" /></h6>
                  </div>
                </div>
                <button type="button" className="btn-gradient rounded-full px-5 mr-2 py-5"><img src="images/hero/search-icon.svg" /></button>
              </div>
              <div className="web-none bg-white mt-4 mb-4 flex justify-between items-center rounded-full">
             <div className='flex justify-between items-center'>
                <div className="search-border">
                  <div className="px-5 py-2 flex items-center">
                    <img className="mr-3" style={{width:'40px'}} src="/images/hero/search-img.svg" />
                    <div>
                      <span className="text-light family-poppins text-xs">What needs help?</span>
                      <h6 className="text-dark family-poppins text-sm font-medium">Phones, etc.</h6>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-2 flex items-center">
                  <div>
                    <span className="text-light family-poppins text-xs">Sell / Repair</span>
                    <h6 className="text-white blue-gradient flex items-center family-poppins text-sm px-2 py-0 rounded-full font-medium">Repair <img src="/images/hero/repair.svg" className="ml-2 w-3" /></h6>
                  </div>
                </div>
                <button type="button" className="btn-gradient rounded-full mr-2 p-2 h-8"><img className='w-4' src="images/hero/search-icon.svg" /></button>
              </div>
              </div>
              <div className="form-group mb-10 sm-flexSet">
                <input type="checkbox" id="html" />
                <label htmlFor="html" className="text-white family-poppins">I have a membership</label>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/2">
            <div className="wow fadeInUp group flex justify-end" data-wow-delay=".1s">
              <img className="sm-imgfix" src="/images/hero/banner-img.svg" />
              <div>
                <img className="mt-12" src="/images/hero/btn1.svg" />
                <img className="mt-5" src="/images/hero/btn2.svg" />
                <img className="mt-5 mb-10" src="/images/hero/btn3.svg" />
                <img className="mb-5 banner-image" style={{width: '160px'}} src="/images/hero/exp.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeInSection; 