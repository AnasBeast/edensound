import React from 'react'
import Pagecreation from '../components/createpagecomponent'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Createpage() {
  return (
    <div>
        <Navbar/>
        <div className='grid grid-rows-2 grid-flow-col gap-4 w-3/4 justify-center'>
          
          <div className='w-96 h-96 row-span-2'><Sidebar title="Create Page"/></div>

  
          <div className="w-full h-96 shrink-0 w-full mr-56"><Pagecreation/></div>

        </div>
        
    </div>
  )
}
