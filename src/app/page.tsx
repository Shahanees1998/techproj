'use client';

import * as React from 'react';
import '../styles/animate.css'
import '../styles/tailwind.css'
import '../app/globals.css';
import CompareDevicesSection from '@/components/sections/CompareDevicesSection';
import CustomerStoriesSection from '@/components/sections/CustomerStoriesSection';
import DeviceFinder from '@/components/sections/DeviceFinder';
import FAQSection from '@/components/sections/FAQSection';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import HowToGuidesSection from '@/components/sections/HowToGuidesSection';
import IssuesWeFixSection from '@/components/sections/IssuesWeFixSection';
import JoinNetworkSection from '@/components/sections/JoinNetworkSection';
import LocationsSection from '@/components/sections/LocationsSection';
import MembershipSection from '@/components/sections/MembershipSection';
import MobileTechShopSection from '@/components/sections/MobileTechShopSection';
import RepairServicesSection from '@/components/sections/RepairServicesSection';
import ServiceProviderSection from '@/components/sections/ServiceProviderSection';
import TrackTechnicianSection from '@/components/sections/TrackTechnicianSection';
import TradeInSection from '@/components/sections/TradeInSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <TradeInSection />
      <WhyChooseUs />
      <CompareDevicesSection />
      <CustomerStoriesSection />
      <DeviceFinder />
      <FAQSection />
      <HeroSection />
      <HowItWorksSection />
      <HowToGuidesSection />
      <IssuesWeFixSection />
      <JoinNetworkSection />
      <LocationsSection />
      <MembershipSection />
      <MobileTechShopSection />
      <RepairServicesSection />
      <ServiceProviderSection />
      <TrackTechnicianSection />
    </>
  );
}
