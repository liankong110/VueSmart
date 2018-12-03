export default {
  islocal () {
    // 判断环境
    let islocal =
      location.hostname.match(/^localhost$/) ||
      // 10.0.0.0-10.255.255.255
      location.hostname.match(/^10(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){3}$/) ||
      // 172.16.0.0—172.31.255.255
      location.hostname.match(/^172\.([1][6-9]|[2]\d|3[01])(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}$/) ||
      // 192.168.0.0-192.168.255.255
      location.hostname.match(/^192\.168(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}$/)
    return islocal
  }
}
