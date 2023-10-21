class Utils {
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

export default Utils;
