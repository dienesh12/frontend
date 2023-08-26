import { Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ContentState } from '../Context/contentProvider'

const Add = () => {

  const toast = useToast()
  const navigate = useNavigate()

  const {contents, setContents} = ContentState()

  const BACK_URL = "https://assign-back.onrender.com"

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [videoURL, setVideoURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState("")

  const postImage = async (pic) => {

    // pic not uploaded
    if(pic === undefined) {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        
        return
    }

    // check if pic is an image
    if(pic.type === "image/png" || pic.type === "image/jpeg") {
      const data = new FormData()

      data.append("file", pic)
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME)

      // send post req to cloudinary
      fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
        method: "post",
        body: data
      })
      .then((res) => res.json())
      .then((data) => {
        // set the image data
        console.log(data)
        setImageURL(data.url.toString())
      })
      .catch((err) => {
        console.log(err)
      })
  
    }
    // if the uploaded file is not an image 
    else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
    }
  }

  const postVideo = async (vid) => {
    if(!vid) {
      toast({
        title: "Please Select a Video!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return
    }

    if(vid.type === "video/mp4") {
      console.log(vid)
      const data = new FormData()

      data.append("file", vid)
      data.append("upload_preset", "video_preset")

      const API = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/video/upload`
      const res = await axios.post(API, data)
      const { secure_url } = res.data;
      console.log(secure_url);
      setVideoURL(secure_url.toString())
    } else {
      toast({
        title: "Please Select a Video!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return
    }
  }

  const handleSubmit = async () => {

    if(!title || !desc) {
      toast({
        title: "Please fill title and description!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return
    }

    try {
      const data = {
        title,
        description: desc,
        thumbnail: imageURL,
        video: videoURL
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      
      const response = await axios.post(`${BACK_URL}/upload`, data, config)
  
      console.log(response)
      
      setContents([...contents, response])
      navigate("/list")
    } catch (err) {
      toast({
        title: "Error Occurred!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
  }
 
  return (
    <div className='form-add'>
        <FormControl>
            <FormLabel>TITLE</FormLabel>
            <Input type='text' onChange={(e) => setTitle(e.target.value)}/>
            
            <FormLabel>DESCRIPTION</FormLabel>
            <Textarea onChange={(e) => setDesc(e.target.value)}/>
            
            <FormLabel>THUMBNAIL</FormLabel>
            <Input type='file' onChange={ (e) =>  postImage(e.target.files[0]) }/>
            
            <FormLabel>Video</FormLabel>
            <div style={{ display: "flex" }}>
              <Input type='file' onChange={ (e) => setVideo(e.target.files[0]) }/>
              <Button type='button' onClick={ () => postVideo(video) }> Upload </Button>
            </div>
            
            <Button onClick={ handleSubmit } isLoading={ loading }>Submit</Button>
        </FormControl>
    </div>
  )
}

export default Add