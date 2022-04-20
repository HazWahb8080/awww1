import './App.scss';
import CustomCursor from './components/Custom Cursor';
import Navbar from '../src/components/Navbar';
import Header from '../src/components/Header';
import Gallery from '../src/components/Gallery';
import Footer from '../src/components/Footer';
import Featured from '../src/components/Featured';
import About from '../src/components/About';
import { useEffect, useRef, useState } from 'react';
import useLocoScroll from './hooks/useLocoScroll';

function App() {
  const [preloader,setPreLoader] = useState(true);
  const [timer,setTimer] = useState(1);
  const id = useRef(null);
  useLocoScroll(!preloader);
  const clear = () => { 
    window.clearInterval(id.current);
    setPreLoader(false);
  }
  useEffect(()=>{
    id.current = window.setInterval(()=>{
      setTimer((timer) => timer-1)
    },1000)
  },[]);

  useEffect(()=>{
    if(timer === 0) { 
      clear();
    }
  },[timer])

  return (
    <>
      <CustomCursor/>
      {preloader ? (<div className='loader-wrapper absolute'>
        <h1>Flirty Flowers</h1>
        <h2>Rio de Janeiro</h2>
      </div>) :
     ( <div className='main-container' id="main-container"
     data-scroll-container
     
     
     >
      <Navbar/>
      <Header/>
      <Featured/>
      <About/>
      <Gallery/>
      <Footer/>
      </div>)}
    </>
  );
}

export default App;
