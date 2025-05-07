import React, { useState } from 'react';

const RepairServicesSection = () => {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    setActivePanel(activePanel === index ? null : index);
  };

  const renderServiceCard = (index: number, title: string, description: string, buttonText: string, details: string) => (
    <div className="w-full px-2 md:w-1/1 lg:w-1/3 mt-5">
      <div className="px-5 py-5">
        <h3 className="text-white font-medium text-3xl">{title}</h3>
        <div className="w-full border-b mt-5 border-color"></div>
        <p className="text-light mb-3 font-normal text-sm family-poppins mt-5">{description}</p>
        <button 
          type="button" 
          onClick={() => togglePanel(index)}
          className="blue-text-gradient family-poppins text-md flex items-center font-semibold group"
        >
          {buttonText} 
          <img 
            className={`ml-2 transform transition-transform duration-300 ${activePanel === index ? 'rotate-90' : ''}`} 
            src="/images/hero/right.svg" 
            alt="arrow"
          />
        </button>
        
        {/* Detail Panel */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${activePanel === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="bg-dark/50 rounded-lg p-4 border border-primary/20">
            <p className="text-light font-normal text-sm family-poppins">{details}</p>
            <div className="mt-4 flex justify-end">
              <button 
                type="button"
                className="
                  btn-gradient hover:btn-gradient rounded-full text-white 
                  px-6 py-2 family-poppins font-medium text-sm
                  transform transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-black dark:bg-dark py-5">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {renderServiceCard(
            0,
            "Become a Service Provider",
            "Partner with Techfleet to deliver on-demand tech care. Showcase your skills, set your schedule, and grow with us.",
            "Join Us",
            "As a Techfleet service provider, you'll have access to our network of customers, flexible scheduling, competitive rates, and professional support. Join our community of tech experts and grow your business with us."
          )}
          {renderServiceCard(
            1,
            "Buy with Us",
            "Find top-quality devices and accessories at unbeatable prices. All purchases backed by Techfleet assurance.",
            "Explore Products",
            "Browse our curated selection of devices and accessories. All products come with Techfleet's quality guarantee, warranty protection, and expert support. Shop with confidence knowing you're getting the best value."
          )}
          {renderServiceCard(
            2,
            "Sell with Us",
            "Get the best value for your old devices. Quick and hassle-free process with Techfleet.",
            "Get Started",
            "Sell your devices through our secure platform. We offer competitive prices, quick payment processing, and a hassle-free experience. Our experts will help you get the best value for your devices."
          )}
        </div>
      </div>
    </section>
  );
};

export default RepairServicesSection; 