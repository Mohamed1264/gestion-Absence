
export default function Label ({title}){
    return (
        <label  className={`
          p-3 text-sm font-medium  rounded-l-md basis-1/2 max-w-[158px]
          border border-r-0 dark:border-gray-600
          bg-gray-50 dark:bg-gray-900
          text-gray-700  dark:text-gray-50   `}
        >
            {title} 
        </label>
    )
}