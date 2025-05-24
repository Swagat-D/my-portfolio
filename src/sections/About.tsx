'use client'

import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import StarIcon from "@/assets/icons/star.svg"
import bookImage from "@/assets/images/book-cover.png"
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg"
import ReactIcon from "@/assets/icons/react.svg";
import NextIcon from "@/assets/icons/nextJs.svg"
import GithubIcon from "@/assets/icons/github.svg";
import NodejsIcon from "@/assets/icons/nodejs.svg";
import DevopsIcon from "@/assets/icons/devops.svg"
import MapImage from "@/assets/images/map.png";
import smileemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItem } from "@/components/ToolboxItem";
import {motion } from "framer-motion";
import { useRef } from "react";

const toolboxItems = [
  {
    title: 'JavaScript',
    iconType: JavascriptIcon,
  },
  {
    title: 'ReactJs',
    iconType: ReactIcon ,
  },
  {
    title: 'Next.Js',
    iconType: NextIcon ,
  },
  {
    title: 'Github',
    iconType: GithubIcon ,
  },
  {
    title: 'NodeJs',
    iconType: NodejsIcon ,
  },
  {
    title: 'Devops',
    iconType: DevopsIcon,
  },
]

const hobbies =  [
  {
    title: 'Gaming',
    emoji: '🎮',
    left: ' 5%',
    top: ' 5%'
  },
  {
    title: 'Photography',
    emoji: '📷',
    left: ' 50%',
    top: ' 5%'
  },
  {
    title: 'Music',
    emoji: '🎧',
    left: '35% ',
    top: ' 40%'
  },
    {
    title: 'Travel',
    emoji: '✈️',
    left: '10% ',
    top: ' 35%'
  },

  {
    title: 'Fitness',
    emoji: '🏋️‍♂️',
    left: ' 70%',
    top: '45% '
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '5% ',
    top: ' 65%'
  },
  {
    title: 'Sports',
    emoji: '🏸',
    left: ' 45%',
    top: '70% '
  }
]

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return(
    <div className="py-20 lg:py-28">
      <div className="container">
      <SectionHeader eyebrow="About Me" title="A Glimpse into My World" description="Learn more about who I am, what I do and what inspires me." />
      <div className="mt-20 flex flex-col gap-8">
        <div className="md:grid md:grid-cols-5 md:gap-8 lg:grid-cols-3">
        <Card className="h-[320px] col-span-2 lg:col-span-1">
          <CardHeader title="My Reads" description="Explore the books shaping my perspectivs." />
          <div className="w-40 mx-auto mt-8">
          <Image src={bookImage} alt="Book Cover" />
          </div>
        </Card>
        <Card className="h-[320px] p-0 col-span-3 lg:col-span-2 md:mt-0 sm:mt-8">
          <CardHeader title="My ToolBox" description="Explore the technologies and tools I used to craft exceptional digital experiences." className="px-6 pt-6"/>
          <ToolboxItem items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-left [animation-duration:30s]"/>
          <ToolboxItem items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:15s]"/>
        </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
        <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
          <CardHeader title="Beyond The Code" description="Explore my interests and hobbies beyond the digital realm." className="px-6 py-6"/>
            <div className="relative flex-1" ref={constraintRef}>
              {hobbies.map( hobby =>  (
                <motion.div 
                key={hobby.title} 
                className="inline-flex gap-2 px-6 bg-gradient-to-tr from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" style={{
                  left: hobby.left,
                  top: hobby.top,
                }}
                drag
                dragConstraints={constraintRef}
                >
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}
          </div>
        </Card>
        <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
          <Image src={MapImage} alt="map" className="h-full w-full object-cover object-left-top"/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:outline-offset-2 after:rounded-full after:outline-gray-950/30">
            <div className="absolute -z-20 inset-0 rounded-full bg-gradient-to-tr from-emerald-300 to-sky-400 animate-ping [animation-duration:2s]"></div>
          <div className="absolute -z-10 inset-0 rounded-full bg-gradient-to-tr from-emerald-300 to-sky-400 "></div>
          <Image src={smileemoji} alt="smiling emoji" className="size-20"/>
          </div>
        </Card>
        </div>
      </div>
      </div>
    </div>
  ) 
};
