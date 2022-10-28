const excelToJson = require('convert-excel-to-json')

const excelToData = (filename) => {
  return excelToJson({
    sourceFile: '/app/media/tempCSV/' + filename,
    header: {
      rows: 1,
    },
    columnToKey: {
      '*': '{{columnHeader}}',
    },
  })
}

module.exports = { excelToData }
