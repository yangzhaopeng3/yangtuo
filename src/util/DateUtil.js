export function getDate() {
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
  let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
    .getDate();
  let datetime = year + "-" + month + "-" + day;  // "2018-03-26"
  return datetime;
}
