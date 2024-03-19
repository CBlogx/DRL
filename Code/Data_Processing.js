const fs = require("fs");

class DataProcessing {
  constructor() {
    this.raw_user_data = null;
    this.formatted_user_data = null;
  }

  load_CSV(filename) {
    // Assuming filename is a string representing the path to the CSV file

    // Read the CSV file (you may need to use different approach depending on environment)
    // Here's an example for Node.js environment
    try {
      this.raw_user_data = fs.readFileSync(filename + ".csv", "utf8");
      console.log("CSV data loaded successfully.");
    } catch (err) {
      console.error("Error loading CSV file:", err);
    }
  }
  format_data() {
    if (!this.raw_user_data) {
      console.error("No raw user data available.");
      return;
    }

    const rows = this.raw_user_data.split("\n");
    this.formatted_user_data = rows.map((row) => row.split(","));
    this.formatted_user_data = this.formatted_user_data.map((user) => {
      console.log(user);
      const title_and_name = user[0].split(" ");
      const date_of_birth = user[1];
      const age = user[2];
      let email = user[3]
      const title_array = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
      const titleExist = title_array.includes(title_and_name[0]);
      const title = titleExist ? title_and_name[0] : " ";
      const first_name = titleExist ? title_and_name[1] : title_and_name[0];
      const subrname = title_and_name.pop();
      const lastElement = title_and_name.pop();
      const middle_name = lastElement == first_name ? " " : lastElement;
      return {
        title: title,
        first_name:
          first_name.charAt(0).toUpperCase() +
          first_name.slice(1).toLowerCase(),
        middle_name: middle_name,
        surname: subrname,
        date_of_birth: date_of_birth,
        age: age,
        email: email,
      };
    });
  }
  clean_data() {
    this.clean_user_data = this.formatted_user_data.map((user) => {});
  }
  // Check and rectify the date format
  check_date(dateString) {
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
      const parts = dateString.split(" ");
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
      return parts[0] + "/" + months[parts[1]] + "/" + parts[2];
    }
  }
  check_age(ageString) {
    // 将错误格式的年龄转换为正确格式
    const ageMap = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
    };

    // 检查是否包含横杠，如果有，说明是两位数的英文表示
    if (ageString.includes("-")) {
      const parts = ageString.split("-");
      return ageMap[parts[0]] + ageMap[parts[1]];
    } else {
      return ageMap[ageString];
    }
  }
}

// Example usage:
const dataProcessor = new DataProcessing();
// Pass the path to your CSV file
dataProcessor.load_CSV("Data");
dataProcessor.format_data();
dataProcessor.clean_data();
