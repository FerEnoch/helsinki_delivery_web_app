export default function DataForm () {
  // const fileRef = useRef()
  // const [message, setMessage] = useState('')

  // const submitHandler = async (e) => {
  //   // send info to api --> .then --> send whatsapp message --> e.target.text.value
  //   e.preventDefault()
  //   const date = new Date()
  //   const { fileInput, enteredData } = e.target
  //   const data = enteredData.value
  //   if (!data) return

  //   const formData = new FormData()
  //   const payment = fileInput.value ? 'Pagado' : 'Efectivo'
  //   formData.append('timestamp', date.toLocaleString())
  //   formData.append('id', crypto.randomUUID())
  //   formData.append('newOrder', data)
  //   formData.append('payment', payment)

  //   if (fileInput.value) {
  //     const paymentReceipt = fileRef.current.files[0]
  //     formData.append('receipt', paymentReceipt)
  //   }

  //   const response = await fetch('/api/submit', {
  //     method: 'POST',
  //     body: formData
  //   })

  //   if (!response.ok) {
  //     console.error('bad request!')
  //     return
  //   }
  //   const { message } = await response.json()
  //   console.log(message)
  //   setMessage('')
  // }

  // const changeHandler = (e) => {
  //   setMessage(e.target.value)
  // }

  return (
    <>
      <h1>DataForm</h1>
      {/* <form
          onSubmit={submitHandler}
          >
          <label htmlFor='fileInput'>
            Upload File to Drive
          </label>
          <input
          name='fileInput'
          type='file'
          ref={fileRef}
          accept='image/*'
          />

          <br />

          <label htmlFor='enteredData'>
          Insert text to sheet
          </label>
          <input
          name='enteredData'
          type='text'
          value={message}
          onChange={changeHandler}
          />

          <br />

          <button type='submit'>
          enviar info
          </button>
        </form> */}
    </>
  )
}
