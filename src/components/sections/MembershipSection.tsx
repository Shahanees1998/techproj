import React from 'react';

const MembershipSection = () => {
  const renderLocationCard = (image: string, city: string, address: string, isMobile: boolean = false) => (
    <div className={`
      ${isMobile ? 'px-2 py-2' : 'w-full px-2 md:w-1/2 lg:w-2/12 mt-12'}
      group relative
    `}>
      <div className="
        transform transition-all duration-300 ease-in-out
        hover:scale-110 hover:-rotate-2 hover:z-10
        hover:shadow-2xl hover:shadow-primary/20
      ">
        <img 
          className={`
            ${isMobile ? 'sm-first-slide' : 'w-full'} 
            rounded-xl
            transform transition-all duration-500 ease-in-out
            group-hover:rotate-6
          `}
          src={image} 
          alt={city}
        />
        <div className={`
          ${isMobile ? 'px-4 locationmt w-200' : 'px-4 locationmt'}
          transform transition-all duration-300 ease-in-out
          group-hover:translate-y-2
        `}>
          <h6 className={`${isMobile ? 'text-xs' : 'text-md'} text-white font-medium family-poppins`}>
            {city}
          </h6>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-light font-normal family-poppins`}>
            {address}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative dark:bg-dark mt-12 relative sm-none">
        <img className="absolute left-0 top-0" src="/images/hero/location-blur.svg" alt="Background blur" />
        <div className="container relative z-40">
          <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5">Locations We Serve</h2>
          <p className="text-white font-normal text-center text-md family-poppins">
            TechFleet is bringing fast, reliable on-site tech care to cities across Canada. Find out if we&apos;re in your area!
          </p>
          <div className="-mx-4 flex flex-wrap">
            {renderLocationCard('/images/hero/location1.png', 'Mississauga, Ontario', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
            {renderLocationCard('/images/hero/location2.png', 'Calgary, Alberta', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
            {renderLocationCard('/images/hero/location3.png', 'Winnipeg, Manitoba', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
            {renderLocationCard('/images/hero/location4.png', 'Vancouver, BC', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
            {renderLocationCard('/images/hero/location5.png', 'Mississauga, Ontario', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
            {renderLocationCard('/images/hero/location6.png', 'Calgary, Alberta', '300 City Centre Drive, Mississauga, ON L5B 3C1')}
          </div>
          <p className="text-white font-normal text-center text-md mt-12 family-poppins">
            We&apos;re rolling out new locations in cities nationwide. Let us know where you&apos;d like us to serve next, and help shape our expansion!
          </p>
          <div className="flex justify-center">
            <button 
              type="button" 
              className="
                btn-gradient hover:btn-gradient mt-5 mb-10 rounded-full text-white 
                w-max-content px-10 py-3 family-poppins font-medium text-md
                transform transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg
              "
            >
              Request Your City
            </button>
          </div>
        </div>
      </section>

      <section className="relative dark:bg-dark mt-12 relative web-none">
        <img className="absolute left-0 top-0" src="/images/hero/location-blur.svg" alt="Background blur" />
        <div className="container relative z-40">
          <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5">Locations We Serve</h2>
          <p className="text-white font-normal text-center text-md family-poppins">
            TechFleet is bringing fast, reliable on-site tech care to cities across Canada. Find out if we&apos;re in your area!
          </p>
          <div className="flex overflow-scroll" style={{height: '328px'}}>
            {renderLocationCard('/images/hero/location1.png', 'Mississauga, Ontario', '300 City Centre Drive, Mississauga, ON L5B 3C1', true)}
            {renderLocationCard('/images/hero/location2.png', 'Calgary, Alberta', '300 City Centre Drive, Mississauga, ON L5B 3C1', true)}
            {renderLocationCard('/images/hero/location3.png', 'Winnipeg, Manitoba', '300 City Centre Drive, Mississauga, ON L5B 3C1', true)}
          </div>
          <p className="text-white font-normal text-center text-md mt-12 family-poppins">
            We&apos;re rolling out new locations in cities nationwide. Let us know where you&apos;d like us to serve next, and help shape our expansion!
          </p>
          <div className="flex justify-center">
            <button 
              type="button" 
              className="
                btn-gradient mt-5 mb-10 rounded-full text-white 
                w-full px-10 py-3 family-poppins font-medium text-md
                transform transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg
              "
            >
              Request Your City
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipSection; 