
import { filieres, groups, style } from "../Users"
import { RefreshCcw } from "lucide-react"
import { useState } from "react";
export default function  Filter({filterBy,items,setData}){
     //filtre and search
  const [filters,setFilters] = useState({})
    
   
    const filterItems = (items, filters) => {
        return items.filter((Item) => {
          const filiereFilter =  filters.filiere === 'all' || Item.filiere === filters.filiere;
          const yearFilter =   filters.year === 'all' || Item.year === filters.year;
          const niveauFilter =  filters.niveau === 'all' || Item.niveau === filters.niveau
          const genderFilter =  filters.gender === 'Both' || Item.gender === filters.gender
          const groupFilter =  filters.group === 'all' || Item.group === filters.group
          const ageFilter =   (Item.age >= filters.minAge && Item.age <= filters.maxAge)
          const totalAbsence = (Item.totalAbsence >= filters.minTotalAbsence && Item.totalAbsence <= filters.maxTotalAbsence)

          return filiereFilter && yearFilter && niveauFilter && genderFilter && groupFilter && ageFilter && totalAbsence 
        });
      };
      const handleChange= (e)=>{
          const {name,value} = e.target
          const newFilters = {...filters,[name]:value}
          console.log(newFilters);
          
         const newData = filterItems(items,newFilters)
         
        
         setData(newData)
         setFilters(newFilters)
         
          
      }
      const onClick = (defaultValue)=>{
        const newFilters = filters
        if (defaultValue === 'age') {
            delete newFilters.minAge
            delete newFilters.maxAge
        }
        if (defaultValue === 'totalAbsence') {
            delete newFilters.minTotalAbsence
            delete newFilters.maxTotalAbsence
        }
        delete newFilters[defaultValue]
        console.log(newFilters)
         const newData = filterItems(items,newFilters)
      setFilters(newFilters)
       
         
         setData(newData)
       
      }
   
   
    return (
        <div className="p-2 flex items-center  gap-2">
          {/* filiere filter */}
          {
            Array.from(filterBy).includes('filiere') &&
          
            <div className="flex  flex-col w-full basis-1/6">
            <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Filiere</span> 
                    <button onClick={()=>onClick('filiere')}><RefreshCcw size={16}/></button>
               </label>
                                <select   
                                    class={`border  text-sm rounded-b-md   p-2 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                                    name="filiere"
                                    onChange={handleChange}
                                    defaultValue={''}
                                >
                                        <option value={''} selected disabled>All</option>
                                        {filieres.map(f=><option value={f.libel} key={f.id}>{f.libel}</option>)}
                                </select>
                                
            </div>

          }
        

        {/* year filter */}
        {
            Array.from(filterBy).includes('year') &&
            <div class="flex w-full flex-col basis-1/6">
               <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Year</span> 
                    <button onClick={()=>onClick('year')}><RefreshCcw size={16}/></button>
               </label>
               <select   
                  class={`border text-sm rounded-b-md  p-2 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                  name="year"
                  onChange={handleChange}
                  defaultValue={''}
                >
                      <option value={''} selected disabled >All</option>
                      <option value={'first year'}>first year</option>
                      <option value={'second year'}> second year</option>
                      <option value={'third year'}>third year</option>
                    
              </select>
               
            </div>
        }
      
        {/* niveau filter */}
        {
            Array.from(filterBy).includes('niveau') &&
            <div className="flex flex-col w-full basis-1/6">
            <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Niveau</span> 
                    <button onClick={()=>onClick('niveau')}><RefreshCcw size={16}/></button>
               </label>
                     <select   
                        id="niveau" 
                        class={`border text-sm rounded-b-md  py-2 px-3 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                       onChange={handleChange}
                        name="niveau"
                        defaultValue={''}
                      >
                            <option value={''} selected disabled >All</option>
                            <option value={'Technicien Specialise'}>Technicien Specialise</option>
                            <option value={'Technicien'}> Technicien</option>
                            <option value={'Qualification'}>Qualification</option>
                            <option value={'Specialisation'}>Specialisation</option>
                    </select>
                     
                  </div>

        }
            
     
         {/* gender filter */}
         {
            Array.from(filterBy).includes('gender') &&
                  <div className="flex flex-col basis-1/6 w-full">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Gender</span> 
                    <button onClick={()=>onClick('gender')}><RefreshCcw size={16}/></button>
               </label>
                    <div className={`flex gap-4  ${style.input} ${style.border}  rounded-b-md px-3 border  py-2  `}>
                    {/* <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Both'} 
                              defaultChecked
                              
                              className="    accent-purple-400 cursor-pointer"  
                              onChange={handleChange}
                            
                             />
                            <label  className={`  text-sm font-medium  text-gray-700 dark:text-gray-50`}>Both </label>
                        </div> */}
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              onChange={handleChange}
                              checked={filters.gender === "Male"}
                              className="    accent-purple-400 cursor-pointer"  
                            
                             />
                            <label  className={`  text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div class="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'}   
                              checked={filters.gender === "Female"}
                              className="  accent-purple-400 cursor-pointer"  
                              onChange={handleChange}

                            />
                            <label  className={`  text-sm font-medium text-gray-700 dark:text-gray-50 `}>Female </label>
                        </div>
                       
                        
                  
                    </div>
            
                  </div>
         }
        {/* group filter */}
        {
            Array.from(filterBy).includes('group') &&
                  <div className="flex flex-col w-full basis-1/6">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Group</span> 
                    <button onClick={()=>onClick('group')}><RefreshCcw size={16}/></button>
               </label>
                     <select   
                        id="niveau" 
                        class={`border text-sm rounded-b-md  py-2 px-3 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                        onChange={handleChange}
                        name="niveau"
                        defaultValue={''}
                      >
                            <option value={''} selected disabled >All</option>
                            {
                                groups.map(g => <option key={g.libel} value={g.libel}>{g.libel}</option>)
                            }
                    </select>
                     
                  </div>
        }

        {/* age filter */}
        {
            Array.from(filterBy).includes('age') &&
                  <div className="flex flex-col w-full basis-1/6">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Age</span> 
                    <button onClick={()=>onClick('age')}><RefreshCcw size={16}/></button>
               </label>
                     <div className={` rounded-b-md  flex `}>
                        <input className={`border rounded-bl-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput} `} type="number" name="minAge" onChange={handleChange}  placeholder="min age"/>
                        <input className={` border rounded-br-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput}`} type="number" name="maxAge" onChange={handleChange}  placeholder="max age"/>
                       
                     </div>
                     
                  </div>
        }
         {/* totalAbsence filter */}
         {
            Array.from(filterBy).includes('totalAbsence') &&
                  <div className="flex flex-col w-full basis-1/6">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Total Absence</span> 
                    <button onClick={()=>onClick('totalAbsence')}><RefreshCcw size={16}/></button>
               </label>
                     <div className={` rounded-b-md  flex `}>
                        <input 
                            className={`border rounded-bl-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput} `} 
                            type="number" 
                            name="minTotalAbsence" 
                        
                            onChange={handleChange}  
                            placeholder="min "

                        />
                        <input 
                            className={` border rounded-br-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput}`} 
                            type="number" 
                            name="maxTotalAbsence" 
                            defaultValue={filieres.maxAge || 0}
                            onChange={handleChange}  
                            placeholder="max "

                        />
                       
                     </div>
                     
                  </div>
        }
  </div>
    )
}