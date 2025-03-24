export default function SubmitButton({disabled,title}){
    return (
        <button 
type="submit" 
disabled={disabled}
className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-50"
>
{title}
</button>
    )
}