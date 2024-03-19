const fs = require("fs");

const current_date = "26/02/2024";

class DataProcessing {
  constructor() {
    this.raw_user_data = null;
    this.formatted_user_data = null;
    this.clean_user_data = null;
  }

  load_CSV(filename) {
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
    this.formatted_user_data.pop();
    this.formatted_user_data = this.formatted_user_data.map((user) => {
      const title_and_name = user[0].trim().split(" ");
      const date_of_birth = user[1];
      const age = user[2];
      let email = user[3].replace(/\r+$/, "");
      const title_array = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
      const titleExist = title_array.includes(title_and_name[0]);
      const title = titleExist ? title_and_name[0] : " ";
      if (titleExist) title_and_name.shift();
      const first_name =
        title_and_name[0] == undefined ? "" : title_and_name[0];
      if (first_name != undefined) title_and_name.shift();
      let lastElement = title_and_name.pop();
      const subrname = lastElement == undefined ? " " : lastElement;
      lastElement = title_and_name.pop();
      const middle_name = lastElement == undefined ? " " : lastElement;
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
    this.clean_user_data = this.formatted_user_data.map((user) => {
      let user_clean = user;
      user_clean["date_of_birth"] = this.check_date(
        user_clean["date_of_birth"]
      );
      user_clean["age"] = this.check_age(user_clean["age"]);
      // 检查邮箱格式
      switch (this.check_email(user_clean["email"])) {
        case 0: {
          user_clean[
            "email"
          ] = `${user_clean["first_name"]}.${user_clean["surname"]}@example.com`;
          break;
        }
        case 1: {
          user_clean["email"] = `${
            user_clean["email"].split("@")[0]
          }@example.com`;
          break;
        }
        case 2: {
          break;
        }
      }
      const name = user_clean["email"].split("@")[0].split(".");
      // 检查姓名
      switch (
        this.check_name(user_clean["first_name"], user_clean["surname"])
      ) {
        case 0: {
          user_clean["first_name"] = name[0];
          user_clean["surname"] = name[1];
          break;
        }
        case 1: {
          break;
        }
      }
      // 检查生日与年龄是否匹配

      return user_clean;
    });
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
        September: "09",
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
    } else if (ageMap[ageString] != undefined) {
      return ageMap[ageString];
    } else return parseInt(ageString);
  }
  check_email(emailString) {
    const parts = emailString.split("@");
    const name = parts[0];
    const emailSuffix = parts[1];
    if (name == "") return 0;
    else if (emailSuffix != "example.com") return 1;
    else return 2;
  }
  // 检查名字是否短缺
  check_name(first_name, surname) {
    if (first_name == "" || surname == "") return 0;
    else return 1;
  }
  most_common_surname() {}
  average_age() {}
  youngest_dr() {}
  most_common_month() {}
  percentage_titles() {}
  percentage_altered() {}
}

// Example usage:
const dataProcessor = new DataProcessing();
// Pass the path to your CSV file
dataProcessor.load_CSV("Data");
dataProcessor.format_data();
dataProcessor.clean_data();
