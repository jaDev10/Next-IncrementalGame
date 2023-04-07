'use client';

interface itemsProps {
    buyItemFunction: Function
    itemID : number
    itemFlag: boolean
    itemName: string
    itemCost: string
    tooltipText:string
}

export default function ItemsBtn({buyItemFunction ,itemID, itemFlag, itemName, itemCost, tooltipText} : itemsProps) {
  return (
    <button onClick={() => {buyItemFunction(itemID)}} className = {`${ !itemFlag ? "bg-buttonMain hover:bg-buttonClicked" : "bg-grayish hover:bg-gray-700"} group p-2 px-4 rounded-md transition-colors duration-[250]`}>
            
    <span className='flex flex-col'>
      <p>{itemName}</p>
      <p className='text-yellow-500'>{itemCost}</p>
      <div className='absolute -mt-[3rem] -ml-5 bg-grayish p-2 rounded-sm shadow-md drop-shadow-md italic invisible group-hover:visible'>{tooltipText}</div>
    </span>
    
    </button>  
    )
}
 