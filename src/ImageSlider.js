import {useState, useEffect} from "react"
import styled from 'styled-components'

const ImageSlider = (props) => {
  const {images} = props
  const nextPress = useKeyPress('ArrowRight')
  const prevPress = useKeyPress('ArrowLeft')
  const [current, setCurrent] = useState(0)
  
  useEffect(() => {
    if(nextPress){
      const newCurrent = current + 1
      if(newCurrent === images.length) setCurrent(0)
      else setCurrent(newCurrent)
    }else if(prevPress){
      const newCurrent = current - 1
      if(current === 0) setCurrent(images.length -1)
      else setCurrent(newCurrent)
    }
  }, [nextPress, prevPress]);

  return <Container>
    <img src={images[current].url} />
  </Container>


}

const Container = styled.div`
  width: 100%;
`

export default ImageSlider

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}