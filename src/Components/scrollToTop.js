
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {

    const {pathname} = useLocation();

    useEffect(()=>{

      const windowWidth = window.innerWidth;
      const yValue =windowWidth<500? 400 : 680;
        window.scrollTo(0,yValue);
    },[pathname]);
  return null;
}

export default ScrollToTop