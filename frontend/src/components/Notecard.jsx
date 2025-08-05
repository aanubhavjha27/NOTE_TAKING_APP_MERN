import React from 'react'
import {Link} from 'react-router'
import {PenSquareIcon, Trash2Icon} from 'lucide-react'
import { formatdate } from '../lib/utils'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../lib/axios'
const Notecard = ({note,setnotes}) => {
    const handledelete=async(e,id)=>{ 
        e.preventDefault();
        if(!window.confirm("Are you sure to delete the note")) return

        try {
            await api.delete(`/notes/${id}`);
            setnotes((prev)=>prev.filter((note)=>note._id!==id));
            toast.success("Note Deleted Successfully");

        } catch (error) {
            console.log("Err in handel",error)
            toast.error("Failed to delete note");
            
        }

    }
  return (
   <Link to={`/note/${note._id}`}
   className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-l-rose-400">
   <div className='card-body'>
    <h3 className='card-title text-base-content'> {note.title}</h3>
   <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
   <div className='card-actions justify-between items-center mt-4'>
    <span className='text-sm text-base-content/60'>
        {formatdate(new Date(note.createdAt))}
    </span>
    <div className='flex items-center gap-1'>
        <PenSquareIcon className='size-4'/>
        <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handledelete(e,note._id)} >
            <Trash2Icon className='size-4'/>
        </button>
    </div>
   </div>
   </div>
   </Link>
  )
}

export default Notecard