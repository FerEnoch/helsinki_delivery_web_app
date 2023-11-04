import Image from 'next/image'

export default function QRImage ({ service, image }) {
  return (
    <article key={service}>
      <Image
        width={100}
        height={100}
        alt={service}
        src={image}
        onError={() => {}}
      />
    </article>
  )
}
