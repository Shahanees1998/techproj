import React, { useState } from 'react';

const LocationsSection = () => {
  const [rotatedCard, setRotatedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setRotatedCard(rotatedCard === index ? null : index);
  };

  const customerStories = [
    {
      product: "iPhone 13 mini 256GB - Midnight - Unlocked Physical SIM",
      review: "I went with the lowest priced option/quality, there was one sorta distracting scratch on the screen glass, but I knew for the lowest quality it wouldn't be like new...",
      rating: "5/5",
      customer: "Kelley K."
    },
    {
      product: "iPhone 13 mini 256GB - Midnight - Unlocked Physical SIM",
      review: "I went with the lowest priced option/quality, there was one sorta distracting scratch on the screen glass, but I knew for the lowest quality it wouldn't be like new...",
      rating: "5/5",
      customer: "Kelley K."
    },
    {
      product: "iPhone 13 mini 256GB - Midnight - Unlocked Physical SIM",
      review: "I went with the lowest priced option/quality, there was one sorta distracting scratch on the screen glass, but I knew for the lowest quality it wouldn't be like new...",
      rating: "5/5",
      customer: "Kelley K."
    },
    {
      product: "iPhone 13 mini 256GB - Midnight - Unlocked Physical SIM",
      review: "I went with the lowest priced option/quality, there was one sorta distracting scratch on the screen glass, but I knew for the lowest quality it wouldn't be like new...",
      rating: "5/5",
      customer: "Kelley K."
    }
  ];

  return (
    <>
      <style jsx>{`
        .card-container {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .card {
          transition: transform 0.6s;
          transform-style: preserve-3d;
          height: 100%;
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
          padding: 1.25rem;
        }
        .card-back {
          transform: rotateY(180deg);
          background: var(--secondary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 0.75rem;
        }
      `}</style>
      <section className="relative dark:bg-dark mt-12 sm-none">
        <div className="container">
          <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5">Customer Stories</h2>
          <p className="text-white font-normal text-center text-md family-poppins">Hear from real people who&apos;ve experienced TechFleet&apos;s exceptional repair and trade-in services.</p>
          <div className="-mx-4 flex flex-wrap">
            {customerStories.map((story, index) => (
              <div key={index} className="w-full px-2 md:w-1/2 lg:w-1/4 mt-12">
                <div 
                  className={`card-container ${rotatedCard === index ? 'rotated' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div style={{height: '400px'}}  className="card border border-color rounded-xl cursor-pointer">
                    <div className="card-front">
                      <div className="flex items-start">
                        <img className="mr-3" src="/images/hero/product.svg" alt="Product" />
                        <p className="text-white font-normal text-sm family-poppins">{story.product}</p>
                      </div>
                      <div className="w-full border-b mt-5 border-color"></div>
                      <p className="text-white mb-3 font-normal text-sm family-poppins mt-5">{story.review}</p>
                      <div className="flex items-center">
                        <img className="mr-3" src="/images/hero/rating.svg" alt="Rating" />
                        <p className="text-white font-normal text-sm family-poppins">{story.rating}</p>
                      </div>
                      <div className="flex items-center mt-5">
                        <img className="mr-3" src="/images/hero/client.svg" alt="Client" />
                        <p className="text-white font-normal text-md family-poppins">{story.customer}</p>
                      </div>
                    </div>
                    <div className="card-back">
                      <p className="text-white text-lg family-poppins">Thank you for your trust in TechFleet! We&apos;re glad to have served you.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative dark:bg-dark mt-12 web-none">
        <div className="container">
          <h2 className="text-white font-medium text-left text-3xl mb-5 mt-5">Customer Stories</h2>
          <p className="text-white font-normal text-left text-md family-poppins">Hear from real people who&apos;ve experienced TechFleet&apos;s exceptional repair and trade-in services.</p>
          <div className="flex overflow-scroll">
            {customerStories.map((story, index) => (
              <div key={index} className="px-2 mt-5">
                <div 
                  className={`card-container ${rotatedCard === index ? 'rotated' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div style={{height: '400px'}} className="card border border-color rounded-xl cursor-pointer sm-first-slide">
                    <div className="card-front">
                      <div className="flex items-start">
                        <img className="mr-3" src="/images/hero/product.svg" alt="Product" />
                        <p className="text-white font-normal text-sm family-poppins">{story.product}</p>
                      </div>
                      <div className="w-full border-b mt-5 border-color"></div>
                      <p className="text-white mb-3 font-normal text-sm family-poppins mt-5">{story.review}</p>
                      <div className="flex items-center">
                        <img className="mr-3" src="/images/hero/rating.svg" alt="Rating" />
                        <p className="text-white font-normal text-sm family-poppins">{story.rating}</p>
                      </div>
                      <div className="flex items-center mt-5">
                        <img className="mr-3" src="/images/hero/client.svg" alt="Client" />
                        <p className="text-white font-normal text-md family-poppins">{story.customer}</p>
                      </div>
                    </div>
                    <div className="card-back">
                      <p className="text-white text-lg family-poppins">Thank you for your trust in TechFleet! We&apos;re glad to have served you.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationsSection; 