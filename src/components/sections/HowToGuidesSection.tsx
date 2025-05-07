import React, { useState } from "react";

const HowToGuidesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const guides = [
    {
      title: "Battery",
      content: "If your device is not charging, not holding a charge, or dying faster than it should.",
      icon: "/images/hero/white-minus.svg",
      activeIcon: "/images/hero/white-minus.svg",
      inactiveIcon: "/images/hero/dim-plus.svg"
    },
    {
      title: "Camera",
      content: "If your camera is not focusing, showing black screen, or has blurry images.",
      icon: "/images/hero/dim-plus.svg",
      activeIcon: "/images/hero/white-minus.svg",
      inactiveIcon: "/images/hero/dim-plus.svg"
    },
    {
      title: "Software",
      content: "If your device is running slow, freezing, or having app-related issues.",
      icon: "/images/hero/dim-plus.svg",
      activeIcon: "/images/hero/white-minus.svg",
      inactiveIcon: "/images/hero/dim-plus.svg"
    },
    {
      title: "Hardware",
      content: "If your device has physical damage, broken components, or connectivity issues.",
      icon: "/images/hero/dim-plus.svg",
      activeIcon: "/images/hero/white-minus.svg",
      inactiveIcon: "/images/hero/dim-plus.svg"
    },
    {
      title: "Display",
      content: "If your screen is cracked, showing lines, or has touch response issues.",
      icon: "/images/hero/dim-plus.svg",
      activeIcon: "/images/hero/white-minus.svg",
      inactiveIcon: "/images/hero/dim-plus.svg"
    }
  ];

  const toggleGuide = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const renderGuideItem = (guide: typeof guides[0], index: number) => {
    const isActive = activeIndex === index;
    const isFirst = index === 0;
    const isLast = index === guides.length - 1;

    return (
      <div 
        key={index}
        className={`border-t border-l border-r border-color px-5 py-5 ${
          isFirst ? 'border-top-l-radius' : ''
        } ${isLast ? 'border-b' : ''}`}
      >
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleGuide(index)}
        >
          <h6 className={`text-lg family-poppins font-normal ${isActive ? 'text-white' : 'text-dull'}`}>
            {guide.title}
          </h6>
          <img src={isActive ? guide.activeIcon : guide.inactiveIcon} alt={guide.title} />
        </div>
        {isActive && (
          <p className="text-light font-normal family-poppins text-md mt-4">
            {guide.content}
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="bg-black relative dark:bg-dark mt-12 pt-20">
      <div className="container">
        <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5 sm-none">Learn About the Issues We Fix</h2>
        <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5 web-none">Learn About the Issues We Fix</h2>
        <p className="text-white font-normal text-center text-md family-poppins">No matter the problem, we&apos;re here to get your devices back to peak performance.</p>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-12">
            <img className="w-full" src="/images/hero/iphone.svg" alt="iPhone illustration" />
          </div>
          <div className="w-full px-5 md:w-1/1 lg:w-6/12 mt-16">
            <div className="border border-color border-top-l-radius mt-16">
              {guides.map((guide, index) => renderGuideItem(guide, index))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToGuidesSection;
