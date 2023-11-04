import Image from 'next/image'

export default function QRServiceOption ({ services }) {
  return (
    <>
      {
      services.map(({ service, image }) => {
        return (
          <article key={service}>
            <h1>{service}</h1>
            <Image
              width={100}
              height={100}
              alt={service}
              src={image}
              onError={() => {}}
            />
          </article>
        )
      })
      }
    </>
  )
}
