import React, { useState } from 'react';

const ServiceProviderSection = () => {
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setClickedCard(clickedCard === index ? null : index);
  };

  const renderCard = (index: number) => (
    <div 
      key={index}
      className={`w-full px-2 md:w-1/2 lg:w-1/3 mt-5 group`}
      onClick={() => handleCardClick(index)}
    >
      <div className={`
        border border-color rounded-xl overflow-hidden cursor-pointer
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:border-primary
        ${clickedCard === index ? 'scale-95 rotate-0' : ''}
      `}>
        <div className="relative overflow-hidden">
          <img 
            className="w-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" 
            src="/images/hero/guide.png" 
            alt="Guide illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        </div>
        <div className="px-5">
          <div className="flex justify-start gap-4 items-center">
            <div className="flex items-center mt-5 mr-3">
              <img 
                className="mr-3 transform transition-transform duration-300 ease-in-out group-hover:scale-110" 
                src="/images/hero/calendar.svg" 
                alt="Calendar" 
              />
              <p className="text-light font-normal text-sm family-poppins">November 5, 2024</p>
            </div>
            <div className="flex items-center mt-5">
              <img 
                className="mr-3 transform transition-transform duration-300 ease-in-out group-hover:scale-110" 
                src="/images/hero/guide2.svg" 
                alt="Tech Tips" 
              />
              <p className="text-light font-normal text-sm family-poppins">Tech Tips</p>
            </div>
          </div>
          <h4 className="text-white text-lg mb-2 family-poppins mt-5 transition-colors duration-300 ease-in-out group-hover:text-primary">
            What is Techfleet?
          </h4>
          <p className="text-light mb-8 font-normal text-sm family-poppins">
            Techfleet is smart tech care service and support, on-demand. Techfleet provides Canadians access to...
          </p>
        </div>
      </div>
    </div>
  );

  const renderCategoryTag = (icon: string, label: string, isActive: boolean = false) => (
    <div className={`
      ${isActive ? 'bg-primary' : ''} 
      px-5 py-3 rounded-full mt-5 text-md family-poppins flex items-center
      transform transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg
    `}>
      <img 
        className="mr-3 transform transition-transform duration-300 ease-in-out hover:rotate-12" 
        src={icon} 
        alt={label} 
      />
      <h6 className={`${isActive ? 'blue-text-gradient' : 'text-light'} font-medium text-md family-poppins`}>
        {label}
      </h6>
    </div>
  );

  return (
    <section className="relative dark:bg-dark mt-12">
      <div className="container">
        <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5 sm-none">How-To Guides & Support Articles</h2>
        <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5 web-none">How-To Guides & Support Articles</h2>
        <p className="text-white mb-5 font-normal text-center text-md family-poppins">
          Explore our curated articles to learn about tech care, device repairs, and the latest industry trends.
        </p>
        <div className="flex justify-center items-center flex-wrap mb-5">
          {renderCategoryTag('/images/hero/guide1.svg', 'Photography', true)}
          {renderCategoryTag('/images/hero/guide2.svg', 'Tech Tips')}
          {renderCategoryTag('/images/hero/guide3.svg', 'Gaming')}
          {renderCategoryTag('/images/hero/guide4.svg', 'Mobile Devices')}
          {renderCategoryTag('/images/hero/guide5.svg', 'Repairs')}
        </div>
        <div className="-mx-4 flex flex-wrap">
          {[0, 1, 2].map((index) => renderCard(index))}
        </div>
        <div className="flex justify-center">
          <button 
            type="button" 
            className="
              btn-gradient hover:btn-gradient mt-5 mb-2 rounded-full text-white 
              w-max-content px-10 py-3 family-poppins font-medium text-md 
              transform transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-lg
            "
          >
            Explore All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderSection; 