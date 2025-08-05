import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RatelimitUI from '../components/RatelimitUI.JSX'
import axios from 'axios'
import toast from 'react-hot-toast'
import Notecard from '../components/Notecard'
import api from '../lib/axios'
import Notesnotfound from '../components/Notesnotfound'


const Homepage = () => {
  const [ratelimit,setratelimit]=useState(false)
  const [notes ,setnotes]=useState([])
  const [loading ,setloading]=useState(true)
  
   useEffect(()=>{
    const fetchnotes=async ()=>{

      try {
        const res=await api.get("/notes")
        console.log(res.data);
        setnotes(res.data)
        setratelimit(false)
      } catch (error) {
        console.log("err fetching notes")
        toast.error("failed to make notes")
      }
        finally{
          setloading(false)
        }
    };

    fetchnotes();
   },[]);
  


   return (
     <div className='min-h-screen'>
     <Navbar/>

     {ratelimit&& <RatelimitUI/>}

     <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>LOADING NOTES...</div>}

       {notes.length===0 && !ratelimit&&!loading&& <Notesnotfound/>}

      {notes.length>0 && !ratelimit && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map(note=>(
         <Notecard key={note._id} note={note} setnotes={setnotes}/>
        ))}

        </div>
      )}
     </div>
    </div>
  )


}

export default Homepage 