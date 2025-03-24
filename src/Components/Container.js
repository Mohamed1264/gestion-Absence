

export default function Container ({children,containerTitle}){
    return (
        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-2 pt-10 flex-1 bg-gray-50 dark:bg-gray-900">
            <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">{containerTitle}</h3>
            {children}  
        </div>
    )
}