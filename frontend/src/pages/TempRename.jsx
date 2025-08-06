import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, FrownIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

const Notedetailpage = () => {
  const [note,setnote]=useState(null)
  const [loading,setloading]=useState(true)
  const [saving,setsaving] =useState(false)

  const navigate= useNavigate()

  const handeldelete=async ()=>{
    if(!window.confirm("Are you sure you want to delete this??")) return;
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete the note");
      console.log("err deleting note",error)
    }
  }
  const handelsave=async()=>{
    if(!note.title.trim()|| !note.content.trim()){
      toast.error("Please add title and content properly!!")
      return;
    }
    setsaving(true)
    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      console.log("err updating notes",error);
      toast.error("failed to update note")
      
    }finally{
      setsaving(false)
    }
  }

  const {id} = useParams()
  useEffect(()=>{
    const fetchnote=async()=>{
      try {
        const res=await api.get(`/notes/${id}`)
        setnote(res.data)
      } catch (error) {
        console.log("failed to get note ",error)
        toast.error("failed to get note",{
          icon:<FrownIcon/>
        }
          
        )
      }finally{
        setloading(false)
      }
    }
    fetchnote();
  },[id]);
  console.log({note})

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 animate'/>
      </div>
    )
  }
  return (
    
    <div className='min-h-screen bg-base-200'>
      <div className="max-w-2xl mx-auto">

      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <Link to={'/'} className='btn btn-ghost rounded-full' >
          <ArrowLeftIcon className='h-5 w-5'/>
          BACK TO NOTES</Link>
          <button onClick={handeldelete}  className='btn btn-error btn-outline rounded-full'>
            <Trash2Icon className='h-5 w-5'/>
            DELETE NOTE
          </button>
          </div>
          <div className="card bg-base-300">
            <div className="card-body">
              <div className='form-control mb-4'>
                <label className="label">
                  <span className='label-text'>TITLE</span>
                   </label>
                   <input type="text"
                   placeholder='Note Title'
                   className='input input-bordered'
                   value={note.title}
                   onChange={(e)=>setnote({...note,title:e.target.value})} />
                                
              </div>

              <div className='form-control mb-4'>
                <label htmlFor="" className='label'>
                  <span className='label-text'>CONTENT</span>

                </label>
                <textarea placeholder='WRITE YOUR NOTE HERE'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e)=>setnote({...note,content:e.target.value})} />
              </div>
              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handelsave}>
                  {saving? "SAVING...":"SAVE CHANGES"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


  )
}

export default Notedetailpage