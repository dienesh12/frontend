import React, { useState } from 'react'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ContentState } from '../Context/contentProvider'

const ContentBox = ({ content }) => {

  const navigate = useNavigate()
  const { selectedContent, setSelectedContent } = ContentState()

  const handleClick = () => {
    
    setSelectedContent(content)
    const id = content._id
    console.log(id)
    navigate(`/video/${id}`)
  }

  return (
    <>
      <div className='Box'>
        <div className='img-cont'>
          <img style={{height: "100%", width: "100%", cursor: "pointer"}} src={content?.thumbnail} alt="" onClick={ handleClick }/>
        </div>
        <div className='content-cont'>
          <b style={{ fontSize: "30px" }}>{ content.title }</b>
          <p> { content.description } </p>
        </div>
      </div>
    </>
  )
}

export default ContentBox