import React, { useId } from "react";

// abourt Forward Ref -> Suppose hm ek login page bana raha  h to usme Input ki diff . field h like username , email ,password  ya kisi or page m bhi input h to hm Input ek hi jagah bana lete h but hm uske statre bhi chaiye na or doosre pages m jaha jaha input h unke lie hm forward ref ka use krte h
// Forward ref k andar bhi we need a callback
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
//   ref: A reference object that will be passed down to the underlying input element.
  ref
) { 
    const id = useId()
  return (
    <div className="w-full">
        {/* ager user lable deta h to ye hm show krenge  */}
       {label && <label 
       className='inline-block mb-1 pl-1' htmlFor={id}>
        {/* yaha pr jo bhi label hoga wo aajaega */}
         {label} 
       </label>
    }

    <input 
    type={type} //default type hamra ext set h


    // yaha pr jo hamari phele css wagrah ki classes thi w hmne dedi fir uske baad agr user koi apni classes add krni ho to hm wo ${classname} m add kr denege
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}


    // The ref={ref} attribute forwards the ref received from the parent component to the underlying input element. This allows the parent component to access and interact with the input element directly.
    ref={ref}  //yaha pr hmne reference jo use se lia as a props usko pass krdo  . Yeh hme reference degi apne parent component k andar

    {...props}
    
    id={id}

    />
    </div>
  )
});

export default Input;
