import { HOURS_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants.js'
import { ICONS } from '@/icons.js'

export function isPageValid(page) {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export function isIconValid(icon) {
  return Object.keys(ICONS).includes(icon)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
}
export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value)
}

function isNumberOrNull(value) {
  return isNumber(value) || isNull(value)
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }

  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isButtonTypeValid(button) {
  return BUTTON_TYPES.includes(button)
}

function isUndefined(value) {
  return value === undefined
}

export function isNull(value) {
  return value === null
}

export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}

function isNumber(value) {
  return typeof value === 'number'
}

function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

function isString(value) {
  return typeof value === 'string'
}
