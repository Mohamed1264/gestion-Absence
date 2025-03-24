export default function HChart({data}){
    return (
        <>

<div className=" p-3  space-y-4 rounded-xl w-full">
                            {data.map((d, index) => (

                                <div key={index} className=" flex flex-row gap-1  justify-end items-center  h-full w-full " >
                                <span className=" uppercase  text-gray-700 font-semibold text-sm dark:text-gray-50 min-w-24">{d.total} {d.name}</span>
                            

                                    <div className=" flex gap-2 duration-150 h-16 w-full"  >
                                      {d.justified !== 0 && <div className="bg-emerald-300 items-center justify-center flex dark:bg-green-300  rounded-md h-full text-lg font-bold text-emerald-900" style={{ width: `${d.justified * 100 / d.total}%`}} >
                                         {d.justified && d.justified}
                                      </div>}
                                     {d.notJustified !== 0 && <div className="bg-yellow-300 flex items-center justify-center dark:bg-yellow-300 rounded-md h-full text-lg font-bold text-yellow-900" style={{ width: `${d.notJustified * 100 / d.total}%`}} >
                                         {d.notJustified }
                                      </div>}

                                    </div>
                                    

                                     
                                </div>
                            
                            ))}
                    </div>
                    <div className=" absolute bottom-7 flex items-center justify-center w-full gap-5 mt-5">
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-emerald-300 rounded-md "></span>
                            <span className="text-emerald-400 dark:text-emerald-300  text-sm font-semibold">Justified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-yellow-300 rounded-md "></span>
                            <span className="text-yellow-400 dark:text-yellow-300  text-sm font-semibold">UnJustified</span>
                        </div>
                    </div>
        </>
    )
}