import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [activeSection, setActiveSection] = useState<string>("phones");

  const deviceSections = [
    {
      id: "phones",
      title: "Broken Phones?",
      icon: "/images/hero/offer1.svg",
      faqs: [
    {
      title: "Cracked Screen",
          content: "We offer professional screen replacement services for all major phone brands. Our technicians use high-quality replacement parts and ensure perfect installation.",
        },
        {
          title: "Battery Issues",
          content: "Is your phone dying too quickly? We can replace your battery with a genuine replacement to restore your phone's battery life.",
        },
        {
          title: "Water Damage",
          content: "Don't panic if your phone gets wet! Our experts can help recover your device and data from water damage using specialized equipment.",
        },
        {
          title: "Charging Problems",
          content: "Whether it's a broken charging port or faulty charging circuit, we can diagnose and fix your phone's charging issues.",
        },
        {
          title: "Camera Repairs",
          content: "From blurry photos to non-functioning cameras, we can fix all camera-related issues on your phone.",
        },
        {
          title: "Speaker & Microphone",
          content: "We repair speaker and microphone issues, ensuring clear calls and audio playback.",
        },
        {
          title: "Software Issues",
          content: "From system updates to app crashes, we can resolve any software-related problems on your phone.",
        },
        {
          title: "Data Recovery",
          content: "Lost important data? We can help recover your photos, contacts, and other valuable information.",
        }
      ],
    },
    {
      id: "tablets",
      title: "Broken Tablets?",
      icon: "/images/hero/offer2.svg",
      faqs: [
        {
          title: "Screen Repairs",
          content: "We repair cracked and damaged tablet screens with high-quality replacement parts for all major brands.",
        },
        {
          title: "Battery Replacement",
          content: "Extend your tablet's life with our professional battery replacement service.",
        },
        {
          title: "Software Issues",
          content: "From system updates to app problems, we can resolve any software-related issues on your tablet.",
        },
        {
          title: "Charging Port Repairs",
          content: "We fix loose or broken charging ports to ensure reliable charging for your tablet.",
        },
        {
          title: "Touch Screen Issues",
          content: "If your tablet's touch screen is unresponsive or erratic, we can diagnose and fix the problem.",
        },
        {
          title: "Wi-Fi & Connectivity",
          content: "We resolve Wi-Fi connectivity issues and other network-related problems on your tablet.",
        },
        {
          title: "Data Transfer",
          content: "Need to transfer data to a new tablet? We can help with secure data migration.",
        },
        {
          title: "Accessory Repairs",
          content: "We repair and replace tablet accessories including styluses, cases, and covers.",
        }
      ],
    },
    {
      id: "computers",
      title: "Broken Computers?",
      icon: "/images/hero/offer3.svg",
      faqs: [
        {
          title: "Hardware Repairs",
          content: "We fix all types of computer hardware issues including motherboard repairs, RAM upgrades, and hard drive replacements.",
        },
        {
          title: "Virus Removal",
          content: "Our experts can remove viruses and malware while protecting your important data.",
        },
        {
          title: "Performance Issues",
          content: "We can optimize your computer's performance through hardware upgrades and software optimization.",
        },
        {
          title: "Data Recovery",
          content: "Lost important files? We can recover data from damaged or corrupted hard drives.",
        },
        {
          title: "Operating System",
          content: "We can fix OS issues, perform clean installations, and resolve boot problems.",
        },
        {
          title: "Laptop Repairs",
          content: "From broken hinges to keyboard replacements, we handle all laptop-specific repairs.",
        },
        {
          title: "Networking Issues",
          content: "We resolve Wi-Fi, Ethernet, and other networking problems on your computer.",
        },
        {
          title: "Printer Setup",
          content: "We can help set up and troubleshoot printer connectivity issues.",
        }
      ],
    },
    {
      id: "consoles",
      title: "Broken Game Consoles?",
      icon: "/images/hero/offer4.svg",
      faqs: [
        {
          title: "Disc Drive Repairs",
          content: "We fix disc drive issues in all major gaming consoles including PS5, Xbox Series X, and Nintendo Switch.",
        },
        {
          title: "Controller Repairs",
          content: "From stick drift to button issues, we can repair all types of controller problems.",
        },
        {
          title: "Overheating Issues",
          content: "We can resolve overheating problems through proper cleaning and thermal paste replacement.",
        },
        {
          title: "Power Supply",
          content: "We fix power supply issues and replace faulty power adapters for all gaming consoles.",
        },
        {
          title: "HDMI & Display",
          content: "We repair HDMI port issues and resolve display-related problems on gaming consoles.",
        },
        {
          title: "Network Issues",
          content: "We can fix online connectivity problems and improve network performance.",
        },
        {
          title: "System Updates",
          content: "We help with system updates and resolve software-related issues on gaming consoles.",
        },
        {
          title: "Data Recovery",
          content: "Lost game saves? We can help recover your gaming data and profiles.",
        }
      ],
    },
    {
      id: "tv",
      title: "Broken TV?",
      icon: "/images/hero/offer5.svg",
      faqs: [
        {
          title: "Screen Repairs",
          content: "We repair cracked screens and display issues in all major TV brands.",
        },
        {
          title: "Power Problems",
          content: "From power supply issues to main board repairs, we can fix your TV's power-related problems.",
        },
        {
          title: "Smart TV Issues",
          content: "We can resolve software and connectivity issues in smart TVs.",
        },
        {
          title: "HDMI & Ports",
          content: "We repair HDMI ports and other connection issues on your TV.",
        },
        {
          title: "Remote Control",
          content: "We fix remote control issues and provide replacement options if needed.",
        },
        {
          title: "Sound Problems",
          content: "From speaker repairs to audio board issues, we fix all sound-related problems.",
        },
        {
          title: "Mounting Services",
          content: "We offer professional TV mounting services with proper cable management.",
        },
        {
          title: "Picture Quality",
          content: "We can fix picture quality issues including color problems and screen calibration.",
        }
      ],
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setActiveIndex(-1);
  };

  const renderFAQItem = (faq: { title: string; content: string }, index: number) => {
    const isActive = activeIndex === index;
    return (
      <div key={index} className="mb-5 pb-2">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex items-center">
            <img className="mr-3 w-4" src={isActive ? "/images/hero/right-arrow.svg" : "/images/hero/right-arrow-white.svg"} />
            <h6 className={`text-md family-poppins font-medium ${isActive ? 'text-gradient' : 'text-white'}`}>
              {faq.title}
            </h6>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img src={isActive ? "/images/hero/minus.svg" : "/images/hero/plus.svg"} />
          </a>
        </div>
        {isActive && (
          <p className="text-light family-poppins text-sm border-color pb-2 font-normal mt-4">
            {faq.content}
          </p>
        )}

        <img src="/images/hero/stroke.png" className="w-full mt-4" />
      </div>
    );
  };

  const renderSectionButton = (section: typeof deviceSections[0]) => {
    const isActive = activeSection === section.id;
    return (
      <div 
        key={section.id}
        className={`flex mt-5 rounded-full items-center px-10 py-3 cursor-pointer ${isActive ? 'bg-primary' : ''}`}
        onClick={() => handleSectionClick(section.id)}
      >
        <img className="mr-3" src={section.icon} />
        <h6 className={`${isActive ? 'blue-text-gradient' : 'text-light'} text-sm family-poppins font-normal`}>
          {section.title}
        </h6>
      </div>
    );
  };

  const currentSection = deviceSections.find(section => section.id === activeSection);

  return (
    <>
      <section className="py-5 dark:bg-dark sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-2 md:w-1/1 lg:w-3/12 mt-12">
              {deviceSections.map(section => renderSectionButton(section))}
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-6/12 mt-12">
              {currentSection?.faqs.map((faq, index) => renderFAQItem(faq, index))}
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
              {deviceSections.slice(0, 2).map(section => (
                <div key={section.id} className="sm-tab-width">
                  <div 
                    className={`flex mt-5 rounded-full w-max-content items-center px-3 py-1 cursor-pointer ${activeSection === section.id ? 'bg-primary' : ''}`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <img className="mr-3" src={section.icon} />
                    <h6 className={`${activeSection === section.id ? 'blue-text-gradient' : 'text-light'} text-xs family-poppins font-normal`}>
                      {section.title}
                    </h6>
              </div>
                </div>
              ))}
            </div>
            <div className="flex px-2 items-center">
              {deviceSections.slice(2, 4).map(section => (
                <div key={section.id} className="sm-tab-width">
                  <div 
                    className={`flex mt-5 px-2 rounded-full items-center px-3 py-1 cursor-pointer ${activeSection === section.id ? 'bg-primary' : ''}`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <img className="mr-3" src={section.icon} />
                    <h6 className={`${activeSection === section.id ? 'blue-text-gradient' : 'text-light'} text-xs family-poppins font-normal`}>
                      {section.title}
                    </h6>
              </div>
                </div>
              ))}
            </div>
            <div className="flex px-2 items-center">
              {deviceSections.slice(4).map(section => (
                <div key={section.id}>
                  <div 
                    className={`flex mt-5 px-2 rounded-full items-center px-3 py-1 cursor-pointer ${activeSection === section.id ? 'bg-primary' : ''}`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <img className="mr-3" src={section.icon} />
                    <h6 className={`${activeSection === section.id ? 'blue-text-gradient' : 'text-light'} text-xs family-poppins font-normal`}>
                      {section.title}
                    </h6>
                  </div>
              </div>
              ))}
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-6/12 mt-12">
              {currentSection?.faqs.map((faq, index) => renderFAQItem(faq, index))}
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
