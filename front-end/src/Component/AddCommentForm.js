// import { application } from 'express'
import React,{useState} from 'react'

const AddCommentForm = ({articleName,SetArticleInfo}) => {
const [username,setUsername]= useState("")
const [commentText,setCommentText]= useState("")
const addComments = async () =>{
    const result = await fetch(`/api/articles/${articleName}/add-comments`,{
        method:'post',
        body:JSON.stringify({username,text:commentText}),
        headers:{
            "content-Type":"application/json",
        }, 
    });
    const body = await result.json();
    SetArticleInfo(body);
    setUsername("")
    setCommentText("")
} 
  return (
    <form className='shadow rounded px-8 pt-6 pb-8 mb-4'>
        <h3 className='text-2x1 font-bold mb-4 text-gray-900 '>Add Comment</h3>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name:
        </label>
        <input required type='text' onChange={(e)=>{
            setUsername(e.target.value)
        }} value={username} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
            Comment:
        </label>
        <textarea
        required
        value={commentText} 
        onChange={(e)=>{setCommentText(e.target.value)}} 
        rows={4} 
        cols={50} 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        <button 
        onClick={(()=> addComments())} 
        className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add Comment</button>    
    </form>
  )
}

export default AddCommentForm