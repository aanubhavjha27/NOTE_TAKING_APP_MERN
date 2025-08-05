import { BanIcon, FrownIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
const Notesnotfound = () => {
  return (
    <div className='flex justify-center w-full mt-0'>


    <div className='flex flex-col justify-center bg-base-300 items-center rounded-full min-w-20'>


        <span className='mr-3 mb-3 mt-2'>
            <FrownIcon/>
            </span>
        <span className='mr-5 ml-5'>
        YOU HAVEN'T CREATED ANY NOTES YET

        </span>
        <span >
            <Link to={'/create'} className='btn btn-primary rounded-full mt-5 mb-5'> Create a note first</Link>
        </span>
    </div>
 
    </div>
  )
}

export default Notesnotfound