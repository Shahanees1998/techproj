import React, { useState } from "react";

const WhyChooseUs = () => {
  const [rotatedCard, setRotatedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setRotatedCard(rotatedCard === index ? null : index);
  };

  const cards = [
    {
      icon: "/images/hero/section1-icon1.svg",
      title: "Certified Technicians",
      description: "Skilled experts trained to fix all major devices.",
      borderClass: "blue-border-l"
    },
    {
      icon: "/images/hero/section1-icon2.svg",
      title: "Comprehensive Services",
      description: "Repairs, trade-ins, and support all in one place.",
      borderClass: "green-border-l"
    },
    {
      icon: "/images/hero/section1-icon3.svg",
      title: "Same-Day Service",
      description: "Fast repairs, completed the same day.",
      borderClass: "blue-border-l"
    },
    {
      icon: "/images/hero/section1-icon2.svg",
      title: "Convenient Doorstep Service",
      description: "We come to you—no hassle, no delays.",
      borderClass: "green-border-l"
    }
  ];

  return (
    <section className="pb-8 pt-20 dark:bg-dark bg-primary sm:pt-[20px]">
      <style jsx>{`
        .card-container {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .card {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .card:hover {
          transform: rotateY(180deg);
        }
        .card.rotated {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .card-back {
          transform: rotateY(180deg);
          background: var(--secondary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-align: center;
        }
      `}</style>
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 text-center">
              <h2 className="mb-8 text-5xl font-medium text-white dark:text-white line_heading sm-font1">
                Why Choose TechFleet?
              </h2>
              <p className="text-white family-poppins font-normal dark:text-dark-6">
                Experience reliable, fast, and expert tech care like never before. Here&apos;s what sets us apart.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap items-center mb-5 sm-none">
          {cards.map((card, index) => (
            <div key={index} className="w-full px-5 md:w-1/2 lg:w-1/4 mt-5">
              <div 
                className={`card-container ${rotatedCard === index ? 'rotated' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div style={{height: '200px'}} className={`card bg-secondary ${card.borderClass} px-5 py-10 rounded-xl relative z-10 cursor-pointer`}>
                  <div className="card-front">
                    <img className="mb-3" src={card.icon} alt={card.title} />
                    <h3 className="text-1xl family-poppins font-medium text-white line_heading relative z-40">
                      {card.title}
                    </h3>
                    <p style={{width: '80%'}} className="text-light text-md family-poppins">{card.description}</p>
                  </div>
                  <div className="card-back">
                    <p className="text-white text-lg family-poppins">Click to learn more about our {card.title.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="web-none">
          <div className="-mx-4 flex items-center mb-5 overflow-scroll">
            {cards.map((card, index) => (
              <div key={index} className="w-full px-2 md:w-1/2 lg:w-1/4 mt-5">
                <div 
                  className={`card-container ${rotatedCard === index ? 'rotated' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div style={{height: '200px'}} className={`card bg-secondary sm-first-slide ${card.borderClass} px-5 py-10 rounded-xl relative z-10 cursor-pointer`}>
                    <div className="card-front">
                      <img className="mb-3" src={card.icon} alt={card.title} />
                      <h3 className="text-1xl family-poppins font-medium text-white line_heading relative z-40">
                        {card.title}
                      </h3>
                      <p className="text-light text-md family-poppins">{card.description}</p>
                    </div>
                    <div className="card-back">
                      <p className="text-white text-lg family-poppins">Click to learn more about our {card.title.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
