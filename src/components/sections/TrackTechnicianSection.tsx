import React, { useState } from 'react';

const TrackTechnicianSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const questions = [
    {
      question: "Can you help me recycle my old phone or other electronics?",
      answer: "Yes, we offer comprehensive electronics recycling services. We ensure your old devices are properly disposed of or refurbished in an environmentally friendly way.",
      icon: "/images/logo/nav-down.svg"
    },
    {
      question: "How long does a typical repair take?",
      answer: "Most repairs are completed within 1-2 hours. However, complex issues may take longer. We'll provide you with an accurate time estimate after diagnosis.",
      icon: "/images/logo/nav-down.svg"
    },
    {
      question: "Do you offer warranty on repairs?",
      answer: "Yes, we provide a 90-day warranty on all our repairs and parts. This covers any issues that might arise from the repair work.",
      icon: "/images/logo/nav-down.svg"
    },
    {
      question: "Can I track my repair status?",
      answer: "Yes, you can track your repair status in real-time through our online portal or mobile app. We'll also send you regular updates via email or SMS.",
      icon: "/images/logo/nav-down.svg"
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const renderQuestionItem = (item: typeof questions[0], index: number) => {
    const isActive = activeIndex === index;
    return (
      <div key={index} className="border-b border-color pb-5 mt-5">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleQuestion(index)}
        >
          <p className="text-white text-md font-normal family-poppins">{item.question}</p>
          <img 
            src={item.icon}
            alt={isActive ? "Collapse" : "Expand"}
            className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          />
        </div>
        {isActive && (
          <p className="text-light text-md font-normal family-poppins mt-4">
            {item.answer}
          </p>
        )}
      </div>
    );
  };

  const renderButtons = () => (
    <div className="flex justify-center sm-flex-set">
      <button type="button" className="btn-gradient hover:btn-gradient mt-12 mr-3 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">
        Visit our help center
      </button>
      <button type="button" className="bg-primary hover:btn-gradient mt-12 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">
        Chat with support
      </button>
    </div>
  );

  return (
    <>
      <section className="relative dark:bg-dark mt-5 sm-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/2 lg:w-1/2 mt-5">
              <h2 className="text-white font-medium text-left text-5xl mb-5 mt-5">The 4 Questions People Always Ask</h2>
              {questions.map((item, index) => renderQuestionItem(item, index))}
              {renderButtons()}
            </div>
            <div className="w-full px-5 md:w-1/2 lg:w-1/2 mt-5">
              <img className="w-full" src="/images/hero/faq-img.svg" alt="FAQ illustration" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative dark:bg-dark mt-5 web-none">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/2 lg:w-1/2 mt-5">
              <h2 className="text-white font-medium text-left text-3xl mb-5 mt-5">The 4 Questions People Always Ask</h2>
              {questions.map((item, index) => renderQuestionItem(item, index))}
            </div>
            <div className="w-full px-5 md:w-1/2 lg:w-1/2 mt-5">
              <img className="w-full" src="/images/hero/faq-img.svg" alt="FAQ illustration" />
              <div className="flex justify-center sm-flex-set">
                <button type="button" className="btn-gradient mt-5 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">
                  Visit our help center
                </button>
                <button type="button" className="bg-primary mt-5 rounded-full text-white w-full px-10 py-3 family-poppins font-medium text-md">
                  Chat with support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackTechnicianSection; 