

export default function Container ({children,title = 'General Info'}) {
    return (
<div className="relative border border-gray-300 dark:border-gray-600 rounded-md  min-h-full px-3 pt-4 pb-3 basis-1/3 grid place-items-center">
<h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">{title}</h3>
{children}
</div>
    )
}