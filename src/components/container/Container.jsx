import React from 'react'

// Container hamari property as a children accept krta h
// Container k andar hm styling property ko define krte h
function Container({children}) {

    // we can also remove () bracket here from return 
  return (
    <div className='w-full max-w-7xl mx-auto px-4 '>
      {children}
    </div>
  )
}

export default Container
