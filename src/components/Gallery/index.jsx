import React, { useEffect, useRef } from 'react';
import "./style.scss";
import { useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import cn from 'classnames';
import useOnScreen from './../../hooks/useOnScreen';

const images = [
  {
    src:
      "https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1345&q=100",
    title: "Dracaena Trifasciata",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src:
      "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=100",
    title: "Cereus Penuvianus",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src:
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100",
    title: "Calliope",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src:
      "https://images.unsplash.com/photo-1611145367651-6303b46e4040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=100",
    title: "Golden Pothos",
    subtitle: "Living Room",
    category: "Shooting / Adv.Campaing",
  },
];

function GalleryItem ({src,category,title,subtitle,updateActiveimage,index}) { 
  const ref = useRef(null);
  const onscreen =  useOnScreen(ref,0.5);
  useEffect(()=>{
    if(onscreen) { 
      updateActiveimage(index);
    }
  },[onscreen,index]);

  return (
    <div ref={ref} className={cn('gallery-item-wrapper',{"is-reveal" : onscreen})}>
      <div/>
      <div className='gallery-item'>
        <div className='gallery-item-info'>
          <h1 className='gallery-info-title'> {title} </h1>
          <h6 className='gallery-info-subtitle'> {subtitle} </h6>
          <p className='gallery-info-category'> {category} </p>
        </div>
        <div className='gallery-item-image'
        style={{backgroundImage:`url(${src})`}}
        >
        </div>
      </div>
      <div/>
    </div>
  )
}

function Gallery() {
  const ref = useRef(null);
  const [activeImage,setActiveImage] = useState(1);
  useEffect(()=>{
    setTimeout(()=>{
      let sections = gsap.utils.toArray(".gallery-item-wrapper");
      gsap.to(sections , {
        xPercent: -100 * (sections.length - 1),
        ease:"none",
        scrollTrigger:{
          start:"top top",
          trigger : ref.current,
          scroller:"#main-container",
          pin:true,
          scrub:0.5,
          snap:1 / (sections.length - 1),
          end :()=> `+=${ref.current.offsetWidth}`,
        },
      });
      ScrollTrigger.refresh();
    });
  },[]);

    const handleUpdateActiveImage = (index) => {
    setActiveImage(index + 1);
  };

  return (
    <section data-scroll-section className='section-wrapper gallery-wrap' >
      <div className='gallery' ref={ref}>
        <div className='gallery-counter'>
          <span> {activeImage} </span>
          <span className='divider'></span>
          <span>{images.length} </span>
        </div>
        {images.map((image,index)=>(
          <GalleryItem
          key={image.src}
          index={index}
          {...image}
          updateActiveimage={handleUpdateActiveImage }
          />
        ))}
      </div>
    </section>
  )
}

export default Gallery