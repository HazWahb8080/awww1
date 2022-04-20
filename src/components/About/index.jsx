import React, { useEffect, useRef, useState } from 'react';
import "./style.scss";
import SectionHeader from './../Section Header/index';
import gsap from 'gsap';
import cn from "classnames";
import SplitText from "../../utils/Split3.min.js";
import useOnScreen from './../../hooks/useOnScreen';
function About() {
  const ref = useRef();
  const onscreen = useOnScreen(ref);
  const [reveal,setReveal] = useState(false);

  useEffect(()=>{
    if(onscreen) { 
      setReveal(onscreen)
    }
  },[onscreen]);

  useEffect(()=>{

    if(reveal) { 

      const split = new SplitText("#headline",{
        type:"lines",
    });

    gsap.to(split.lines,{
      duration:1,
      opacity:1,
      y:-20,
      stagger:0.1,
      ease:"power2",
    })
  }
  },[reveal]);
  
  return (
    <section className="about-section" data-scroll-section>
      <SectionHeader title='about' />
      <p ref={ref} id="headline" data-scroll className={cn({"is-reveal" : reveal})}>
      
        Flirty Flowers is a blog about flowers and the floral designers who make
        them into art. Creativity and the art of ‘making’ require dialogue. The
        full purpose of the Flirty Flowers blog is to encourage and inspire. We
        value art, we value insight, and we value opinion.
        
      </p>
      
    </section>
  )
}

export default About