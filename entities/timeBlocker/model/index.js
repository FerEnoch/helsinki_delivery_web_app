// import { dayPeriods } from '../lib/config/periods'
// import { getBusinessHours } from '../service/getBusinessHours'
// /*
// TO DO:
// --> white test
// */
// export async function buildBusinessHours () {
//   const {
//     openToOrders,
//     businessHours: {
//       delivery: {
//         normalNight: deliveryNormalNight,
//         extendedNight: deliveryExtendedNight
//       },
//       takeAway: {
//         earlyAfternoon: takeAwayEarlyAfternoon
//       }
//     },
//     grid: daysGrid
//   } = await getBusinessHours()

//   return {
//     daysGrid,
//     defaultStartBusinessDay: openToOrders,
//     defaultStartDelivery: deliveryNormalNight.from,
//     defaultEndBusinessDay: deliveryNormalNight.to,
//     extendedBusinessDay: deliveryExtendedNight.to,
//     notBusinessDays: daysGrid
//       .map(({ day, delivery, takeAway }, index, week) => {
//         if (!day) return null
//         const dayBefore = index - 1 < 0 ? week[week.length - 1] : week[index - 1]
//         let startingHour
//         switch (dayBefore.delivery) {
//           case 'Horario extendido':
//             startingHour = deliveryExtendedNight.to
//             break
//           case 'Horario normal':
//             startingHour = deliveryNormalNight.to
//             break
//           case 'Cerrado':
//             startingHour = 0
//         }
//         return {
//           day,
//           delivery,
//           takeAway,
//           startingHour
//         }
//       })
//       .filter(
//         day => /cerrado/i.test(day.delivery) && /cerrado/i.test(day.takeAway)
//       )
//       .filter(Boolean),
//     middayTakeAway: daysGrid
//       .filter(
//         ({ takeAway }) => /siesta/i.test(takeAway)
//       )
//       .map(({ day }) => {
//         return {
//           day,
//           hours: {
//             [dayPeriods.MIDDAY]: [takeAwayEarlyAfternoon.from, takeAwayEarlyAfternoon.to]
//           }
//         }
//       })
//   }
// }
