import React ,{useId} from 'react'

function Select({
    options ,
    label,
    className='',
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
       {label && <label htmlFor={id} className=''></label>}
       <select 
       {...props}   //yaha pr user ne jitne bhi props die h saare k saare pass krdo yaha pr 
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >

        {/* Mtlb agr user ne options die h to aage jaaenge otherwise nhi jaaenge */}
         {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
         ))}
        </select>
    </div>
  )
}

// yaha pr hmne isse foward Ref k through export kia h [Mostly used this Synttax]

export default React.forwardRef(Select)
