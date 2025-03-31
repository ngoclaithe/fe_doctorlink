import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { HeroSection } from '../../components/home/HeroSection';
import { SpecialtiesSection } from '../../components/home/SpecialtiesSection';
import { ClinicsSection } from '../../components/home/ClinicsSection';
import { DoctorsSection } from '../../components/home/DoctorsSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <SpecialtiesSection />
      {/* <ClinicsSection /> */}
      <DoctorsSection />
    </Layout>
  );
};

export default HomePage;