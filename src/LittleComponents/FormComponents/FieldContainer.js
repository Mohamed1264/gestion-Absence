import Label from "./Label"
export default function FieldContainer ( { title,children}) { 
    return (
        <div className="flex my-3 mb-0 w-full">
        <Label title={title}/>
        {children}
        </div>
        
    )
}