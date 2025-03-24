export default function Pagination (){
    return (
        <div className="py-1 pr-4">
         <nav className="flex items-center space-x-1" aria-label="Pagination">
           <button type="button" className="p-1.5   inline-flex justify-center items-center  text-sm rounded-md text-gray-700 font-medium hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-600" aria-label="Previous">
           
             <span >Prev</span>
           </button>
           <button type="button" className="size-8 flex justify-center items-center text-gray-700 bg-gray-200 dark:bg-purple-300  hover:bg-gray-100 rounded-md  font-bold dark:text-gray-50 dark:hover:bg-gray-600" aria-current="page">1</button>
           <button type="button" className="size-8 flex justify-center items-center text-gray-700    hover:bg-gray-100 rounded-md py-2 font-bold dark:text-gray-50 dark:hover:bg-gray-600">2</button>
           <button type="button" className="size-8 flex justify-center items-center text-gray-700 rounded-md   hover:bg-gray-100 py-2 font-bold dark:text-gray-50 dark:hover:bg-gray-600">3</button>
           <button type="button" className="p-1.5  inline-flex justify-center items-center  text-sm rounded-md text-gray-700 font-medium  hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-600" aria-label="Next">
             <span >Next</span>
             
           </button>
         </nav>
       </div>
    )
}