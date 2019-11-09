var axios = require('axios')
var fs = require('fs')
async function main() {
    var dataf = await axios.get('https://laylab.glitch.me/data.json')
    console.log("downloaded")
    await fs.writeFileSync('./public/data.json', JSON.stringify(dataf.data))
    console.log("written")
    console.log("done imported " + dataf.data.items.length + " items")
}
main()