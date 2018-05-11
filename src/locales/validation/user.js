import helper from './helper'

export default {
  staff: {
    userInvalid: helper.invalid('Mã nhân viên'),
    cityInvalid: helper.invalid('Thành phố'),
    roleInvalid: helper.invalid('Loại nhân viên'),
    phoneInvalid: helper.invalid('Số điện thoại'),
    emailInvalid: helper.invalid('Email'),
    nameInvalid: helper.invalid('Tên')
  }
}
