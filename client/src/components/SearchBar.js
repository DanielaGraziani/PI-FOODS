import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeByName } from '../actions'

export default function SearchBar() {
  const [input, setInput]= useState('')
  const dispatch= useDispatch()

  const handleInputChange=(e)=>{
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!input || input === " " || !input.trim().length){
      alert('Sending invalid or null field')
    }else if( input || input.trim().length){
      dispatch(getRecipeByName(input))
      setInput('')
    }
  }

  return (
    <div>
      <input type="text" value={input} placeholder="Search recipe..." onChange={(e)=>handleInputChange(e)}/>
      <input type="submit" onClick={(e)=> handleSubmit(e)} />
    </div>
  )
}
