import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const faqs = [
    {
      title: "Cracked Screen",
      content:
        "Lorem ipsum dolor sit amet consectetur. Velit nisl donec neque arcu pellentesque nisl. Porttitor vel eleifend mi malesuada mauris massa lacus cras. Posuere placerat pellentesque interdum sed sed condimentum tempor nunc. Varius orci praesent netus sit massa nunc lobortis.",
    },
    {
      title: "No Signal",
      content:
        "When your device shows no signal, it could be due to network issues, hardware problems, or software glitches. Our technicians can diagnose and fix the root cause.",
    },
    {
      title: "Water Damage",
      content:
        "Water damage requires immediate attention. Our experts use specialized equipment to dry and repair water-damaged devices, saving your valuable data and hardware.",
    },
    {
      title: "Dead battery",
      content:
        "Battery issues can stem from aging, overcharging, or faulty charging components. We offer battery replacement and repair services to restore your device's power.",
    },
    {
      title: "Speaker not working",
      content:
        "Speaker problems can be caused by hardware damage or software issues. Our team can diagnose and repair audio-related problems effectively.",
    },
    {
      title: "Broken buttons",
      content:
        "Whether it's power, volume, or home buttons, we can repair or replace broken buttons to restore full functionality to your device.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const renderFAQItem = (faq: { title: string; content: string }, index: number) => {
    const isActive = activeIndex === index;
    return (
      <div key={index} className="mb-5">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex items-center">
            <img className="mr-3" src={isActive ? "/images/hero/right-arrow.svg" : "/images/hero/right-arrow-white.svg"} />
            <h6 className={`text-lg family-poppins font-medium ${isActive ? 'text-gradient' : 'text-white'}`}>
              {faq.title}
            </h6>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img src={isActive ? "/images/hero/minus.svg" : "/images/hero/plus.svg"} />
          </a>
        </div>
        {isActive && (
          <p className="text-light family-poppins text-sm border-b border-color pb-8 font-normal mt-4">
            {faq.content}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="py-5 dark:bg-dark sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-2 md:w-1/1 lg:w-3/12 mt-12">
              <div className="flex bg-primary rounded-full w-max-content items-center px-10 py-3">
                <img className="mr-3" src="/images/hero/offer1.svg" />
                <h6 className="blue-text-gradient text-sm family-poppins font-normal">Broken Phones?</h6>
              </div>
              <div className="flex mt-5 rounded-full items-center px-10 py-3">
                <img className="mr-3" src="/images/hero/offer2.svg" />
                <h6 className="text-light text-sm family-poppins font-normal">Broken Tablets?</h6>
              </div>
              <div className="flex mt-5 rounded-full items-center px-10 py-3">
                <img className="mr-3" src="/images/hero/offer3.svg" />
                <h6 className="text-light text-sm family-poppins font-normal">Broken Computers?</h6>
              </div>
              <div className="flex mt-5 rounded-full items-center px-10 py-3">
                <img className="mr-3" src="/images/hero/offer4.svg" />
                <h6 className="text-light text-sm family-poppins font-normal">Broken Game Consoles?</h6>
              </div>
              <div className="flex mt-5 rounded-full items-center px-10 py-3">
                <img className="mr-3" src="/images/hero/offer5.svg" />
                <h6 className="text-light text-sm family-poppins font-normal">Broken TV?</h6>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-6/12 mt-12">
              {faqs.map((faq, index) => renderFAQItem(faq, index))}
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5">
                  <button type="button" className="btn-gradient hover:btn-gradient rounded-full text-white w-full py-3 family-poppins font-medium text-md">Get an Estimate</button>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5">
                  <button type="button" className="bg-primary hover:btn-gradient rounded-full text-white w-full py-3 family-poppins font-medium text-md">Book a Reservation</button>
                </div>
              </div>
            </div>
            <div className="w-full px-2 md:w-1/1 lg:w-3/12 mt-12">
              <img src="/images/hero/we-offer-img.svg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 dark:bg-dark web-none">
        <div className="container">
          <div className="-mx-4">
            <div className="flex px-2 items-center">
              <div className="sm-tab-width">
                <div className="flex mt-5 bg-primary rounded-full w-max-content items-center px-3 py-1">
                  <img className="mr-3" src="/images/hero/offer1.svg" />
                  <h6 className="blue-text-gradient text-xs family-poppins font-normal">Broken Phones?</h6>
                </div>
              </div>
              <div className="sm-tab-width">
                <div className="flex mt-5 rounded-full items-center px-3 py-1">
                  <img className="mr-3" src="/images/hero/offer2.svg" />
                  <h6 className="text-light text-xs family-poppins font-normal">Broken Tablets?</h6>
                </div>
              </div>
            </div>
            <div className="flex px-2 items-center">
              <div className="sm-tab-width">
                <div className="flex mt-5 px-2 rounded-full items-center px-3 py-1">
                  <img className="mr-3" src="/images/hero/offer3.svg" />
                  <h6 className="text-light text-xs family-poppins font-normal">Broken Computers?</h6>
                </div>
              </div>
              <div className="sm-tab-width">
                <div className="flex mt-5 px-2 rounded-full items-center px-3 py-1">
                  <img className="mr-3" src="/images/hero/offer4.svg" />
                  <h6 className="text-light text-xs family-poppins font-normal">Broken Game Consoles?</h6>
                </div>
              </div>
            </div>
            <div className="flex px-2 items-center">
              <div className="flex mt-5 px-2 rounded-full items-center px-3 py-1">
                <img className="mr-3" src="/images/hero/offer5.svg" />
                <h6 className="text-light text-xs family-poppins font-normal">Broken TV?</h6>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-6/12 mt-12">
              {faqs.map((faq, index) => renderFAQItem(faq, index))}
              <div className="-mx-4 flex flex-wrap sm-none">
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5">
                  <button type="button" className="btn-gradient rounded-full text-white w-full py-3 family-poppins font-medium text-md">Get an Estimate</button>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5">
                  <button type="button" className="bg-primary rounded-full text-white w-full py-3 family-poppins font-medium text-md">Book a Reservation</button>
                </div>
              </div>
            </div>
            <div className="w-full px-2 md:w-1/1 lg:w-3/12 mt-12 sm-none">
              <img src="/images/hero/we-offer-img.svg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
