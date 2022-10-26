const excelToJson = require('convert-excel-to-json')

const excelToData = async (filename) => {
  return await excelToJson({
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
