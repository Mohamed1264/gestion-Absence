import {  
  School,LayoutGrid, ClipboardList,User,
  ChevronRight, PencilRuler, 
  CalendarFold, Presentation, UserCog, UserPen, 
  SquareArrowOutUpRight,Sun,Moon,LogOut,
  TrafficCone,
  UserCheckIcon
} from 'lucide-react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link, NavLink,useLocation,useNavigate } from 'react-router-dom';
import Students from '../Students/Students';

const links = [
  {pageName:'Dashboard',pageLink:'/' , shortCut : 'Shift + D'},
  {pageName:'Filieres',pageLink:'/filieres',shortCut : 'Shift + F'},
  {pageName:'Groups',pageLink:'/groups',shortCut : 'Shift + G'},
  {pageName:'Schedule',pageLink:'/schedule',shortCut : 'Shift + S'},
  {pageName:'Students',pageLink:'/Students',shortCut : 'Shift + S'}
]

const size = 20;
const icons = {
  Dashboard :  <LayoutGrid size={size} />,
  'Filieres' : <PencilRuler size={size}/>,
  'Groups' : <Presentation size={size} />,
  'Schedule' : <CalendarFold size={size}/>,
  'Students' : <UserPen size={size} />
}

export default function SideBar({isOpen,setIsOpen,darkMode,setDarkMode}){
  const location = useLocation()
  const nv = useNavigate()
  const path = location.pathname
  const [settingsMenuIsActive,setSettingsMenuIsActive] = useState(false)

  useHotkeys('shift+f',()=>nv('/filieres'))
  useHotkeys('shift+g',()=>nv('/groups'))
  useHotkeys('shift+s',()=>nv('/schedule'))
  useHotkeys('shift+d',()=>nv('/'))
  useHotkeys('shift+m',()=> setSettingsMenuIsActive(!settingsMenuIsActive))
  useHotkeys('shift+p',()=> '/adminProfile')
  useHotkeys('shift+l',()=> settingsMenuIsActive ? changeMode('light') : null)
  useHotkeys('shift+k',()=> settingsMenuIsActive ? changeMode('dark') : null)

  const style = {
    active :"bg-purple-300 text-purple-700 hover:bg-purple-200 dark:bg-purple-700 dark:text-purple-50 dark:hover:bg-purple-600",
    general : `${isOpen ? 'p-2':'p-1'} flex-1 flex justify-center items-center`,
    hover : "hover:bg-gray-200 dark:hover:bg-gray-600"
  }

  const changeMode = (type) => {
    setDarkMode(type);  
    setSettingsMenuIsActive(false);
  }
  
  return (
    <aside className={`flex flex-col justify-between bg-gray-50 shadow-lg p-4 fixed z-50 h-svh duration-300 ${isOpen ? 'w-56' : 'w-fit'} dark:bg-gray-900`}>
      {/* Logo */}
      <div>
        <Link to={'/'} className="flex items-center gap-3 mb-4 pl-2 pt-1 pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-50">
          <ClipboardList size={24}/>
          {isOpen && <h2 className="text-xl font-bold">EduTrack</h2>}
        </Link>
        <button 
          className={`absolute top-4 -right-4 bg-purple-300 text-purple-700 hover:bg-purple-400 border-purple-400 dark:bg-purple-700 dark:hover:bg-purple-600 px-1 rounded-xl border-2 dark:border-purple-600 dark:text-purple-50`} 
          onClick={()=>setIsOpen(!isOpen)}
        > 
          <ChevronRight size={20} className={`duration-300 ${isOpen && 'rotate-180'}`}/>
        </button>
        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {links.map(link=>
            <NavLink 
              to={link.pageLink} 
              key={link.pageName} 
              className={`flex group relative text-sm items-center gap-3 px-2 py-2 rounded font-semibold ${
                path === link.pageLink 
                  ? 'dark:bg-purple-700 bg-purple-300 text-purple-700 hover:bg-purple-200 dark:text-purple-50 dark:hover:bg-purple-600' 
                  : 'bg-transparent text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {icons[link.pageName]}
              {isOpen ? <span>{link.pageName}</span> : <Toolpit tag={link.pageName} shortCut={link.shortCut}/>}
            </NavLink>
          )}
        </nav>
      </div>
      
      <div className='relative w-full'>
        {settingsMenuIsActive && (
          <div className={`space-y-2 ${isOpen ? 'p-2' : 'px-1 py-2'} absolute z-50 w-full bg-gray-100/95 dark:bg-gray-800/85 rounded-md bottom-11 rounded-b-md text-gray-700 dark:text-gray-50`}>
            <Link 
              to='/adminProfile' 
              className={`flex text-sm relative group rounded-md items-center gap-2 w-full ${isOpen ? 'p-2 justify-start' : 'p-1 justify-center'} hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold`} 
              onClick={()=>setSettingsMenuIsActive(false)}
            >
              <SquareArrowOutUpRight size={16}/>
              {isOpen ? 'Profile' : <Toolpit tag={'Profile'} shortCut={'Shift + P'}/>}
            </Link>
            
            <button 
              className={`flex text-sm relative items-center group gap-2 ${isOpen ? 'p-2 justify-start' : 'p-1 justify-center'} rounded-md w-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold`} 
              onClick={()=>setSettingsMenuIsActive(false)}
            >
              <LogOut size={16} />
              {isOpen ? <span>Log out</span> : <Toolpit tag={'Log Out'}/>}
            </button>

            <div className={`flex items-center ${isOpen ? 'flex-row' : 'flex-col'} rounded-md`}>
              <button 
                className={`${style.general} relative group ${isOpen ? 'rounded-l-md' : 'rounded-t-md'} ${darkMode === 'light' ? style.active : style.hover}`}
                onClick={()=>changeMode('light')}
              >
                {!isOpen && <Toolpit tag={'Light Mode'} shortCut={'Shift + L'}/>}
                <Sun size={16}/>
              </button>
              <button 
                className={`${style.general} relative group font-semibold ${isOpen ? 'rounded-r-md' : 'rounded-b-md'} ${darkMode === 'dark' ? style.active : style.hover}`}
                onClick={()=>changeMode('dark')}
              >
                {!isOpen && <Toolpit tag={'Dark Mode'} shortCut={'Shift + K'}/>}
                <Moon size={16}/>
              </button>
            </div>
          </div>
        )}
        
        <button 
          className="flex relative group items-center gap-3 cursor-pointer py-1 outline-none" 
          onClick={()=>setSettingsMenuIsActive(!settingsMenuIsActive)}
        >
          <div className="size-8 bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full flex items-center justify-center">
            <User size={20}/>
          </div>
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-50">Adam Taylor</div>
            </div>
          ) : (
            <Toolpit tag={'Settings'} shortCut={'Shift + M'}/>
          )}
        </button>
      </div>   
    </aside>
  )
}

const Toolpit = ({tag, shortCut}) => {
  return (
    <span className='absolute invisible group-hover:visible left-10 z-50 px-2 flex items-center gap-1 flex-col py-1 text-nowrap rounded-md shadow-md text-xs text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-50'>
      <span>{tag}</span>
      <span className='font-medium'>{shortCut}</span>
    </span>
  )
}