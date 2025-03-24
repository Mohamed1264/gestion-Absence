export default function TimeFilter ({selected,setNewTimeRange}){
    return (
    <select  
    onChange={({target})=>setNewTimeRange(target.value)}
    defaultValue={selected}
    className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" 
    >
        <option value={'All Time'}>De tous les temps</option>
        <option value={'Today'}>Aujourd'hui</option>
        <option value={'Yesterday'}>Hier</option>
        <option value={'Last Week'}>La semaine dernière</option>
        <option value={'Last Month'}>Le mois dernier</option>
    </select>
    )
}