function formatDate(dateString) {
    // 检查日期字符串的格式
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      // 如果是DD/MM/YYYY格式，直接返回
      return dateString;
    } else if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
      // 如果是DD/MM/YY格式，将YY转换为YYYY
      const parts = dateString.split("/");
      const year = parseInt(parts[2]) < 24 ? "20" + parts[2] : "19" + parts[2];
      return parts[0] + "/" + parts[1] + "/" + year;
    } else if (/^\d{4}\/\d{2}\/\d{1}$/.test(dateString)) {
      // 如果是YYYY/MM/DD格式，将YYYY/MM/DD转换为DD/MM/YYYY
      const parts = dateString.split("/");
      return "0" + parts[2] + "/" + parts[1] + "/" + parts[0];
    } else if (/^\d{2}-[a-zA-Z]{3}-\d{2}$/.test(dateString)) {
      // 如果是DD-MMM-YY格式，将MMM转换为MM，YY转换为YYYY
      const parts = dateString.split("-");
      const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      const year = parseInt(parts[2]) < 24 ? "20" + parts[2] : "19" + parts[2];
      return parts[0] + "/" + months[parts[1]] + "/" + year;
    } else {
      const parts = dateString.split(" ")
      const months = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        Sepptember: "09",
        October: "10",
        November: "11",
        December: "12",
      };
      return parts[0]+'/'+months[parts[1]]+'/'+parts[2];
    }
  }
  
  // 测试示例
  const dateStrings = ["30/01/1943", "03/07/83", "2012/10/3", "19-Jun-98","08 April 1968"];
  dateStrings.forEach((dateString) => {
    console.log(dateString + " 格式化后为: " + formatDate(dateString));
  });