// yaha pr saare btn ka common design h 

import React from 'react'

function Button(
    {
        // these are default valur
        children,           
        type='button',           // default value
        bgColor='bg-blue-600',   //default value
        textColor='text-white', //default value 
        className='',  // we mostly took classNamr empty  it show the aditional class as to button
        ...props        //it collect any additional props pass to the button
    }
) {
  return (
    <div>
      {/* YAHA PR PROPS M JO BHI ADDITIONAL PROPERTY USER PASSn KRNA CHAHTA H , YA FIR CLAANAME M JO BHI ADDITIONLA CLASSnAME USER PAS KRE */}
      <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {/* yaha pr children ka mean jo bhi content button k inside h LIKE BUTTON TEXT */}
        {children}   
      </button>
    </div>
  )
}

export default Button
