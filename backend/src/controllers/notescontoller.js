  const Note =require('../models/Note.js')
  
  const getnotebyid=async(req,res)=>{
    try {
        const note=await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch (error) {
        console.log("err in getting note",error)
        res.status(500).json({message:"internal server err"})
    }
  }

  const getallnodes=async(req,res)=>{
    try {
        const notes=await Note.find().sort({createdAt:1});
        res.status(200).json(notes)

    } catch (error) {
        console.log("err in getting note",error)
        res.status(500).json({message:"internal server err"})
        
    }
}

const createnote=async(req,res)=>{
    try {
        const {title,content}=req.body
        const newNote= new Note({title,content})

        await newNote.save();
        res.status(201).json({message:"note created successfully"})
        
    } catch (error) {
          console.log("err in getting note",error)
        res.status(500).json({message:"internal server err"})
        
    }
}

const updatenode=async(req,res)=>{
    try {
        const {title,content}=req.body;
        await Note.findByIdAndUpdate(req.params.id,{title,content})
        res.status(200).json({message:"note upadated successfully"})
    } catch (error) {
        console.log("err in updating  note",error)
        res.status(500).json({message:"internal server err"})
        
    }}



const deletenote=async(req,res)=>{
    try {
        const deletednote=await Note.findByIdAndDelete(req.params.id)
        res.json({message:"note deleted successfully"})
    } catch (error) { 
        console.log("err in deleting node note",error)
        res.status(500).json({message:"internal server err"})
        
    }

}

module.exports={updatenode,getallnodes,deletenote,createnote,getnotebyid};