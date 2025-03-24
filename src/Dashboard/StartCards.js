



function StartCards({dataCards}){
  return (
        dataCards.map(
          (items,index)=>
          <div className=" border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 space-y-3 h-fit " key={index}>
          {
            items.map(d=>
              <div className={` rounded-lg shadow lg:py-4 lg:px-3 py-3 px-2  duration-100 flex-1 space-y-3     h-full max-h-24 ${d.style}`} key={d.title}>
              <span className="   font-semibold lg:text-lg">{d.title}</span>
            <div className="flex justify-between gap-2 ">
            {d.icon}
            <span className="text-3xl font-bold text-end block self-end">{d.nbr}</span>
            </div>
          </div>
            )
          }
          </div>
        )
  )
}

export default StartCards