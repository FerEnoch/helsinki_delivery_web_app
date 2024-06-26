import classes from './InfoPageWrapper.module.css'
/* eslint-disable @next/next/no-img-element */

export default function InfoPageWrapper ({ children }) {
  return (
    <main className={classes.wrapper}>
      {children}
      <img
        className={classes.viking_image}
        alt='Vikingo del logo de Helsinki con un jarrón de cerveza expumante'
        src='/assets/drinking_viking.png'
        width={100}
        height={120}
      />
    </main>
  )
}
