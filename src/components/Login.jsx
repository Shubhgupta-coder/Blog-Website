import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); //from useForm
  const [error, setError] = useState("");

  // Now here we are making a login function
  const login = async (data) => {
    // jaise hi hm logiin krnge to hm ek baar ko seterroer ko empty kr denge
    setError("");
    try {
      // Now we are trying to send our data to authService login and we got a session from there
      const session = await authService.login(data);

      // Now agar session h to hm userdata nikal lete h'
      if (session) {
        const userData = await authService.getCurrentUser();

        // agr hmare paas userdata h to dispatch krdenge
        if (userData) {
          // hmne jo hmara store m login reducer tha usko authLogin ki tarah treat kia h
          dispatch(authLogin(userData));
        }
        // agr user aa hi chooka h to use navigate krdo route pr
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* yaha pr hm apne error ko display kr rahe  h  agr koi error h to */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


        {/* form jb bhi submit hoga to waha pr handlesubmit jo ki hm useform se laaye h wo use hoga */}

        {/* handleSubmit ek method h jaha pr hm ana method dete h ki form is tarah se subit hoga */}

        {/* ha to form jb bhi submit hoga to handle submit ek event h wo call hota h  */}

        {/* ab ye event imp h kyuki jitne bhi hmara input field wagarh waha pr use hoga to wha pr hm register ko use krte h to automatically jo bhi value h unka state apne aap manage hota h wha se w apne aap wo value pick krega or handlesubmit hote tym wo waha se apne aap value lelega */}

        {/* We're using the spread operator so react-hook-form will spread out all the required event handlers like onChange, onBlur, and other props for that input field. */}
        
        <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
                {/* yeh hamara wahi wala input h jo ki hmne component baanaaya tha */}
            <Input
                label="Email: "  // passing label to input
                placeholder="Enter your email"  // passing placeholder which is passed as destructured props 
                type="email"
                // Now this is a syntax of validate form 
                // register k andar jo bhi naam dena wo unique rakhnaa like email here
                // register k andar phel ehmne key value le li jo ki unique h and secoond hamre paas hote h options jo ki object h
                 
                {...register("email", {  //login function k andar jo bhi dat ah wo isi k basis pr aatta h 
                    required: true,
                    // this is a pattern for email validaton

                    validate: {
                        // thsis is just a syntax which we find from use for documentation
                        // jo bhi value hme mili h agr wo iss expression se test ho rahi h to theek h otherwise or lagake we gave email must be valid addresss
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: " 
                type = "password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button type="submit" className="w-full">Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
