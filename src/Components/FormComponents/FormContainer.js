

export default function FormContainer ({children,title ,icon:Icon}) {
    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
            <div className="flex items-center gap-2  border-b border-gray-300 dark:border-gray-600 bg-gray-50  dark:bg-gray-700 rounded-t-lg  px-8 py-4">
                <Icon className="w-5 h-5 text-purple-700" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-50">{title}</h3>
            </div>
            <div className='px-8 py-4 dark:bg-gray-900 rounded-b-lg'>
                {children}
            </div>
        </div>
    )
}