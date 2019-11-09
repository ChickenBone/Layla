var fs = require('fs')

async function name() {
    var file = fs.readFileSync('./public/data.json')
    var json = JSON.parse(file)
    json.items.forEach(item => {
        item.title = ""
        item.views = 0
        item.shared = 0
        item.hidden = false
    });
    fs.writeFileSync('./public/data.json', JSON.stringify(json))

}

name()