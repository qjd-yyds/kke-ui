// 将数字转换成千分位
const formatMoney = (money: string) => {
  return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',');
};
// 获取url里的参数值
const getQueryByName = (name) => {
  const queryNameRegex = new RegExp(`[?&]${name}=([^&]*)(&|$)`)
  const queryNameMatch = window.location.search.match(queryNameRegex)
  // Generally, it will be decoded by decodeURIComponent
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}
// 转小驼峰
const camelCase = (string) => {
  const camelCaseRegex = /[-_\s]+(.)?/g
  return string.replace(camelCaseRegex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}
// 小写转大写
const capitalize = (string) => {
  const capitalizeRegex = /(?:^|\s+)\w/g
  return string.toLowerCase().replace(capitalizeRegex, (match) => match.toUpperCase())
}
// html字符串转义
const escapeHtml = (string) => {
  const escapeMaps = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    "'": '#39'
  }
  // The effect here is the same as that of /[&amp;<> "']/g
  const escapeRegexp = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')
  return string.replace(escapeRegexp, (match) => `&${escapeMaps[match]};`)
}
// html反转义
const unescapeHtml = (string) => {
  const unescapeMaps = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    '#39': "'"
  }
  const unescapeRegexp = /&([^;]+);/g
  return string.replace(unescapeRegexp, (match, unescapeKey) => {
    return unescapeMaps[ unescapeKey ] || match
  })
}
// 校验24小时是否合法
const check24TimeRegexp = /^(?:(?:0?|1)\d|2[0-3]):(?:0?|[1-5])\d$/
// 校验日期是否合法
const checkDateRegexp = /^\d{4}([-\.\/])(?:0[1-9]|1[0-2])\1(?:0[1-9]|[12]\d|3[01])$/
