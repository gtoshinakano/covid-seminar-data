
const DisplayContent = (props) => {
  const {content} = props

  switch(content) {
    case "start":
      return content;
    default :
      return "Content"
  }
}

export default DisplayContent