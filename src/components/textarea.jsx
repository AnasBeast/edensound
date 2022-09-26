
import { useState } from 'react'
import Axios from 'axios';
import { useEffect } from 'react';





export default function Comment(propos) {
  const [post, setPost]= useState('');
 
  const [youtube, setYoutube]= useState('');
  const [file, setFile] = useState()
  const [load, setLoad] = useState('')
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

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}
  const setYoutubeUrl = event =>{
    const url = getId(event.target.value);
    console.log(url)
    setYoutube(url)
  }
  
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoad('ing...')
    var formData = new FormData();
    var accessToken=localStorage.getItem("accessToken");
    accessToken = accessToken.replace(/['"]+/g, '');
    

    formData.append("type", "post");
    formData.append("caption", post);
    formData.append("files",file);
    formData.append("youtube_url",youtube);
    formData.append("accessToken",accessToken)

    for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
      
		}
    try {
      const { data } = await Axios.post('/addpost', formData);
      console.log(data)
      setLoad('')
      window.location.reload();
    } catch (err) {
      console.log("Error", err, "error");
    }
    /* var description = "asdadas"
    const result = await postImage({image: file, description}) */
  };
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={photo}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" id='post-section' method="POST" enctype="multipart/form-data">
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
              placeholder={`${propos.placeholder}`}
              defaultValue={''}
              onChange={(e) => setPost(e.target.value)}
              required
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-6 items-center">
   
            <input type="file" name="image" onChange={fileSelected} className="col-span-2"/>      
            <input type="text" onChange={setYoutubeUrl} placeholder="Youtube Video URL" className='col-span-2'/>
            <button
              type="submit"
              className="col-start-6 col-end-7  col-span-1 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={submitHandler}
            >
              {propos.button + load}
               
            </button>
            
          </div>
        </form>
      </div>
    </div>
  )
}
