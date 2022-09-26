
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Axios from 'axios';
import { useState } from 'react';


export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const [signup, setSign] = useState('Sign up');

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setSign('...Loading');
      const { data } = await Axios.post('/signup', {
        
        name,
        username,
        email,
        password,
        gender,
      });
      navigate('/signupdone',{state:{mail: email}});
    } catch (err) {
      console.log("Error", err, "error");
    }
  };
  
  return (
    
      
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="place-items-center mx-auto h-18 w-auto"
              src="https://viveca33101.us-east-1.linodeobjects.com/eslogocolor.svg?color=indigo&shade=600"
              alt="Eden Sound"
            />
          </div>
			    <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
           
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label class="control-label">Full Name</label>

                <input 
                  type="text"
                  required 
                  name="name" 
                  placeholder="Full Name"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                  />

              </div>
              <div>
								<label htmlFor="email-address" className="sr-only">
                  User Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="User Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              <div>
                <fieldset className="mt-4">
                  <legend className="sr-only">Notification method</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    
                      <div key="Male" className="flex items-center">
                        <input
                          id="Male"
                          name="notification-method"
                          type="radio"
                          onClick={(e) => setGender(e.target.value)}
                          value="Male"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <label htmlFor="Male" className="ml-3 block text-sm font-medium text-gray-700">
                          Male
                        </label>
                      </div>
                      <div key="Female" className="flex items-center">
                        <input
                          id="Female"
                          name="notification-method"
                          type="radio"
                          onClick={(e) => setGender(e.target.value)}
                          value="Female"
                          required
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="Female" className="ml-3 block text-sm font-medium text-gray-700">
                          Female
                        </label>
                      </div>
                  </div>
                </fieldset>
              </div>
          
            </div>

          

            <div>
              <button
                
                name="submit"
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {signup}
              </button>
            </div>
          </form>
        </div>
      </div>
    
  )
}
