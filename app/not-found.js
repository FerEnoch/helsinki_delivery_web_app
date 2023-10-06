import Link from 'next/link'

export default function NotFound () {
  return (
    <>
      <h2>Not Found</h2>
      <p>Estas viendo esta página porque no se encuentra el recurso...</p>
      <Link href='/'>Return Home</Link>
    </>
  )
}
