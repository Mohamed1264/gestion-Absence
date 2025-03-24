export default function LineBarChart({
     data = [
        {name:'first year' , nbr:50},
        {name:'second year' , nbr:70},
        {name:'third year' , nbr:10}
    ]
}){
  const total = data.reduce((acc,val)=> acc+val.nbr,0)
    return (
        <div className="flex gap-3 mx-auto h-56 p-3 w-full rounded-xl">
        {data.map((d, index) => (

            <div key={index} className=" flex flex-col gap-1  justify-end items-center text-center h-full w-full " >
                <div className="uppercase  font-medium text-xs text-gray-700 dark:text-gray-50">{d.nbr}</div>
                <div className="bg-violet-200 dark:bg-violet-400 rounded-md  duration-150 w-full " style={{ height: `${d.nbr * 100 / total}%`}}  ></div>
                <div className="h-11 flex justify-center items-center">
                    <span className="text-center uppercase text-xs text-gray-700 dark:text-gray-50">{d.name}</span>
                </div>  
            </div>
          
        ))}
    </div>
    )
}