let HID = require('node-hid')

class BuzzBell {
  constructor(buzz, blue, orange, green, yellow) {
    this.buzz = buzz;
    this.blue = blue;
    this.orange = orange;
    this.green = green;
    this.yellow = yellow;

    this.codename = {}
    this.codename[buzz] = "buzz"
    this.codename[blue] = "blue"
    this.codename[orange] = "orange"
    this.codename[green] = "green"
    this.codename[yellow] = "yellow"
  }
}

class BuzzController {
  constructor() {
    this.bells = []
  }

  addBell(buzz, blue, orange, green, yellow) {
    this.bells.push(new BuzzBell(buzz, blue, orange, green, yellow))
  }

  decode(code) {
    let codename = this.bells.map((bell, index) => bell.codename[code] + index)
    codename = codename.filter(codename => typeof codename !== 'number')[0]

    return codename
  }
}

let devices = HID.devices()

let deviceInfo = devices.find(d => d.product === 'Logitech Buzz(tm) Controller V1')

let device = new HID.HID(deviceInfo.path)

let buzzController = new BuzzController()

buzzController.addBell('12712710240', '127127160240', '12712780240', '12712740240', '12712720240')
buzzController.addBell('127127320240', '12712702240', '12712701240', '1271271280240', '127127640240')
buzzController.addBell('12712704240', '127127064240', '127127032240', '127127016240', '12712708240')
buzzController.addBell('1271270128240', '12712700248', '12712700244', '12712700242', '12712700241')


device.on("error", error => console.log("Error: " + error))

while(true) {
  let code = device.readSync().reduce((acum, curr) => acum.toString() + curr.toString())
  console.log(buzzController.decode(code))
}
