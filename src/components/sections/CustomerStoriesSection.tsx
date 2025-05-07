import React from 'react';

const CustomerStoriesSection = () => {


  return (
    <section className="pb-8 pt-20 dark:bg-dark">
    <div className="container">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto text-center">
            <h2 className="mb-8 text-5xl font-medium text-white dark:text-white line_heading sm-font1">
             Trade-in Your Tech
            </h2>
            <p className="text-white family-poppins font-normal dark:text-dark-6">
              Why let your old devices gather dust? Trade them in for top value and upgrade to the latest tech effortlessly.
            </p>
          </div>
        </div>
      </div>
      <div className="-mx-4 flex flex-wrap items-center">
        <div className="w-full px-4 flex justify-between md:w-1/1 lg:w-1/1">
          <div className="border bg-primary w-full border-color mt-12 rounded-full px-5 py-8 sm-rounded">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-10 flex justify-center md:w-1/1 lg:w-1/3 mt-5 column-border">
                <div className="mx-auto">
                  <div className="border-gradient padding-step rounded-full w-max-content mx-auto">
                    <div className="bg-primary px-4 py-2 rounded-full text-white font-normal text-sm family-poppins">
                      Step 1
                    </div>
                  </div>
                  <h6 className="text-white mt-5 mb-4 text-lg font-medium family-poppins text-center">Device Valuation</h6>
                  <p className="text-light text-md text-center family-poppins font-normal">Answer a few quick questions about your device.</p>
                </div>
              </div>
              <div className="w-full px-10 flex justify-center md:w-1/1 lg:w-1/3 mt-5 column-border">
                <div className="mx-auto">
                  <div className="border-gradient padding-step rounded-full w-max-content mx-auto">
                    <div className="bg-primary px-4 py-2 rounded-full text-white font-normal text-sm family-poppins">
                      Step 2
                    </div>
                  </div>
                  <h6 className="text-white mt-5 mb-4 text-lg font-medium family-poppins text-center">Instant Offer</h6>
                  <p className="text-light text-md text-center family-poppins font-normal">Get a competitive trade-in quote on the spot.</p>
                </div>
              </div>
              <div className="w-full px-10 flex justify-center md:w-1/1 lg:w-1/3 mt-5">
                <div className="mx-auto">
                  <div className="border-gradient padding-step rounded-full w-max-content mx-auto">
                    <div className="bg-primary px-4 py-2 rounded-full text-white font-normal text-sm family-poppins">
                      Step 3
                    </div>
                  </div>
                  <h6 className="text-white mt-5 mb-4 text-lg font-medium family-poppins text-center">Get Paid or Upgrade</h6>
                  <p className="text-light text-md text-center family-poppins font-normal">Choose cash or credit toward a new device.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button type="button" className="btn-gradient hover:btn-gradient sm-wFull px-10 py-3 text-white font-medium family-poppins text-md rounded-full mt-12">Sell Your Tech</button>
      </div>
    </div>
  </section>
  );
};

export default CustomerStoriesSection; 