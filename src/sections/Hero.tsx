"use client"

import memojiImage from '@/assets/images/memoji-computer.png'
import Image from 'next/image';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import { HeroOrbit } from '@/components/HeroOrbit';
import SparkleIcon from "@/assets/icons/sparkle.svg"
import { useState } from 'react';

export const HeroSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Method 1: Direct download (simpler)
  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv/Swagat_Dash_CV.pdf';
    link.download = 'Swagat-Dash-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Method 2: API download (with analytics)
  const handleApiDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download-cv');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Your-Name-CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download CV');
        // Fallback to direct download
        handleDirectDownload();
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback to direct download
      handleDirectDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return(
  <div  className='py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip'>
   <div
     className='absolute inset-0'
     style={{
       maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
       WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)'
     }}
   >
    <div className='absolute inset-0 -z-30 opacity-5' style={{backgroundImage: `url(${grainImage.src})`}}></div>
    <div className='size-[620px] hero-ring'></div>
    <div className='size-[820px] hero-ring'></div>
    <div className='size-[1020px] hero-ring'></div>
    <div className='size-[1220px] hero-ring'></div>

    <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration='30s' shouldSpin spinDuration='3s'>
      <SparkleIcon className="size-8 text-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration='32s' shouldSpin spinDuration='3s'>
      <SparkleIcon className="size-5 text-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration='34s'>
      <div className="size-2 rounded-full bg-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration='36s' shouldSpin spinDuration='3s'>
      <SparkleIcon className="size-10 text-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration='38s' shouldSpin spinDuration='6s'>
      <StarIcon className="size-12 text-emerald-300" />
    </HeroOrbit>

    <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration='40s' shouldSpin spinDuration='6s'>
      <StarIcon className="size-8 text-emerald-300" />
    </HeroOrbit>

    <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration='42s'> 
      <div className="size-3 rounded-full bg-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration='44s' shouldSpin spinDuration='3s'>
      <SparkleIcon className="size-14 text-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration='46s'>
      <div className="size-3 rounded-full bg-emerald-300/20 " />
    </HeroOrbit>

    <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration='48s' shouldSpin spinDuration='6s'>
      <StarIcon className="size-28 text-emerald-300"/>
    </ HeroOrbit>
    </div>

    <div  className="container">
      <div className='flex flex-col  items-center'>
      <Image src={memojiImage} 
        className="size-[100px]" 
          alt='Person peeking from behind laptop' />
      <div className='bg-gray-950 border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg'>
        <div className='bg-green-500 size-2.5 rounded-full relative'>
          <div className='bg-green-500 absolute inset-0 rounded-full animate-ping-large'></div>
        </div>
        <div className='text-sm font-medium'>Available for New Projects</div>
      </div>
      </div>
      <div className='max-w-lg mx-auto'>
        <h1 className='font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide'>Crafting Scalable Full Stack Solutions for the Modern Web</h1>
        <p className='mt-4 text-center  text-white/60 md:text-lg'>I build high-performance web applications with clean UI and scalable backend systems. From concept to deployment, I turn ideas into reliable full stack solutions. Let&apos;s build something powerful together.</p>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center mt-8 gap-4'>
        <button 
          onClick={handleDirectDownload} // Use handleApiDownload for API method
          disabled={isDownloading}
          className='inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className='font-semibold'>Downloading...</span>
            </>
          ) : (
            <>
              <span className='font-semibold'>Explore My Work</span>
              <ArrowDown className="size-4"/>
            </>
          )}
        </button>

        <button className='inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl'>
          <span>👋</span>
          <span className='font-semibold py'>Let&apos;s connect</span>
        </button>
      </div>
    </div>
  </div>
  )
};