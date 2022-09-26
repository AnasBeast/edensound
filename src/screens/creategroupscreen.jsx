import React from 'react'
import Groupcreation from '../components/creategroupcomponent'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Creategroup() {
  return (
    <div>
        <Navbar/>
        <div className='grid grid-rows-2 grid-flow-col gap-4 w-3/4 justify-center'>
          
          <div className='w-96 h-96 row-span-2'><Sidebar title="Create Group"/></div>

  
          <div className="w-full h-96 shrink-0 w-full mr-56"><Groupcreation/></div>

        </div>
        
    </div>
  )
}
