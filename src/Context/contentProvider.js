import { createContext, useContext, useState } from "react";

const ContentContext = createContext()

const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([])
    const [selectedContent, setSelectedContent] = useState({})

    return <ContentContext.Provider value={{ contents, setContents, selectedContent, setSelectedContent }}>
                {children}
           </ContentContext.Provider>
}

export const ContentState = () => {
    return useContext(ContentContext)
}

export default ContentProvider