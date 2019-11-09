var fs = require('fs')

async function name() {
    var file = fs.readFileSync('./public/data.json')
    var json = JSON.parse(file)
    json.items.forEach(item => {
        item.id = makeid(15)
    });
    fs.writeFileSync('./public/data.json', JSON.stringify(json))

}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
name()