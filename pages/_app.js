import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false)

  

  return (
    <>
      <Component {...pageProps} modalOpen={open} setOpen={setOpen} />
      <div id="modal"></div>
    </>
  )
}

export default MyApp
