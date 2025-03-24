import DropDownMenu from '../DropDownMenu'
import { Link } from 'react-router-dom'
import { Trash2,SquareArrowOutUpRight,Edit,RefreshCcw, CalendarFold } from 'lucide-react'
import { useModalContext } from '../../Functions/ModalContext'

export default function Tbody({ data, config, columns }) {
  const { selectedItem, setActiveModal } = useModalContext();
  const keys = columns.map((col) => col.accessor);
  

  return (
    <tbody className="divide-y  divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
      {data.map((t, index) => (
        <tr
          key={`row_${index}`}
          className={`hover:bg-gray-100  even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600  `}
        >
          {keys.map((key) => setTdContent(t, key))}
          {config.action && (
            <td className="px-6 py-2  whitespace-nowrap text-end text-sm font-medium ">
              {getActionTDContent(t, config, selectedItem, setActiveModal)}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}



function setTdContent (item , key){
     const isArray = Array.isArray(item[key])
     const statusStyle = {
      'Absent' : 'bg-red-200 text-red-900 border-red-600 dark:bg-red-200',
      'Late' : 'bg-yellow-200 text-yellow-900 border-yellow-600 '
     }
     const justifiedStyle = {
         Yes : 'bg-green-200 text-green-900 border-green-600 dark:bg-green-200',
         No : 'bg-yellow-200 text-yellow-900 border-yellow-600 '

     }
     if (isArray) {
       return (
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap  text-xs md:text-sm  font-medium  flex gap-1 flex-wrap items-center">
        {
         item[key].map((g,index)=> <span key={g+index} className="border rounded-lg px-1 py-1  text-xs dark:border-purple-300 dark:bg-purple-700">{g}</span>)
        }
       </td>
       )
     }
     if (key === 'status') {
        return ( 
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">
            <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${statusStyle[item.status] }`}>{item.status}</span>         
          </td>
        )
     }

     if ( key === 'justified') {
      return ( 
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm "> 
            <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${justifiedStyle[item.justified]} `}> {item.justified}</span>       
          </td>
        )
     }

     return <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm "> 
     {item[key]}    
   </td>
}

function getActionTDContent (item ,config,selectedItem,setActiveModal ){

  const {dropDown,resetPassword,links,profile,moreInfo ,key} = config

  if (dropDown) {
       return (
        <DropDownMenu 
        item  = {item}
        primaryKey={key}
      >
        
           {profile && <Link to={`/${links.profile}/${selectedItem?.[key]}`} className="rounded-sm hover:bg-gray-200/60 dark:hover:bg-gray-600 flex gap-2 items-center text-xs p-2"><SquareArrowOutUpRight size={16}/> See More</Link>}
            <Link to={`/${links.edit}/${selectedItem?.[key]}`} className="rounded-sm hover:bg-gray-200/60 dark:hover:bg-gray-600 flex gap-2 items-center text-xs p-2"><Edit size={16}/> Edit</Link>
            {resetPassword && <button  className="hover:bg-gray-200/60 dark:hover:bg-gray-600  rounded-sm flex gap-2 text-xs items-center p-2" onClick={()=>setActiveModal('reset')}><RefreshCcw size={16}  />Reset Password</button>}
            {moreInfo && <button  className="hover:bg-gray-200/60 dark:hover:bg-gray-600  rounded-sm flex gap-2 text-xs items-center p-2 w-full" onClick={()=>setActiveModal('moreInfo')}><CalendarFold size={16}  />See Schedule</button>}
          
          <button onClick={()=>setActiveModal('delete')}  className="text-red-600  hover:bg-red-100 w-full flex gap-2 text-xs items-center rounded-sm p-2  mt-2"> <Trash2 size={16}/>Delete</button>
      </DropDownMenu>
       )
  }
  return <Link 
    to={`/${links.profile}/${item?.cef || item?.id}`} 
    className="inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
    >
        <SquareArrowOutUpRight size={16}/> 
        See More
    </Link>
  
 
}