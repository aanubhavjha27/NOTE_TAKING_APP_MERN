const express =require('express')
const router=express.Router();
const {getallnodes} =require('../controllers/notescontoller.js')
const {getnotebyid} =require('../controllers/notescontoller.js')
const {updatenode}=require('../controllers/notescontoller.js')
const {deletenote}=require('../controllers/notescontoller.js')
const {createnote}=require('../controllers/notescontoller.js')

router.get("/",getallnodes).post("/",createnote).put("/:id",updatenode).delete("/:id",deletenote);
router.get('/:id',getnotebyid);


 module.exports=router;