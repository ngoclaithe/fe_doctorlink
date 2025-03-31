import React from 'react';
import { SearchBar } from '../common/SearchBar';
import heroImage from '../../assets/images/home/hero.jpg';

export const HeroSection = () => {
  return (
    <section className="relative h-[500px] mt-16">
      <img 
        src={heroImage}
        alt="Hero" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h1>
        <SearchBar />
      </div>
    </section>
  );
};