export function getDate() {
  /*
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
  let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
    .getDate();
  let datetime = year + "-" + month + "-" + day;  // "2018-03-26"
  return datetime;
   */
  // timestamp seconds
  return parseInt((new Date()) / 1000);
}

// 时间戳转换为日期 --年月日
export function unixTimeToDate(unixtime) {
  var d = new Date(parseInt(unixtime) * 1000); // 依情况进行更改 * 1
  return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
}

// 时间戳转换为日期时间 --年月日 时分秒
export function unixTimeToDateTime(unixtime) {
  var now = new Date(unixtime * 1000); // 依情况进行更改 * 1
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  return y + "-"
    + (m < 10 ? "0" + m : m)
    + "-" + (d < 10 ? "0" + d : d)
    + " "
    + now.toTimeString().substr(0, 8);
}
