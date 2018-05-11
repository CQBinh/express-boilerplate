export default {
  file: {
    extension: {
      excel: '.xlsx'
    },
    excel: {
      style: {
        header: {
          alignment: {
            horizontal: 'left',
            vertical: 'middle'
          },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF6600' }
          },
          border: {
            top: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
          },
          font: {
            color: { argb: 'FFFFFFFF' },
            bold: true
          }
        },
        cell: {
          alignment: {
            horizontal: 'left'
          }
        }
      }
    },
    balanceSheet: `${process.cwd()}/src/files/balance-sheets`
  }
}
