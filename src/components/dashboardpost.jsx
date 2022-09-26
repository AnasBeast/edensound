import Axios from 'axios';
import { useEffect, useState } from 'react';


export default function Postsection() {
  
  const [posts, setPosts] = useState([]);
  const [id, setID] = useState();
  const mainURL= "https://socialraw-production.up.railway.app"
  useEffect(() => {
    var accessToken=localStorage.getItem("accessToken");
    

    const fetchPosts =  async () => {
      accessToken = accessToken.replace(/['"]+/g, '');
      var formData = new FormData();
      formData.append('accessToken',accessToken)

      try {
       const { data } = await Axios.post(`/getNewsfeed`,formData);
       setPosts(data.data);
       console.log(data.data)
      
       
      } catch (err) {
        console.log("error", err)
      }
      
    };
    
    fetchPosts();
    
  },[]);
  const submitLike = async (e) => {
    
    var accessToken=localStorage.getItem("accessToken");
    accessToken = accessToken.replace(/['"]+/g, '');
    try {
      const { data } = await Axios.post('/toggleLikePost', {
        accessToken: accessToken,
        _id: id
      });
      console.log(data)
      setID('')
    } catch (err) {
      console.log("Error", err, "error");
    }
    /* var description = "asdadas"
    const result = await postImage({image: file, description}) */
  };

  return (
    <div className="flex items-start space-x-4 p-5">
      
      <div className="min-w-0 flex-1">
        {posts.map((post)=>( 
          <form action="#" className="relative m-5">
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <div className="flex-shrink-0 p-4 flex flex-row justify-between gap-2">
                  <div className='flex align-middle items-center gap-4'>
                    <img
                    className="inline-block h-14 w-14 rounded-full"
                    src={`${mainURL}/${post.user.profileImage}`}
                    alt=""
                    />
                    <div className='flex flex-col justify-center items-center w-full'>
                      <h1 className="block w-full border-0 text-lg font-medium placeholder-gray-500 focus:ring-0">{post.user.name}</h1>
                      <p className='-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>{post.createdAt}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="h-12 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
              </div>
              
              {post.caption!==""&& 
                <p
                id="description"
                className="mr-4 ml-4 block text-xl  w-full resize-none border-0 py-3 focus:ring-0"
                
                defaultValue={''}
                >{post.caption}</p>
              }
              {post.youtube_url!==""&&
                <iframe width="100%" height="600" title='post.youtube_url'
                  src={`//www.youtube.com/embed/${post.youtube_url}`}>
                </iframe>
              }
              {(post.image!=="")&&
                <div className='w-full flex mx-auto content-center'>
                   <img src={`https://socialraw-production.up.railway.app${post.image}`} alt="" className='w-full '/>
                 </div>
              }
              {(post.video!=="") &&
              <video width="100%" height="100%" controls >
                <source src={post.video} type="video/mp4"/>
              </video>
              }
              {post.audio!==""&&
                <audio width="100%" height="100%" controls className='w-full'>
                  <source src={post.audio} type="audio/ogg"/>
                  
                
                </audio>
              }
              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      
                    </div>
                  </div>
                  <div className="h-9" />
                  
                  
                </div>
                
              </div>
              
            </div>
            
            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              
              <div className="flex items-center space-x-5 w-full justify-evenly pb-1">
                <div className="flex items-center flex-row ">
                  <button
                    type="button"
                    className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800 gap-1"
                    
                    onClick={submitLike}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    {post.likers.length}
                    Like
                  </button>
                </div>
                <div className="flex items-center flex-row">
                  <button
                    type="button"
                    className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800 gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    Comment

                  </button>
                    

                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800"
                  >
                    Buy NFT
                  </button>
                    

                </div>
              </div>
              
            </div>
          </form>
        ))}
        
      </div>
    </div>
  )
}
