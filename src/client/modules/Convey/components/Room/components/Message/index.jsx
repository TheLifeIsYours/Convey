import React, { useEffect, useState } from 'react'

const Message = ({className, text}) => {
  const [content, setContent] = useState(text)
  const [media, setMedia] = useState([])

  const addToMedia = (media) => {
    setMedia(m => [...m, media])
  }

  useEffect(() => {
    setMedia(text.match(/([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?(\.(jpg|jpeg|png|gif))?/gm))
  }, [])

  return (<>
    <div className={className}>{
      content && content.split(" ").map(text => {
        let isUrl = (/([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm).test(text)

        return <>{ isUrl ? <a href={text} target="_blank">{text}</a> : text} </>
      })
    }</div>
    {media && media.map(media => <img style={{"max-height": "10em", "grid-column": "2", "margin-bottom": "0.5rem"}} src={media} />)}
  </>)
}

export default Message