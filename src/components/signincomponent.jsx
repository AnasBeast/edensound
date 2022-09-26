
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Axios from 'axios';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin, setSign] = useState('Sign in');


  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
    
  useEffect(() => {
    var accessToken=localStorage.getItem("accessToken");
    setPhoto('https://i.stack.imgur.com/MnyxU.gif')
    const fetchData = async () => {
     try {
      const { data } = await Axios.get(`/userprofile`,{
        headers: {
          
          authorization: accessToken,
        }
      });
      
      
      setPhoto(`https://socialraw-production.up.railway.app/${data.profileImg}`);
      
      } catch (err) {
        console.log("error", err)
      }
    };
   fetchData();
  },[]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setSign('...Loading');
      const { data } = await Axios.post('/login', {
        email,
        password,

      });
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      console.log(data)
      var profile= data.profileImage;
      console.log()
      if(profile==""){
        navigate('/editprofile');
      }else{
        navigate('/dashboard')
      }
    } catch (err) {
      toast.error(getError(err));
      console.log("Error", err, "error");
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="place-items-center mx-auto h-18 w-auto"
              src="https://viveca33101.us-east-1.linodeobjects.com/eslogocolor.svg?color=indigo&shade=600"
              alt="Eden Sound"
            /></div>
			    <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/joinus" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {signin}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
