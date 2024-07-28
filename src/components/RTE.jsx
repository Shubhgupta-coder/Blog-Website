import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// this control is responsible for iski saari state ko us form m le jaane k k lie [mtlb componenet se form m jo bhi use call kregaa ]
export default function RTE({name,control,label,defaultValue=""}) {
  return (
    <div className='w-full'>  
      {label && <label className='inline-block mb-1 pl-1'>{label} </label>}
     < Controller 
       name= {name || "content"} //curly braces k andar jo hmne function k andar pass kia tha wo name h 
       control={control}
       // render will take a callback    
      //  usme hamare pass ek key-value hoga ki is field m hm ye particular m change hota h to
     //   mtlb is field m kuch bhi agar change hota h to mujhe inform kr dena render k saath 
    // ab isme jis field m jo bhi hame change krwana h 
    // yaha pr hm editor m change krwa rahe h jis m prperty hoti h like initialisation (mtlb initial value kya hogo) or init (mtlb initialise hone k baad kya value hogi)
    // ye sb documentation se padhke aaya h 
       render={({field:{onChange}})=>(
        <Editor
        apiKey='xm4h2fzz12j30a9q7gk9j5h8s4d3lbmm1643t20qb287nbbv'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        // yaha pr mtlb ki hamare editor m ager kuch bhi change ho to field hamare govern ho onchange se
        onEditorChange={onChange}
        />
       )}
     
     />
    </div>
  )
}

