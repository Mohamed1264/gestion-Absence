export default function ProfileCards ({cardsInfo} ){
    const styles = [
        'text-red-700 bg-red-100 hover:bg-red-200',
        'text-slate-700 bg-slate-100 hover:bg-slate-200',
        'text-sky-700 bg-sky-100 hover:bg-sky-200',
        'text-violet-700 bg-violet-100 hover:bg-violet-200'
    ]
    return (
        <>
        {
            cardsInfo.map(
              (d,index)=>
              <div className={` rounded-lg flex justify-between shadow py-4 px-3 pb-2 duration-100   h-full ${styles[index]}`} key={d.title}>
                <div className=" text-sm  flex gap-2  h-fit items-end font-medium">
                {d.icon}
                <span className="font-medium text-base">{d.title}</span>
                </div>
                <div className="text-5xl font-bold self-end ">{d.nbr}</div>
              
              </div>
              
            )
        }
        </>  
    )
}