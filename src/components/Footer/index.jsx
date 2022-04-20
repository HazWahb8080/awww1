import React, { useEffect, useRef, useState } from 'react';
import "./style.scss";
import SectionHeader from './../Section Header/index';
import SplitText from "../../utils/Split3.min.js";
import gsap from 'gsap';
import useOnScreen from './../../hooks/useOnScreen';
import  cn  from 'classnames';


function Footer() {
   const ref = useRef(null);
   const [reveal,setReveal] = useState(false);
  const onscreen = useOnScreen(ref);

  useEffect(()=>{
    if(onscreen) { 
      setReveal(onscreen)
    }
  },[onscreen]);

  useEffect(()=>{
    if(reveal) { 
      const split = new SplitText("#location-text",{
        type:"lines",
        linesClass:"lineChildren"
      });
      
    const splitParent = new SplitText("#location-text",{
      type:"lines",
      linesClass:"lineParent"
    });
    gsap.fromTo(split.lines, 
      {y:200}, 
      {
      duration:1,
      y:0,
      stagger:0.1,
      ease:"power2",
    });
    }
  },[reveal]);

  return (
    <section className='footer' data-scroll-section>
      <SectionHeader title={'Made in'} />
      <h1 ref={ref} className={cn('location',{"is-reveal":reveal})} id='location-text'>
        Rio de Janeiro
      </h1>
      
    </section>
  )
}

export default Footer