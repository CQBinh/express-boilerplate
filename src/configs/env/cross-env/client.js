export default {
  client: {
    common: {
      cities: {
        title: 'Thành phố',
        default: 'all',
        list: [{
          _id: 'all',
          text: 'Tất cả'
        }, {
          _id: 'da-nang',
          text: 'Đà Nẵng'
        }, {
          _id: 'ho-chi-minh',
          text: 'TPHCM'
        }]
      }
    },
    merchant: {
      statuses: {
        title: 'Trạng thái',
        default: 'all',
        list: [{
          _id: 'all',
          text: 'Tất cả'
        }, {
          _id: 'active',
          text: 'Đang hoạt động'
        }, {
          _id: 'inactive',
          text: 'Không hoạt động'
        }]
      }
    },
    staff: {
      roles: {
        title: 'Loại',
        default: 'all',
        list: [{
          _id: 'all',
          text: 'Tất cả'
        }, {
          _id: 'admin',
          text: 'Admin'
        }, {
          _id: 'sale',
          text: 'Sale'
        }, {
          _id: 'accountant',
          text: 'Accountant'
        }, {
          _id: 'marketing',
          text: 'Marketing'
        }, {
          _id: 'customercare',
          text: 'Customer care'
        }]
      }
    },
    balanceSheet: {
      statuses: {
        title: 'Trạng thái',
        default: 'all',
        list: [{
          _id: 'all',
          text: 'Tất cả'
        }, {
          _id: 'unpaid',
          text: 'Chưa thu'
        }, {
          _id: 'paid',
          text: 'Đã thu'
        }, {
          _id: 'no-expense',
          text: 'Không có doanh thu'
        }]
      }
    }
  }
}
