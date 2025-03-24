//hooks
import { useState ,useMemo} from "react";
import { useHotkeys } from "react-hotkeys-hook";
//icon
import { Filter} from "lucide-react";
//contenxt
import {useModalContext} from '../../Functions/ModalContext'
//functions
import {sortList} from '../../Functions/Sotring'
import { filterFunction } from "../../Functions/filterData";
//Components
import { TableFooter, Theader } from "./TableComponents";
import SearchBar from "./SearchBar";

import DeleteModal from "../Modals/DeleteModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import MoreInfoModal from "../Modals/MoreInfoModal";
import FilterSection from "../Filter";
import Tbody from './Tbody'
import { Export } from "./Export";

export default function Table ({dataset,config}){
  const {name,searchBy,filterBy,action,columns} = config

  const {activeModal} = useModalContext();

  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerms,setFilterTerms] = useState({})
  const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
  const [filterFocus,setFilterFocus] = useState(false)
  //modals
  const modals = {
    'delete' : <DeleteModal name={name} />,
    'reset' :  <ResetPasswordModal  topic={name}/>,
    'moreInfo' : <MoreInfoModal config={config}/>
  }

  const onSearch = (value)=> setSearchTerm(value)

  const displayedData = useMemo( ()=> 
    filterFunction(dataset,searchBy,filterTerms,searchTerm) , 
    [dataset,searchBy,filterTerms,searchTerm]
  )
  //sorting functions
  const changeCol = (col)=>{
    setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
  }
  const sortedData = displayedData.sort((a,b)=> sortList(a,b,sortedBy))
    
  useHotkeys("shift+f", () => setFilterFocus(!filterFocus));
   
  return (
      <div className=" min-w-full max-w-5xl inline-block align-middle overflow-y-visible rounded-lg border border-gray-300 divide-y divide-gray-300 relative dark:divide-gray-500 dark:border-gray-500">
       <div className="p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {
              searchBy && 
              <SearchBar  
                columnNames={searchBy} 
                searchTerm={searchTerm} 
                handleChange={onSearch} 
              />
            }
            {
              filterBy && sortedData.length>0  &&
              <button className={`relative group flex items-center gap-2 rounded-md px-3 outline-none py-1.5 border  ${filterFocus ? 'border-purple-600  text-purple-600' : 'dark:border-gray-600 border-gray-300 text-gray-300  dark:text-gray-600'}`} onClick={()=>setFilterFocus(!filterFocus)}>
                  <Filter size={16}/>
                  <span>Filters</span>
                  <span className={`${Object.keys(filterTerms).length ? ' bg-purple-300 text-purple-700 dark:text-purple-50  dark:bg-purple-700 ' : 'text-gray-300 dark:text-gray-600 bg-gray-50  dark:bg-gray-700 '} ${filterFocus && 'border-purple-600 ' }  text-sm font-medium absolute -top-1 -right-2 size-5 rounded-lg flex items-center justify-center`}>{Object.keys(filterTerms).length }</span>
            </button>
            }
          </div>

          <Export 
            isDisabled={!sortedData.length} 
            name={name}
            columns={columns}
            sortedData={sortedData}
          />

       </div>
        {/* filter Zone */}
       {
        filterFocus  && 
        <FilterSection  
          filterBy={filterBy} 
          setFilterTerms={setFilterTerms} 
          filterTerms={filterTerms}
        />
       }
      {
        sortedData.length ? 
        <table className="min-w-full max-w-4xl   divide-y divide-gray-100  dark:divide-gray-500 rounded-lg ">
          <Theader columns={columns} change={changeCol} isAction ={action}/>
          <Tbody data={sortedData} config={config} columns={columns}/>
        </table>
        :
        <p className="p-3 text-center text-sm font-medium text-gray-300 dark:text-gray-400">`No results found. Try adjusting your search or filter criteria.`</p>
       }
       <TableFooter numberResult={sortedData.length} />
      {
        activeModal  && modals[activeModal]
      } 
    </div>  
    )
}