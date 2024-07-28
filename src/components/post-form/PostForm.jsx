// import React,{useCallback} from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Select, RTE } from "../index";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // yaha pr hm post passs krenge jo bhi user ne hmari post bheji h ya to wo ko update krne aaya hoga ya for wo new post k lie aayahoga
// function PostForm({ post }) {
//   // watch=>kisi field ko agar aapko continuously montor krna h to
//   // setValue => React forms m value set krne k kaam aata h
//   // control=> Yehi control hm RTE m pass krenge
//   // getValues-> Ki jitne bhi hame form ki agar koi value grab krni ho toh wo hm yaha se kr skte h
//   // use form k andar hm ek object bhi pass kr skteh
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "", //mtlb agar post k andar title hn to wo use krlo nhi to empty string dedo
//         slug: post?.$id || "", //mtlb agar post k andar slug hn to wo use krlo nhi to empty string dedo
//         content: post?.content || "", //mtlb agar post k andar content hn to wo use krlo nhi to empty string dedo
//         status: post?.status || "active", //mtlb agar post k andar status hn to wo use krlo nhi to status ko active rakh do
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);

//   // AB USEr ne agar form submit kia h to usr ne deta paas kia hoga

//   const submit = async (data) => {
//     // ab yaha pr 2 case h : ki aapke paas post h ya nhi h . agr post h to use update krdo nhi to new post laga lo
//     if (post) {
//       // yaha pr hm data se image array se pheli image nikal rahe h
//       // agar hamre paas image h to hm appwrite ki upload file use krenge or image ko upload kerdenge
//       const file = data.image[0]
//         ? await appwriteService.uploadFile(data.image[0])
//         : null;

//       //    ab jb file upload hogahi h to hme poorani image delete bhi to kemni padegi
//       if (file) {
//         appwriteService.deleteFile(post.featuredImage);
//       }

//       // ab hme post ko update bhi to kena padega
//       // yaha pr hmne phela parameter slug pass kia h jo j=ki hamara id h
//       // uske baad hamari sara data same h bss ek featured image change h
//       const dbpost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined, //featured image m agr file h to file ki unique id dedo nhi to undefined krdo
//       });
//       //   agar hamare paas dbpost h to user ko navigate kr wa dete h
//       if (dbpost) {
//         navigate(`/post/${dbpost.$id}`);
//       }
//     }
//     // yaha pr mtlb ki user naya form create krna chahta h
//     else {
//       // sbse phele file upload
//       const file = await appwriteService.uploadFile(data.image[0]);

//       // agar file h to sbse phele file id lelete h
//       if (file) {
//         const fileId = file.$id;
//         //    Now data k featured image k andar file id ko update krna h
//         data.featuredImage = fileId;
//         // and baaaki data ko direct send krdo
//         // but hm data ko direct send nhi kr skte kyuki usme userId nhi h and hmare createpost o userid bhi chaiye

//         // await appwriteService.createPost(data)
//         // since yaha pr hme new post lagani h to islie hm yaha pr create post krte h
//         const dbpost = await appwriteService.createPost({
//           ...data,
//           userId: userData.$id,
//         });

//         // if dbpost h to user ko navigate kra do
//         if (dbpost) {
//           navigate(`/post/${dbpost.$id}`);
//         }
//       }
//     }
//   };

//   // important for interview

//   // use callback k andar bhi depemdecy hoti h

//   // yaha pr basicaly agr hamre paas space wagrah aa rahe h to unhe hm '-' m convert kr dete h
//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//         return value
//             .trim()
//             .toLowerCase()
//             .replace(/[^a-zA-Z\d\s]+/g, "-")
//             .replace(/\s/g, "-");

//     return "";
// }, []);

//   React.useEffect(() => {
//     // watch k andar bhi callback hota h
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         // ya pr hme slug k andar value set kr rahe h
//         setValue("slug", slugTransform(value.title, { shouldValidate: true }));
//       }
//     });

//     // useeffecct k andar return statement m agr hm unsuscribe krdete h to woh optimided ho jata h memory management
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default PostForm;

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

