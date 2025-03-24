
import { filieres, groups, style } from "../Data/Users"
import {  RefreshCcw } from "lucide-react"

export default function  Filter({filterBy,setFilterTerms,filterTerms}){
     
      // const handleChange= (e)=>{
      //     const {name,value} = e.target 
      //     if (name === 'to' || name === 'from') {
      //       if (!value) {
      //         const newFilters = {...filterTerms}
      //         delete newFilters[name]
      //         setFilterTerms(newFilters)
      //         return false
      //       }
      //       const newValue = value.split('/').reverse().join('-')
      //       setFilterTerms({...filterTerms, [name] : newValue})  
            
      //     }
      //    setFilterTerms({...filterTerms, [name] : value})  
      // }
      
      // const onClick = (defaultValue)=>{
      //   const newFilters = {...filterTerms}
      //   if (defaultValue === 'age') {
      //       delete newFilters.minAge
      //       delete newFilters.maxAge
      //   }
      //   if (defaultValue === 'totalAbsence') {
      //       delete newFilters.minTotalAbsence
      //       delete newFilters.maxTotalAbsence
      //   }
      //   if (defaultValue === 'date') {
      //     delete newFilters.to
      //     delete newFilters.from
      // }
      //   delete newFilters[defaultValue]
      //   setFilterTerms(newFilters)
       
         
         
       
      // }
      const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filterTerms };
    
        if (name === 'to' || name === 'from') {
            if (!value) {
                delete newFilters[name];
            } else {
                newFilters[name] = value.split('/').reverse().join('-');
            }
        } else if (value) {
            newFilters[name] = value;
        } else {
            delete newFilters[name];
        }
    
        setFilterTerms(newFilters);
    };
    
    const onClick = (defaultValue) => {
        const newFilters = { ...filterTerms };
    
        switch (defaultValue) {
            case 'age':
                delete newFilters.minAge;
                delete newFilters.maxAge;
                break;
            case 'totalAbsence':
                delete newFilters.minTotalAbsence;
                delete newFilters.maxTotalAbsence;
                break;
            case 'date':
                delete newFilters.to;
                delete newFilters.from;
                break;
            default:
                delete newFilters[defaultValue];
                break;
        }
    
        setFilterTerms(newFilters);
    };
   
   
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
                                    className={`border  text-sm rounded-b-md   p-2 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                                    name="filiere"
                                    onChange={handleChange}
                                    value={!filterTerms.filiere && ''}
                                >
                                        <option value={''} selected disabled>All</option>
                                        {filieres.map(f=><option value={f.libel} key={f.id}>{f.libel}</option>)}
                                </select>
                                
            </div>

          }
        

        {/* year filter */}
        {
            Array.from(filterBy).includes('year') &&
            <div className="flex w-full flex-col basis-1/6">
               <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Year</span> 
                    <button onClick={()=>onClick('year')}><RefreshCcw size={16}/></button>
               </label>
               <select   
                  className={`border text-sm rounded-b-md  p-2 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                  name="year"
                  onChange={handleChange}
                  value={!filterTerms.year && ''}
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
                        className={`border text-sm rounded-b-md  py-2 px-3 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                       onChange={handleChange}
                        name="niveau"
                        value={!filterTerms.niveau && ''}
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
                    
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              onChange={handleChange}
                              checked={filterTerms.gender === 'Male'}
                              className="    accent-purple-400 cursor-pointer"  
                            
                             />
                            <label  className={`  text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'}   
                               checked={filterTerms.gender === 'Female'}
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
                        className={`border text-sm rounded-b-md  py-2 px-3 outline-none ${style.input} ${style.border} ${style.focusInput} `}  
                        onChange={handleChange}
                        name="group"
                        value={!filterTerms.group && ''}
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
                        <input 
                            className={`border rounded-bl-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput} `} 
                            type="number" 
                            value={filterTerms.minAge || ''} 
                            name="minAge" 
                            onChange={handleChange}  
                            placeholder="min age"


                        />
                        <input 
                            className={` border rounded-br-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput}`} 
                            type="number" 
                            name="maxAge"
                            value={filterTerms.maxAge || ''} 
                            onChange={handleChange}  
                            placeholder="max age"

                            />
                       
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
                            value={filterTerms.minTotalAbsence || ''}
                            onChange={handleChange}  
                            placeholder="min "

                        />
                        <input 
                            className={` border rounded-br-md text-sm placeholder:text-sm max-w-24 px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput}`} 
                            type="number" 
                            name="maxTotalAbsence" 
                            value={filterTerms.maxTotalAbsence || ''}
                            onChange={handleChange}  
                            placeholder="max "

                        />
                       
                     </div>
                     
                  </div>
        }

        {/* status filter */}
        {
            Array.from(filterBy).includes('status') &&
                  <div className="flex flex-col basis-1/6 w-full">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Status</span> 
                    <button onClick={()=>onClick('status')}><RefreshCcw size={16}/></button>
               </label>
                    <div className={`flex gap-4  ${style.input} ${style.border}  rounded-b-md px-3 border  py-2  `}>
                    
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="status" 
                              value={'Absent'} 
                              onChange={handleChange}
                              checked={filterTerms.status === 'Absent'}
                              className="    accent-purple-400 cursor-pointer"  
                            
                             />
                            <label  className={`  text-sm font-medium  text-gray-700 dark:text-gray-50`}>Absent </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="status" 
                              value={'Late'}   
                               checked={filterTerms.status === 'Late'}
                              className="  accent-purple-400 cursor-pointer"  
                              onChange={handleChange}

                            />
                            <label  className={`  text-sm font-medium text-gray-700 dark:text-gray-50 `}>Late </label>
                        </div>
                       
                        
                  
                    </div>
            
                  </div>
         }
         {/* justify filter */}
         {
            Array.from(filterBy).includes('justified') &&
                  <div className="flex flex-col basis-1/6 w-full">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Justified</span> 
                    <button onClick={()=>onClick('justified')}><RefreshCcw size={16}/></button>
               </label>
                    <div className={`flex gap-4  ${style.input} ${style.border}  rounded-b-md px-3 border  py-2  `}>
                    
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="justified" 
                              value={'Yes'} 
                              onChange={handleChange}
                              checked={filterTerms.justified === 'Yes'}
                              className="    accent-purple-400 cursor-pointer"  
                            
                             />
                            <label  className={`  text-sm font-medium  text-gray-700 dark:text-gray-50`}>Yes </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input 
                              type="radio" 
                              name="justified" 
                              value={'No'}   
                               checked={filterTerms.justified === 'No'}
                              className="  accent-purple-400 cursor-pointer"  
                              onChange={handleChange}

                            />
                            <label  className={`  text-sm font-medium text-gray-700 dark:text-gray-50 `}>No </label>
                        </div>
                       
                        
                  
                    </div>
            
                  </div>
         }

          {/* date filter */}
          {
            Array.from(filterBy).includes('date') &&
                  <div className="flex flex-col w-full basis-2/6">
                  <label  className={`px-3 py-2 flex items-center justify-between rounded-t-md border border-b-0 ${style.label} ${style.border}   `}>
                    <span>Date</span> 
                    <button onClick={()=>onClick('date')}><RefreshCcw size={16}/></button>
               </label>
                     <div className={` rounded-b-md  flex flex-1`}>
                        <input 
                            className={`border rounded-bl-md text-sm placeholder:text-sm flex-1  px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput} `} 
                            type="date" 
                            name="from" 
                            value={filterTerms.from || ''}
                            onChange={handleChange}  
                            placeholder="from date "
                        />
                        
                        <input 
                            className={` border rounded-br-md text-sm placeholder:text-sm flex-1  px-3 py-2 outline-none ${style.border} ${style.input} ${style.focusInput}`} 
                            type="date" 
                            name="to" 
                            value={filterTerms.to || ''}
                            onChange={handleChange}  
                            placeholder="to date "
                        />
                       
                     </div>
                     
                  </div>
        }
  </div>
    )
}