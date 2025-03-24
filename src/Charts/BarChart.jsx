import React, { useState, useRef, useEffect } from "react";
import { XOctagon } from "lucide-react";
import { Link } from "react-router-dom";

 

 


const BarChart = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null); // Track which button triggered the popup
    const popoverRef = useRef(null);
 
  
    // Close popup when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    // Handle button click
    const handleButtonClick = (index) => {
      setCurrentIndex(index); // Update the content based on the button
      setIsOpen(true); // Open the popup
    };
    
    
    return (
        <div className=''>
            <div className="flex gap-3 mx-auto h-64 bg-gray-50 rounded-xl p-4 dark:bg-gray-900">
                {data.map((item, index) => (
                    <div key={index} className=" flex flex-col space-y-2  justify-end items-center text-center h-full w-full cursor-pointer" >
                                <div className="uppercase  font-medium dark:text-gray-50 text-gray-700">{item.value}</div>
                                <div className="bg-violet-200 rounded-md hover:bg-violet-300 dark:hover:bg-violet-500 dark:bg-violet-400 duration-150 w-full " style={{ height: `${item.value}%`}}  onClick={() => handleButtonClick(index)}></div>
                                <div className="h-12 flex justify-center items-center">
                                  <span className="text-center uppercase text-xs dark:text-gray-50 text-gray-700">{item.label}</span>
                                </div>  
                    </div>
                  
                ))}
            </div>
            {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div
                ref={popoverRef}
                className="bg-white border border-gray-300 rounded shadow-lg p-6 max-w-96 dark:border-gray-500 dark:bg-gray-900"
              >
                <div className="flex justify-between items-center mb-3 gap-5">
                  <h3 className="lg:text-lg text-sm font-semibold text-gray-700 dark:text-gray-50">
                    Today Abcense of {data[currentIndex].label}
                  </h3>
                  {/* Close Button */}
                  <button
                    className="text-gray-500 hover:text-red-700 focus:outline-none dark:text-gray-600 dark:hover:text-red-700"
                    onClick={() => setIsOpen(false)}
                  >
                      <XOctagon size={32}/>
                  </button>
                </div>

                {/* main content here */}
                <div className="flex gap-3 mx-auto h-72 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                {data[currentIndex].groups.map((group, index) => (

                    <div key={index} className=" flex flex-col  justify-end items-center text-center h-full w-full " >
                        
                       
                                <div className="uppercase  font-medium text-gray-700 dark:text-gray-50">{group.value}</div>
                                <Link to={`/groupProfile/${1}`} className="bar w-full  bg-violet-200 dark:bg-violet-400 dark:hover:bg-purple-500 rounded-md hover:bg-violet-300 duration-150 " style={{ height: `${group.value}%`}}  >
                                
                                </Link>
                                <div className="uppercase py-3 font-medium text-gray-700 dark:text-gray-50">{group.label}</div>
                            
                    </div>
                  
                ))}
            </div>
                
              </div>
              
            </div>)
            }
    
        </div>
        
    )
};

export default BarChart;
