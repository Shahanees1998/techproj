import React, { useState } from 'react';

type DropdownType = 'brand1' | 'model1' | 'brand2' | 'model2';
type BrandType = 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Xiaomi';
type DeviceType = 'mobile' | 'laptop' | 'tablet' | 'tv';

interface DropdownState {
  brand1: boolean;
  model1: boolean;
  brand2: boolean;
  model2: boolean;
}

interface SelectedOptions {
  brand1: BrandType;
  model1: string;
  brand2: BrandType;
  model2: string;
}

interface Models {
  [key: string]: string[];
}

const IssuesWeFixSection = () => {
  const [activeDropdowns, setActiveDropdowns] = useState<DropdownState>({
    brand1: false,
    model1: false,
    brand2: false,
    model2: false
  });

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    brand1: 'Apple',
    model1: 'iPhone 16 Pro Max',
    brand2: 'Apple',
    model2: 'iPhone 16 Pro Max'
  });

  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('mobile');

  const brands: BrandType[] = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'];
  const models: Models = {
    Apple: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro'],
    Samsung: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'],
    Google: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel 7 Pro', 'Pixel 7'],
    OnePlus: ['OnePlus 12', 'OnePlus 11', 'OnePlus Open', 'OnePlus Nord N30', 'OnePlus 10T'],
    Xiaomi: ['Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13T', 'Xiaomi 13']
  };

  const deviceTypes = [
    { id: 'mobile', icon: '/images/hero/mobile-inactive.png', activeIcon: '/images/hero/mobile-active.png', label: 'Mobiles' },
    { id: 'laptop', icon: '/images/hero/laptop-inactive.png', activeIcon: '/images/hero/laptop-active.png', label: 'Laptops' },
    { id: 'tablet', icon: '/images/hero/tablet-inactive.png', activeIcon: '/images/hero/tablet-active.png', label: 'Tablets' },
    { id: 'tv', icon: '/images/hero/tv-inactive.png', activeIcon: '/images/hero/tv-active.png', label: 'TV' }
  ];

  const toggleDropdown = (dropdown: DropdownType) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const selectOption = (type: DropdownType, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: value
    }));
    setActiveDropdowns(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const renderDropdown = (type: DropdownType, options: string[], isActive: boolean) => {
    return (
      <div className={`absolute z-10 mt-2 w-full bg-secondary rounded-lg shadow-lg transition-all duration-300 ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-primary/20 cursor-pointer transition-colors duration-200"
            onClick={() => selectOption(type, option)}
          >
            <h6 className="text-white text-md font-normal family-poppins">{option}</h6>
          </div>
        ))}
      </div>
    );
  };

  const renderSelectBox = (type: DropdownType, label: string, isActive: boolean, options: string[]) => {
    return (
      <div className="relative">
        <div 
          className="flex border-b border-color pb-3 justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown(type)}
        >
          <h6 className="text-white text-md font-normal family-poppins">{selectedOptions[type]}</h6>
          <img 
            src="/images/logo/nav-down.svg" 
            className={`transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          />
        </div>
        {renderDropdown(type, options, isActive)}
      </div>
    );
  };

  const renderDeviceTypeSection = () => {
    return (
      <div className="bg-primary compare-border-top-l-radius px-10 tab-padding py-5">
        <div className="flex justify-center justify-evenly px-10 items-center sm-px-0">
          {deviceTypes.map((device) => (
            <div 
              key={device.id}
              className={`
                w-full cursor-pointer 
                transform transition-all duration-500 ease-in-out
                hover:scale-110 hover:rotate-3
                ${selectedDevice === device.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}
                relative group
              `}
              onClick={() => setSelectedDevice(device.id as DeviceType)}
            >
              <div className="
                absolute inset-0 
                bg-gradient-to-r from-primary/20 to-secondary/20 
                rounded-xl opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
                transform -rotate-2 group-hover:rotate-2
              "></div>
              <div className="
                relative z-10 
                transform transition-transform duration-500
                group-hover:-translate-y-1
              ">
                <img 
                  className="
                    mx-auto mb-3 compare-icon-h 
                    transform transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-6
                    filter group-hover:brightness-110
                  " 
                  src={selectedDevice === device.id ? device.activeIcon : device.icon} 
                />
                <h6 className={`
                  font-normal text-md family-poppins text-center 
                  transition-all duration-300
                  ${selectedDevice === device.id 
                    ? 'text-white group-hover:text-white' 
                    : 'text-dull group-hover:text-white/90'
                  }
                  transform group-hover:translate-y-1
                `}>
                  {device.label}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="relative dark:bg-dark mt-12 sm-none">
        <div className="container">
          <h2 className="text-white font-medium text-center text-5xl mb-5 mt-5">Compare Devices</h2>
          <p className="text-white font-normal text-center text-md family-poppins">Choose any two devices to see detailed specs, buyback prices, and more.</p>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/1 lg:w-12/12 mt-12">
              {renderDeviceTypeSection()}
              <div className="border-color border-b border-r border-l px-10">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5 compare-border">
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('brand1', 'Brand', activeDropdowns.brand1, brands)}
                      </div>
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('model1', 'Model', activeDropdowns.model1, models[selectedOptions.brand1])}
                      </div>
                    </div>
                    <img className="mt-12 mx-auto" src="/images/hero/apple-device.svg" />
                    <div className="w-full flex justify-center items-center mb-4">
                      <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                        <div className="light-gold rounded-full"></div>
                      </div>
                      <div className="light-grey rounded-full mr-3 mt-5"></div>
                      <div className="light-white rounded-full mr-3 mt-5"></div>
                      <div className="light-dark rounded-full mr-3 mt-5"></div>
                    </div>
                    <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> Desert Titanium</h6>
                  </div>
                  <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('brand2', 'Brand', activeDropdowns.brand2, brands)}
                      </div>
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('model2', 'Model', activeDropdowns.model2, models[selectedOptions.brand2])}
                      </div>
                    </div>
                    <img className="mt-12 mx-auto" src="/images/hero/i16.svg" />
                    <div className="w-full flex justify-center items-center mb-4">
                      <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                        <div className="light-white rounded-full"></div>
                      </div>
                      <div className="light-dark rounded-full mr-3 mt-5"></div>
                    </div>
                    <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> White</h6>
                  </div>
                </div>
              </div>
              <div className="-mx-4 mx-auto px-10 flex flex-wrap mt-5">
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5 flex justify-end">
                  <button type="button" className="btn-gradient hover:btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">Tech Specification</button>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/2 mt-5 flex justify-start">
                  <button type="button" className="bg-primary hover:btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">More Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative dark:bg-dark mt-12 web-none">
        <div className="container">
          <h2 className="text-white font-medium text-center text-3xl mb-5 mt-5">Compare Devices</h2>
          <p className="text-white font-normal text-center text-md family-poppins">Choose any two devices to see detailed specs, buyback prices, and more.</p>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-5 md:w-1/1 lg:w-12/12 mt-12">
              <div className="bg-primary compare-border-top-l-radius px-5 tab-padding py-5">
                <div className="flex justify-center justify-evenly px-10 items-center sm-px-0">
                  {deviceTypes.map((device) => (
                    <div 
                      key={device.id}
                      className={`
                        w-full cursor-pointer 
                        transform transition-all duration-500 ease-in-out
                        hover:scale-110 hover:rotate-3
                        ${selectedDevice === device.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}
                        relative group
                      `}
                      onClick={() => setSelectedDevice(device.id as DeviceType)}
                    >
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-r from-primary/20 to-secondary/20 
                        rounded-xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300
                        transform -rotate-2 group-hover:rotate-2
                      "></div>
                      <div className="
                        relative z-10 
                        transform transition-transform duration-500
                        group-hover:-translate-y-1
                      ">
                        <img 
                          className="
                            mx-auto mb-3 compare-icon-h 
                            transform transition-all duration-500
                            group-hover:scale-110 group-hover:rotate-6
                            filter group-hover:brightness-110
                          " 
                          src={device.icon} 
                        />
                        <h6 className={`
                          font-normal text-md family-poppins text-center 
                          transition-all duration-300
                          ${selectedDevice === device.id 
                            ? 'text-white group-hover:text-white' 
                            : 'text-dull group-hover:text-white/90'
                          }
                          transform group-hover:translate-y-1
                        `}>
                          {device.label}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-color border-b border-r border-l px-5">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                    <div className="-mx-4 flex">
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('brand1', 'Brand', activeDropdowns.brand1, brands)}
                      </div>
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('model1', 'Model', activeDropdowns.model1, models[selectedOptions.brand1])}
                      </div>
                    </div>
                    <img className="mt-12 mx-auto" src="/images/hero/apple-device.svg" />
                    <div className="w-full flex justify-center items-center mb-4">
                      <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                        <div className="light-gold rounded-full"></div>
                      </div>
                      <div className="light-grey rounded-full mr-3 mt-5"></div>
                      <div className="light-white rounded-full mr-3 mt-5"></div>
                      <div className="light-dark rounded-full mr-3 mt-5"></div>
                    </div>
                    <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> Desert Titanium</h6>
                  </div>
                  <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                    <div className="-mx-4 flex">
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('brand2', 'Brand', activeDropdowns.brand2, brands)}
                      </div>
                      <div className="w-full px-5 md:w-1/1 lg:w-1/2 mt-5">
                        {renderSelectBox('model2', 'Model', activeDropdowns.model2, models[selectedOptions.brand2])}
                      </div>
                    </div>
                    <img className="mt-12 mx-auto" src="/images/hero/i16.svg" />
                    <div className="w-full flex justify-center items-center mb-4">
                      <div className="active-box rounded-full flex justify-center items-center mt-5 mr-3">
                        <div className="light-white rounded-full"></div>
                      </div>
                      <div className="light-dark rounded-full mr-3 mt-5"></div>
                    </div>
                    <h6 className="text-white font-normal text-md text-center mb-10 family-poppins"><b>Color:</b> White</h6>
                  </div>
                </div>
              </div>
              <div className="-mx-4 mx-auto flex flex-wrap mt-5">
                <div className="w-full md:w-1/2 lg:w-1/2 mt-5 flex justify-end">
                  <button type="button" className="btn-gradient w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">Tech Specification</button>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mt-5 flex justify-start">
                  <button type="button" className="bg-primary w-280 rounded-full text-white px-10 py-3 family-poppins font-medium text-md">More Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IssuesWeFixSection; 