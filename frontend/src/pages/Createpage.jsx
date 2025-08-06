import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axios from "axios"
import api from '../lib/axios';
const Createpage = () => {
  const [title,settitle]=useState("");
  const[content,setcontent]=useState("");
  const[loading,setloading]=useState(false)
  const navigate=useNavigate()
  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(!title||!content){
      toast.error("ALL FIELDS NOT FILLED");
      return;
    }
    setloading(true)
    try {
      await api.post("/notes",{
        title,
        content,
      })
      toast.success("NOTE CREATED SUCCESSFULLY")
      navigate("/")
      
    } catch (error) {
     
      if(error.response.status===429){
        toast.error("slow down..creating too fast",{
          duration:4000,
          icon:"💀",
        })


      }else{
         console.log("")
         toast.error("FAILED TO CREATE NOTE..PLEASE TRY AGAIN LATER",{
          icon:"💀",
         })
      }
    }finally{
      setloading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6 rounded-full'>
          <ArrowLeftIcon className='size-5'/>
          BACK TO NOTES
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>CREATE A NOTE</h2>
              <form onSubmit={handlesubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>TITLE</span>
                    </label>
                    <input type="text" placeholder='Note title'
                    className='input input-bordered' 
                    value={title}
                    onChange={(e)=>{
                      settitle(e.target.value)
                    }}/>
                    <label className='label mt-3'>
                      <span className='label-text text-start'>CONTENT</span>
                    </label>
                    <textarea type="text" placeholder='Enter Content' 
                    className='textarea textarea-bordered py-28 align-text-top'
                    value={content}
                    onChange={(e)=>{
                      setcontent(e.target.value)
                    }}/>
                    <div className='card-actions justify-end mt-3'>
                      <button type='submit' className='btn btn-primary ' disabled={loading}>
                        {loading?"CREATING...":"CREATE NOTE"}
                      </button>
                    </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Createpage