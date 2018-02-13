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
    this.device = null;

    this.bells = [
      new BuzzBell('12712710240', '127127160240', '12712780240', '12712740240', '12712720240'),
      new BuzzBell('127127320240', '12712702240', '12712701240', '1271271280240', '127127640240'),
      new BuzzBell('12712704240', '127127064240', '127127032240', '127127016240', '12712708240'),
      new BuzzBell('1271270128240', '12712700248', '12712700244', '12712700242', '12712700241')
    ]
  }


  open() {
    try {
      let deviceInfo = HID.devices().find(
        device => device.product == 'Logitech Buzz(tm) Controller V1'
      )

      this.device = new HID.HID(deviceInfo.path)
    } catch (err) {
      window.alert('Connect buzz controllers')
      this.open()
    }
  }

  close() {
    this.device.close()

    this.device = null
  }

  data(onerror, ondata) {
    this.open()
    this.device.on('error', onerror)
    this.device.on('data', ondata)
  }

  identify(codeArray) {
    let code = codeArray.reduce((acum, curr) => acum.toString() + curr.toString())

    let bellMatch = this.bells.map((bell, index) => {
      let obj = { button: bell.codename[code], player: index }

      return obj;
    })

    let buttonPressed = bellMatch.filter((bellCompare) => bellCompare.button !== undefined)[0]

    return buttonPressed;
  }
}

module.exports = new BuzzController();
