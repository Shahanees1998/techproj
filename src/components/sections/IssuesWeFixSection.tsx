import React from 'react';

const IssuesWeFixSection = () => {

  return (
    <>
        <section className="relative dark:bg-dark mt-12 sm-none">
      <div className="container">
        <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5">Compare Devices</h2>
        <p className="text-white font-normal text-center text-md family-poppins">Choose any two devices to see detailed specs, buyback prices, and more.</p>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-12/12 mt-12">
            <div className="bg-primary compare-border-top-l-radius px-10 tab-padding py-5">
              <div className="flex justify-center justify-evenly px-10 items-center sm-px-0">
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon1.svg" />
                  <h6 className="text-white font-normal text-md family-poppins text-center">Mobiles</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon2.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">Laptops</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon3.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">Tablets</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon4.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">TV</h6>
                </div>
              </div>
            </div>
            <div className="border-color border-b border-r border-l px-10">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5 compare-border">
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-md font-normal family-poppins">Apple</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-md font-normal family-poppins">iPhone 16 Pro Max</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                  </div>
                  <img className="mt-12 mx-auto" src="/images/hero/apple-device.svg" />
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                      <div className="light-gold rounded-full"></div>
                    </div>
                    <div className="light-grey rounded-full mr-3 mt-5"></div>
                    <div className="light-white rounded-full mr-3 mt-5"></div>
                    <div className="light-dark rounded-full mr-3 mt-5"></div>
                  </div>
                  <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> Desert Titanium</h6>
                </div>
                <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-md font-normal family-poppins">Apple</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-md font-normal family-poppins">iPhone 16 Pro Max</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                  </div>
                  <img className="mt-12 mx-auto" src="/images/hero/i16.svg" />
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                      <div className="light-white rounded-full"></div>
                    </div>
                    <div className="light-dark rounded-full mr-3 mt-5"></div>
                  </div>
                  <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> White</h6>
                </div>
              </div>
            </div>
            <div className="-mx-4 mx-auto px-10 flex flex-wrap mt-5">
              <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5 flex justify-end">
                <button type="button" className="btn-gradient hover:btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">Tech Specification</button>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5 flex justify-start">
                <button type="button" className="bg-primary hover:btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">More Info</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <section className="relative dark:bg-dark mt-12 web-none">
      <div className="container">
        <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5">Compare Devices</h2>
        <p className="text-white font-normal text-center text-md family-poppins">Choose any two devices to see detailed specs, buyback prices, and more.</p>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-12/12 mt-12">
            <div className="bg-primary compare-border-top-l-radius px-5 tab-padding py-5">
              <div className="flex justify-center justify-evenly px-10 items-center sm-px-0">
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon1.svg" />
                  <h6 className="text-white font-normal text-md family-poppins text-center">Mobiles</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon2.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">Laptops</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon3.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">Tablets</h6>
                </div>
                <div className="w-full">
                  <img className="mx-auto mb-3 compare-icon-h" src="/images/hero/compare-icon4.svg" />
                  <h6 className="text-dull font-normal text-md family-poppins text-center">TV</h6>
                </div>
              </div>
            </div>
            <div className="border-color border-b border-r border-l px-5">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                  <div className="-mx-4 flex">
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-xs font-normal family-poppins">Apple</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-xs font-normal family-poppins">iPhone 16 Pro Max</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                  </div>
                  <img className="mt-12 mx-auto" src="/images/hero/apple-device.svg" />
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                      <div className="light-gold rounded-full"></div>
                    </div>
                    <div className="light-grey rounded-full mr-3 mt-5"></div>
                    <div className="light-white rounded-full mr-3 mt-5"></div>
                    <div className="light-dark rounded-full mr-3 mt-5"></div>
                  </div>
                  <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> Desert Titanium</h6>
                </div>
                <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                  <div className="-mx-4 flex">
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-xs font-normal family-poppins">Apple</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                    <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                      <div className="flex border-b border-color pb-3 justify-between items-center">
                        <h6 className="text-white text-xs font-normal family-poppins">iPhone 16 Pro Max</h6>
                        <a href="#"><img src="/images/logo/nav-down.svg" /></a>
                      </div>
                    </div>
                  </div>
                  <img className="mt-12 mx-auto" src="/images/hero/i16.svg" />
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                      <div className="light-white rounded-full"></div>
                    </div>
                    <div className="light-dark rounded-full mr-3 mt-5"></div>
                  </div>
                  <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> White</h6>
                </div>
              </div>
            </div>
            <div className="-mx-4 mx-auto flex flex-wrap mt-5">
              <div className="w-full md:w-1/2 lg:w-1/2 mt-5 flex justify-end">
                <button type="button" className="btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">Tech Specification</button>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/2 mt-5 flex justify-start">
                <button type="button" className="bg-primary w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">More Info</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    </>
  );
};

export default IssuesWeFixSection; 