import React, { useEffect, useState } from 'react'
import { ContentState } from '../Context/contentProvider'
import '../App.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Video = () => {


  const { selectedContent, setSelectedContent } = ContentState()

  const BACK_URL = "http://localhost:5005"

  const { id } = useParams()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {

    try {
      const response = await axios.get(`${BACK_URL}/getContent/${id}`)
      console.log(response.data)
      setSelectedContent(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='video-player'>
<video height="800px" width="800px" controls>
                          <source src={ selectedContent.video } type="video/mp4" />
                        </video>

      </div>
    </>
  )
}

export default Video