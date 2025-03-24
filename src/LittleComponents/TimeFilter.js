export default function TimeFilter (){
    return (
    <select  className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" >
        <option value={'All time'}>All time</option>
        <option value={'Today'}>Today</option>
        <option value={'Yesterday'}>Yesterday</option>
        <option value={'Last week'}>Last Week</option>
        <option value={'Last month'}>Last Month</option>
    </select>
    )
}