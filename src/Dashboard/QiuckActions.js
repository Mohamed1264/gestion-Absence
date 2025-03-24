import { Link, useNavigate } from "react-router-dom"
import {  FileText,PencilRuler, Presentation, School, User, Wand } from "lucide-react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import ShortCut from "../Components/ShortCut"
export default function QuickActions(){
  const nv=useNavigate()
  const iconSize  = 16
  const quickLinks = [
    {
      link :'/addStudent',
      title : 'Ajouter stagiaires',
      icon : <User size={iconSize}/>,
      shortCut : 'S'
    },
    {
      link :'/givePermission',
      title : "Justifier l'absence ",
      icon : <PencilRuler size={iconSize}/>,
      shortCut : 'J'
    },
    {
      link :'/addGroup',
      title : 'Ajouter un group',
      icon : <Presentation size={iconSize}/>,
      shortCut : 'G'
    },
    
    {
      link :'/addRoom',
      title : 'Ajouter une Salle',
      icon : <School size={iconSize} />,
      shortCut : 'R'
    }
  ]

    const [activeMenu,setActiveMenu] = useState(false)
    const handleClick = ()=>{
      setActiveMenu(!activeMenu)
    }


    
    useHotkeys("ctrl+a", handleClick);
    
    useHotkeys("s", ()=>{
      if (activeMenu) {
        nv('/addStudent')
      }
    });
    useHotkeys("j", ()=>{
      if (activeMenu) {
        nv('/givePermission')
      }
    });
    useHotkeys("g", ()=>{
      if (activeMenu) {
        nv('/addGroup')
      }
    });


    useHotkeys("r", ()=>{
      if (activeMenu) {
        nv('/addRoom')
      }
    });


    return (
        <>
        <div className='flex gap-2 items-center justify-end'>
          <div className="relative max-w-60 min-w-44 w-full">
              <button 
                className={`bg-gray-700 px-3 py-2 text-gray-50 group outline-none  hover:bg-gray-600 text-sm flex items-center justify-between gap-2  font-medium w-full ${activeMenu ? 'rounded-t-lg':'rounded-lg'} dark:bg-gray-50 dark:hover:bg-gray-200 dark:text-slate-700`} 
                onClick={handleClick}
                
              >
              <div className="flex items-center gap-2">
                <Wand size={18} />
                <span > Actions rapides </span>
              </div>
              <ShortCut shortCut='Ctrl + A'/>
              
              </button>
              {activeMenu && (
              <div className="absolute  z-50 min-w-full  rounded-b-lg dark:bg-gray-100 bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-2 dark:text-gray-700 text-gray-50">
                    {
                      quickLinks.map(quickLink=>
                        <Link 
                          to={quickLink.link} 
                          className="dark:hover:bg-gray-200 hover:bg-gray-700 rounded-sm flex gap-4 items-center justify-between text-sm p-2 "
                        >
                           <span className="flex items-center gap-2">
                           {quickLink.icon}
                           {quickLink.title}

                           </span>
                           <ShortCut shortCut={quickLink.shortCut}/>
                         
                        </Link>
                      )
                    }
              
                  
                </div>
              </div>
            )}

          </div>
          
        

          </div>
          
        </>
    )
}

