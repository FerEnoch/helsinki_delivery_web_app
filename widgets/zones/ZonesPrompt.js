// import classes from './ZonesPrompt.module.css'
// import { codecProRegular } from '@/shared/config/fonts'
// import Link from 'next/link'
// import { Warning } from '@/shared/ui/lib/svg/Warning'
// import { i18n } from '@/shared/model/i18n'

// const { CART: { CONTINUE_SHOPPING }, ZONES_PROMPT: { PROMPT, BUTTON } } = i18n.LANG.ESP.UI

// export default function ZonesPrompt ({ closeDialog }) {
//   const seeDeliveryZonesText = BUTTON.toUpperCase()
//   const continueShoppingText = CONTINUE_SHOPPING.toUpperCase()
//   const [attention, promptText] = PROMPT.toUpperCase().split('\n')

//   return (
//     <div className={classes.dialog_content}>
//       <header className={classes.header}>
//         <Warning
//           width={150}
//           height={80}
//         />
//         <div className={classes.prompt}>
//           <h3 className={classes.attention}>
//             {attention}
//           </h3>
//           {promptText}
//         </div>
//       </header>
//       <div className={classes.buttons_section}>
//         <Link
//           href='/info/Zonas%20de%20entrega'
//           className={`${classes.see_zones} ${codecProRegular.className}`}
//         >
//           {seeDeliveryZonesText}
//         </Link>
//         <button
//           className={classes.continue_buying_button}
//           onClick={closeDialog}
//         >
//           <p className={codecProRegular.className}>
//             {continueShoppingText}
//           </p>
//         </button>
//       </div>
//     </div>
//   )
// }
