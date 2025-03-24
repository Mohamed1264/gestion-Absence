import { useEffect } from 'react';

function useClickOutSide(callback,popoverRef) {
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            callback()
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
}

export default useClickOutSide;