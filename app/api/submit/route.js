// import { writeOrder, uploadFile } from '@/services/googleAPIauth/googleDriveClient'

// export async function POST (request) {
// const req = await request.formData()
// // console.log('working!')
// // console.log('req //----->', req)
// try {
//   const responseObject = {}
//   const orderData = {
//     timestamp: req.get('timestamp'),
//     id: req.get('id'),
//     order: req.get('newOrder'),
//     payment: req.get('payment')
//   }
//   const sendOrder = await writeOrder(orderData)
//   const receipt = req.get('receipt')
//   // console.log('receipt >>>>>>>>>>', receipt)

//   if (receipt) {
//     responseObject.uploadedFile = uploadFile(receipt)
//   }

//   if (sendOrder.message === 'OK') {
//     responseObject.sendOrder = 'success!'
//   }

//   return new Response(JSON.stringify(responseObject))
// } catch (e) {
//   console.error('error to send order //>>>>>>>>', e)
//   return new Response(JSON.stringify({ message: 'fail to send order!' }))
// }
// }
