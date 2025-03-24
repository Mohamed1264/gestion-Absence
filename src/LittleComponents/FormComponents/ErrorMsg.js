export default function ErrorMsg ({value}){
    return  value ?  <span className="my-1 w-full text-xs font-semibold text-red-600">{value}</span> : null
}