import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ContentState } from '../Context/contentProvider'
import ContentBox from '../Components/ContentBox'
import "../App.css"

const List = () => {

  const toast = useToast()

  const {contents, setContents} = ContentState()
  console.log(contents)

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    try {
      const { data } = await axios.get("https://assign-back.onrender.com/contents")

      console.log(data)
      setContents(data)
    } catch(err) {
      toast({
        title: "Unable to fetch Content",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
  }

  return (
    <>
      <div className='content-list'>
        {
          contents?.map((content) => (
            <ContentBox content={ content }/>
          ))
        }
      </div>
    </>
  )
}

export default List