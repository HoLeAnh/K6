(async () => {
    var excel = require('../common/ExcelWorker.js')

    var data = { "table": [{ "Number": "1", "Token": "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInBob25lTnVtYmVyIjoiMDM0MzkwMjk2MCIsInJvbGVJZCI6MSwiaWF0IjoxNTkzMDQ5ODI4LCJleHAiOjE1OTgyMzM4Mjh9.i-Ro_H47n6wZOGmrbXxHVfsGD04w0aO-wfy4E6hj1h4" }, { "Number": "1", "Token": "2eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInBob25lTnVtYmVyIjoiMDM0MzkwMjk2MCIsInJvbGVJZCI6MSwiaWF0IjoxNTkzMDQ5ODI4LCJleHAiOjE1OTgyMzM4Mjh9.i-Ro_H47n6wZOGmrbXxHVfsGD04w0aO-wfy4E6hj1h4" }, { "Number": "1", "Token": "3eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInBob25lTnVtYmVyIjoiMDM0MzkwMjk2MCIsInJvbGVJZCI6MSwiaWF0IjoxNTkzMDQ5ODI4LCJleHAiOjE1OTgyMzM4Mjh9.i-Ro_H47n6wZOGmrbXxHVfsGD04w0aO-wfy4E6hj1h4" }, { "Number": "1", "Token": "4eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInBob25lTnVtYmVyIjoiMDM0MzkwMjk2MCIsInJvbGVJZCI6MSwiaWF0IjoxNTkzMDQ5ODI4LCJleHAiOjE1OTgyMzM4Mjh9.i-Ro_H47n6wZOGmrbXxHVfsGD04w0aO-wfy4E6hj1h4" }, { "Number": "1", "Token": "5eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInBob25lTnVtYmVyIjoiMDM0MzkwMjk2MCIsInJvbGVJZCI6MSwiaWF0IjoxNTkzMDQ5ODI4LCJleHAiOjE1OTgyMzM4Mjh9.i-Ro_H47n6wZOGmrbXxHVfsGD04w0aO-wfy4E6hj1h4" }] }
    var path = '../data/book.xlsx'

    var wb = await excel.getWorkbook(path)
    var sheet = await excel.getSheet(wb, 'Sheet2')
    var table = data.table

    for (let i = 0; i < table.length; i++) {
        let token = table[i].Token

        console.log('i : ' + i)
        console.log('token : ' + token)

        excel.setValue(sheet, i + 1, 1, i)
        excel.setValue(sheet, i + 1, 2, token)
    }
    await excel.writeExcel(wb, path)

    console.log('Done')
})();