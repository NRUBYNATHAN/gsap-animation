import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IoPerson
} from 'react-icons/io5';
import {
  GiCheckedShield,
  GiCheckMark
} from 'react-icons/gi';
import {
  SiApacheecharts
} from 'react-icons/si';
import {
  FaSmile
} from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';

const CONTENT_CONFIG = {
  leftContent: [
    {
      icon: IoPerson,
      title: "Customers",
      sub_title: "+ 10.000",
      bg: "bg-[#6E6E6E]",
      text: "text-[#FFFFFF]"
    },
    {
      icon: IoMdRocket,
      title: "Shareholder",
      sub_title: "Media House",
      bg: "bg-[#CCE6FF]",
      text: "text-[#000000]"
    },
    {
      icon: FaSmile,
      title: "Employees",
      sub_title: "+ 100",
      bg: "bg-[#FFE5CC]",
      text: "text-[#000000]"
    }
  ],
  rightContent: [
    "Customers and consumers today face a huge choice of products,services and.",
    "Wir sind der bevorzugte Ansprechpartner fur jedes Marketingvorhaben in der region.",
    "A large number of new providers occupy niches and trend themes."
  ]
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftTextPointsRef = useRef<HTMLDivElement[]>([]);
  const rightTextPointsRef = useRef<HTMLDivElement[]>([]);
  const factsTitleRef = useRef<HTMLParagraphElement>(null);
  const factsHeadRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLParagraphElement>(null);
  const uniqueTitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Main section timeline
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleActions: 'play none none reverse'
      }
    });

    // Section-wide animations
    sectionTimeline
      .fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0
      )
      .fromTo(
        factsHeadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1
      )
      .fromTo(
        factsTitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        1
      )
      .fromTo(
        aboutTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        1
      );

    // Animate "Is Your Marketing Unique?" text
    if (uniqueTitleRef.current) {
      const text = "Is your marketing unique?";
      uniqueTitleRef.current.innerHTML = text
        .split("")
        .map((char) => `<span class="inline-block opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      const letters = uniqueTitleRef.current.querySelectorAll('span');

      sectionTimeline.fromTo(
        letters,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          delay: 0.2,
          duration: 0.1,
          ease: "power2.out",
        },
        1
      );
    }

    // Animate left text points
    const leftPoints = leftTextPointsRef.current.filter(Boolean);
    if (leftPoints.length > 0) {
      sectionTimeline.fromTo(
        leftPoints,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out'
        },
        1.2
      );
    }

    // Animate right text points
    const rightPoints = rightTextPointsRef.current.filter(Boolean);
    if (rightPoints.length > 0) {
      sectionTimeline.fromTo(
        rightPoints,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out'
        },
        1.2
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Ref setting functions
  const setLeftTextPointRef = (el: HTMLDivElement | null) => {
    if (el && !leftTextPointsRef.current.includes(el)) {
      leftTextPointsRef.current.push(el);
    }
  };

  const setRightTextPointRef = (el: HTMLDivElement | null) => {
    if (el && !rightTextPointsRef.current.includes(el)) {
      rightTextPointsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="container mx-auto p-16 bg-[#E3E7EB] rounded-[40px] relative"
    >
      <div className="grid lg:grid-cols-[350px_350px] h-full gap-28 justify-center items-start p-6">

        {/* Left Column */}
        <div ref={leftCardRef} className="bg-[#2C2C2C] shadow-lg rounded-xl p-10 relative">

          <div className="absolute -top-20 -left-8 lg:-top-12 lg:-left-12">
            <div className="w-[100px] lg:w-[110px] h-[70px] absolute origin-top-left rotate-[55deg] bg-gradient-to-l from-[#E3E7EB] to-[#b6b7b8] rounded-full" />
            <div className="w-16 h-16 absolute top-[5px] left-[-50px] bg-black rounded-full flex justify-center items-center">
              <IoPerson className="text-white" />
            </div>
          </div>

          <div className='relative'>
            <p className='absolute -top-14 right-2 lg:right-4 w-16 h-16 rounded-full bg-white text-lg flex justify-center items-center'>
              <GiCheckedShield />
            </p>

            <div ref={factsHeadRef} className='flex gap-2 items-center mb-4'>
              <SiApacheecharts className='text-gray-400 text-xl' />
              <p className='text-lg font-bold text-white'>ONE</p>
            </div>

            <p ref={factsTitleRef} className='text-sm font-medium text-white mb-4'>FACTS & FIGURES</p>

            <div className='h-[43vh] overflow-y-scroll no-scrollbar'>
              {CONTENT_CONFIG.leftContent.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={setLeftTextPointRef}
                    className={`${item.bg} mb-4 p-4 rounded-xl text-center flex items-center gap-6`}
                  >
                    <p className='w-16 h-16 rounded-full bg-white flex justify-center items-center'>
                      <IconComponent />
                    </p>
                    <div className={`${item.text} flex flex-col items-start`}>
                      <p>{item.title}</p>
                      <p className="text-md font-bold">{item.sub_title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightCardRef} className="space-y-6">
          <p ref={aboutTitleRef} className='text-lg text-[#D9A089] font-bold mb-6'>ABOUT</p>

          <p
            ref={uniqueTitleRef}
            className='text-4xl font-bold'
          >
            Is your marketing unique?
          </p>

          {CONTENT_CONFIG.rightContent.map((item, index) => (
            <div
              key={index}
              ref={setRightTextPointRef}
              className="flex items-start gap-1"
            >
              <GiCheckMark className="h-5 w-5 flex-shrink-0 pt-2" />
              <label className="text-gray-600">{item}</label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;