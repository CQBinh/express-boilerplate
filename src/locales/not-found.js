const suffix = (text) => {
  return `${text} không tìm thấy`
}

export default {
  mailTemplate: suffix('Mẫu email'),
  balanceSheet: suffix('Đối soát'),
  chain: suffix('Chuỗi'),
  merchant: suffix('Địa điểm'),
  setting: suffix('Cài đặt địa điểm'),
  user: suffix('Người dùng')
}
