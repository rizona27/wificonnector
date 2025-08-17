const formatTime = date => {
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份（注意：JavaScript中的月份是从0开始的，所以需要加1）
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒
  
    // 使用 map 方法对年、月、日进行格式化，并用 '/' 连接
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
  
  const formatNumber = n => {
    n = n.toString(); // 将数字转换为字符串
    return n[1] ? n : '0' + n; // 如果字符串长度大于1，直接返回；否则在前面补零
  }
  
  module.exports = {
    formatTime: formatTime // 导出 formatTime 函数
  }
  