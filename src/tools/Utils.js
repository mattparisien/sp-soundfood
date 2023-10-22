class Utils {
  constructor() {}

  static midpoint(x1, y1, x2, y2) {
    return {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };
  }

  static rgbToRgba() {}

  static rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  }

  static getPixelColor(img, x, y, format, opacity) {
    const px = img.get(x, y);
    let final;

    if (!Array.isArray(px)) return;

    switch (format) {
      case "rgb":
        final = `rgb(${[px[0]]}, ${px[1]}, ${px[2]})`;
        break;
      case "rgba":
        final = `rgba(${[px[0]]}, ${px[1]}, ${px[2]}, ${opacity})`;
        break;
      default:
        final = Utils.rgbToHex(px[0], px[1], px[2]);
    }

    return final;
  }

  static drawPoint(x, y) {
    stroke("black");
    strokeWeight(50);
    point(x, y);
    noStroke();
  }

  static formatSeconds(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  }

  static formatDate(date) {
    let dateStr = "";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const arr = date.substring(0, 10).split("-");
    const year = arr[0];
    const month = arr[1];
    const day = arr[2];

    dateStr += `${monthNames[month - 1]} ${day}, ${year}`;

    return dateStr;
  }
}
