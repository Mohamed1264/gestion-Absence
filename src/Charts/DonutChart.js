const size = 150; // Increased size
const strokeWidth = 15; // Increased stroke width
const center = size / 2;
const radius = center - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;
const gap = 0.05; // Significantly increased gap size

export default function DonutCHart  ({data , style})  {
  const newData  = data.filter(d => d.value !== 0)
  const total = newData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-row-reverse items-center justify-center h-full gap-8">
      <div className={`relative size-[150px] group`}>
        <svg className="w-full h-full transform -rotate-90 relative">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="dark:stroke-gray-700/20 skroke-gray-100/20"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Segment circles */}
          {newData.map((item, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              className={`${style?.[item.type]?.stroke} transition-all duration-500 ease-out hover:opacity-90 `}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              style={getSegmentProps(item.value,index,newData,total)}
            />
          ))}
        </svg>
        
        {/* Center content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center text-gray-700 dark:text-gray-50">
          <span className="text-4xl font-bold ">{total}</span>
          <span className="text-sm mt-2 font-medium">Total Value</span>
        </div>
      </div>

      <div className="mt-2 space-y-2">
         {
              data.map (
              d => 
                <span key={d.type} className={` px-3 font-semibold text-sm  py-2 rounded-md flex  items-center gap-2   ${style[d.type].style}`}>
                     <span >{d.type}</span>
                      <span className=' font-bold'>{d.value}</span>
                 </span>
              )
           }
        </div>
    </div>
  );
};

const getSegmentProps = (value,index,newData,total) => {
  const totalGaps = newData.length === 1 ? 0 : newData.length * gap;
  const availableCircumference = circumference * (1 - totalGaps);
  const prevSegments = newData.slice(0, index).reduce((acc, item) => acc + item.value, 0);
  
  const gapOffset = index * gap * circumference;
  const valueOffset = (prevSegments / total) * availableCircumference;
  const startAngle = gapOffset + valueOffset;
  const endAngle = startAngle + ((value / total) * availableCircumference);
  
  return {
    strokeDasharray: `${(endAngle - startAngle)} ${circumference}`,
    strokeDashoffset: -startAngle,
    transform: 'rotate(0deg)',
  };
};
