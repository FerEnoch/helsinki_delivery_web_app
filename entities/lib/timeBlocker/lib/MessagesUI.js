import { i18n } from '@/shared/model/i18n'

const {
  DISABLED_DAY,
  DISABLED_HOURS,
  BOOK_ORDER_NOT_DELIVERY,
  ADD_TAKE_AWAY
} = i18n.LANG.ESP.UI.TOAST.TIME_BLOCKER

export class MessagesUI {
  disabledDay () {
    return DISABLED_DAY
  }

  disabledHours () {
    return DISABLED_HOURS
  }

  bookOrderNotDelivey () {
    return BOOK_ORDER_NOT_DELIVERY
  }

  addTakeAway () {
    return ADD_TAKE_AWAY
  }
}
