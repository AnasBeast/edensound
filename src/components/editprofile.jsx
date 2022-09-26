import { useEffect, useState } from 'react';
import Countries from "./countries";
import {useLocation} from 'react-router-dom';
import Axios from 'axios';
import Notif from './modalnotif';
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Editprofile(props) {
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setName] = useState("");
    const [about, setAbout] = useState("");
    const [photo, setPhoto] = useState("https://i.postimg.cc/xdvV8whn/default-profile.jpg");
    const [coverphoto, setCoverPhoto] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState('');
    const [dob, setDob] = useState("");
    const [file, setFile] = useState()
    const [file2, setFile2] = useState()

    const [show, setShow] = useState(false);
    const [save, setSave] = useState("Save")
    useEffect(() => {
        var accessToken=localStorage.getItem("accessToken");
        setPhoto('https://i.stack.imgur.com/MnyxU.gif')
        setCoverPhoto('https://i.stack.imgur.com/MnyxU.gif')
        const fetchData = async () => {
         try {
          const { data } = await Axios.get(`/userprofile`,{
            headers: {
              
              authorization: accessToken,
            }
          });
          
          setEmail(data.email);
          setUsername(data.username);
          setName(data.name);
          setAbout(data.about);
          if(data.profileImg==""){setPhoto('https://i.postimg.cc/xdvV8whn/default-profile.jpg')}
          else{setPhoto(`https://socialraw-production.up.railway.app/${data.profileImg}`);}
          
          if(data.coverImg==""){setCoverPhoto('https://i.postimg.cc/xdvV8whn/default-profile.jpg')}
          else{setCoverPhoto(`https://socialraw-production.up.railway.app/${data.coverImg}`);}
          
          setCity(data.city);
          setCountry(data.country);
          setDob(data.dob);
          } catch (err) {
            console.log("error", err)
          }
        };
       fetchData();
     },[]);
    

    function handleChange(event) {
      setFile(event.target.files[0])
    }
    function handleChange2(event) {
      setFile2(event.target.files[0])
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        var profileImage = file
        var formData = new FormData();
        formData.append('file', profileImage);
        
        var accessToken=localStorage.getItem("accessToken");
        try {
            const { data } = await Axios.post('/uploadProfileImage',formData, {
              headers: {
                
                authorization: accessToken,
              }
            });
            console.log(data)
            setPhoto(`${data.data}`)
        } catch (err) {
          console.log("Error", err, "error");
        }
    };
    const handleCover = async (e) => {
      e.preventDefault();
      var coverImage = file2;
      var formData = new FormData();
      formData.append('file', coverImage);
      
      var accessToken=localStorage.getItem("accessToken");
      try {
          const { data } = await Axios.post('/uploadCoverPhoto',formData, {
            headers: {
              
              authorization: accessToken,
            }
          });
          console.log(data)
       
      } catch (err) {
        console.log("Error", err, "error");
      }
    };

    const saveSubmit = async (e) => {
      setSave("...Loading")
      e.preventDefault();
      
      var profileImage = file
      var formData = new FormData();
      formData.append('file', profileImage);
      
      var accessToken=localStorage.getItem("accessToken");
      try {
        const { data } = await Axios.post('/updateProfile',{
          accessToken: accessToken,

          name: fullname,
          dob: dob,
          city: city,
          country: country,
          about: about,
        });
        console.log(data)
        setSave("Save")
        setShow(true)
        
      } catch (err) {
        console.log("Error", err, "error");
      }
    };
    
    return (
      <form className="space-y-8 divide-y divide-gray-200 pt-7" onSubmit={saveSubmit}>
          <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                      <p className="mt-1 text-sm text-gray-500">Your profile has been updated.</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          setShow(false)
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
  
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Username
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={username}
                      disabled
                    />
                  </div>
                </div>
              </div>
  
              
  
              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center gap-4">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <img
                            id='profileImg'
                            className="h-12 w-12"
                            src={photo}
                            alt=""
                        />
                    </span>
                    
                        <div>
                          <form id='form-upload-image' onSubmit={()=>{return false}}>
                            <input type="file" onChange={handleChange} accept="image/*"/>
                              <button
                                  type="submit"
                                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={submitHandler}

                              >
                              
                                  Upload
                              </button>
                          </form>
                        </div>
                    
                  </div>
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Cover photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <img
                            id='profileImg'
                            className="w-full rounded-full"
                            src={coverphoto}
                            alt=""
                        />
                      <div className="flex text-sm text-gray-600">
                          <form id='form-upload-image' onSubmit={()=>{return false}}>
                            <input type="file" onChange={handleChange2} accept="image/*" />
                            <button
                                  type="submit"
                                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={handleCover}

                              >
                              
                                  Upload
                              </button><p className="pl-1">or drag and drop</p>
                          </form>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Full Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="full-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    value={fullname}
                    onChange={(e) => setName(e.target.value)}

                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Date Of Birth
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs  sm:text-sm"
                    placeholder='DD/MM/YY'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Email address
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs  sm:text-sm"
                    value={email}
                    disabled
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  
                <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs  sm:text-sm"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  City
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  
                <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs  sm:text-sm"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  About me
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    type="text"
                    name="about"
                    id="about"
                    rows={3}
                    autoComplete="about"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}

                  />
                </div>
                <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            
            >
              {save}
            </button>
            
          </div>
        </div>
      </form>
    )
  }
  