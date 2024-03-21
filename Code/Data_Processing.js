const fs = require("fs");
const current_date = "26/02/2024";

const date_convert = (date) => {
  let parts = date.split("/");
  let newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  return newDate;
};
class DataProcessing {
  constructor() {
    this.raw_user_data = null;
    this.formatted_user_data = null;
    this.cleaned_user_data = null;
    this.user_emails = {};
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
      const title_and_name = user[0].split(" ");
      const date_of_birth = user[1];
      const age = user[2];
      let email = user[3].replace(/\r+$/, "");
      const title_array = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Dr."];
      const titleExist = title_array.includes(title_and_name[0]);
      const title = titleExist
        ? title_and_name[0] == "Dr."
          ? "Dr"
          : title_and_name[0]
        : " ";
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
    this.cleaned_user_data = JSON.parse(
      JSON.stringify(this.formatted_user_data)
    );
    // let cleaned_user_data = Object.assign({}, this.formatted_user_data);;
    this.cleaned_user_data = this.cleaned_user_data.map((user) => {
      // 检查生日格式
      user["date_of_birth"] = this.check_date(user["date_of_birth"]);
      // 检查年龄格式
      user["age"] = this.check_age(user["age"]);
      // 检查邮箱
      switch (this.check_email(user["email"])) {
        case 0: {
          user[
            "email"
          ] = `${user["first_name"]}.${user["surname"]}@example.com`;
          break;
        }
        case 1: {
          user[
            "email"
          ] = `${user["first_name"]}.${user["surname"]}@Liverpool.ac.uk`;
          break;
        }
        case 2: {
          user["email"] = `${user["email"].split("@")[0]}@example.com`;
          break;
        }
        case 3: {
          break;
        }
      }
      const name = user["email"].split("@")[0].split(".");
      // 检查名字
      switch (this.check_name(user["first_name"], user["surname"])) {
        case 0: {
          user["first_name"] = name[0];
          user["surname"] = name[1];
          break;
        }
        case 1: {
          break;
        }
      }
      // 检查年龄与生日
      let age_date = this.calculate_age_date(
        user["age"],
        user["date_of_birth"]
      );
      user["age"] = age_date[0];
      user["date_of_birth"] = age_date[1];
      // 检查邮箱是否重复
      // 存储邮箱
      this.user_emails[user["email"]] == undefined
        ? (this.user_emails[user["email"]] = [1, 0])
        : this.user_emails[user["email"]][0]++;
      return user;
    });

    this.cleaned_user_data = this.cleaned_user_data.map((user) => {
      if (this.user_emails[user["email"]][0] != 1) {
        this.user_emails[user["email"]][1]++;
        const parts = user["email"].split("@");
        user["email"] =
          parts[0] + this.user_emails[user["email"]][1] + "@" + parts[1];
      }
      return user;
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
    let ret_age;
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
      ret_age = ageMap[parts[0]] + ageMap[parts[1]];
    } else if (ageMap[ageString] != undefined) {
      ret_age = ageMap[ageString];
    } else ret_age = ageString;
    return ret_age.toString();
  }
  check_email(emailString) {
    const parts = emailString.split("@");
    const name = parts[0];
    const emailSuffix = parts[1];
    if (name == "") return 0;
    else if (emailSuffix == "Liverpool.ac.uk") return 1;
    else if (emailSuffix != "Liverpool.ac.uk" && emailSuffix != "example.com")
      return 2;
    else return 3;
  }
  // 检查名字是否短缺
  check_name(first_name, surname) {
    if (first_name == "" || surname == "") return 0;
    else return 1;
  }
  // 根据年龄计算日期
  calculate_age_date(ageString, dateString) {
    let newAgeString = this.calculate_age(dateString);
    if (newAgeString == ageString) {
      return [ageString, dateString];
    } else if (newAgeString < 0) {
      // 说明日期错误，需要返回正确日期
      const today = new Date(date_convert(current_date));
      let birth_year = today.getFullYear() - ageString;
      let parts = dateString.split("/");
      return [ageString, `${parts[0]}/${parts[1]}/${birth_year}`];
    } else {
      // 说明年龄错误，需要返回正确年龄
      return [newAgeString, dateString];
    }
  }
  calculate_age(dateString) {
    const birthday = new Date(date_convert(dateString));
    const today = new Date(date_convert(current_date));
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }
  most_common_surname() {
    let surname = {};
    let most_common_surname = [];
    this.cleaned_user_data.forEach((e) => {
      surname[e["surname"]] == undefined
        ? (surname[e["surname"]] = 1)
        : surname[e["surname"]]++;
    });
    // 将对象转换为数组形式
    const surnameArray = Object.entries(surname);

    // 根据值对数组进行排序
    surnameArray.sort((a, b) => b[1] - a[1]);
    let maxNumber = surnameArray[0][1];
    let lengthArray = surnameArray.length;
    most_common_surname.push(surnameArray[0][0]);
    for (let i = 1; i < lengthArray; i++) {
      if (surnameArray[i][1] == maxNumber) {
        most_common_surname.push(surnameArray[i][0]);
      }
    }
    return most_common_surname;
  }
  average_age() {
    let sum_age = 0;
    let user_length = this.cleaned_user_data.length;
    this.cleaned_user_data.forEach((user) => {
      sum_age += parseInt(user["age"]);
    });
    let avg_age = (sum_age / user_length).toPrecision(3);
    return avg_age;
  }
  youngest_dr() {
    let youngest_dr = [];
    let age = 999;
    this.cleaned_user_data.forEach((user) => {
      if (user["title"] == "Dr" && user["age"] < age) {
        age = user["age"];
      }
    });
    this.cleaned_user_data.forEach((user) => {
      if (user["title"] == "Dr" && user["age"] == age) {
        youngest_dr.push(user);
      }
    });
    return youngest_dr;
  }
  most_common_month() {
    let most_common_month = [];
    let months = {};
    this.cleaned_user_data.forEach((user) => {
      const parts = user["date_of_birth"].split("/");
      months[parts[1]] == undefined
        ? (months[parts[1]] = 1)
        : months[parts[1]]++;
    });
    // 将对象转换为数组形式
    const monthsArray = Object.entries(months);

    // 根据值对数组进行排序
    monthsArray.sort((a, b) => b[1] - a[1]);
    let maxNumber = monthsArray[0][1];
    let lengthArray = monthsArray.length;
    most_common_month.push(monthsArray[0][0]);
    for (let i = 1; i < lengthArray; i++) {
      if (monthsArray[i][1] == maxNumber) {
        most_common_month.push(monthsArray[i][0]);
      }
    }
    return most_common_month;
  }
  percentage_titles() {
    let user_length = this.cleaned_user_data.length;
    let title_obj = {
      Mr: 0,
      Mrs: 0,
      Miss: 0,
      Ms: 0,
      Dr: 0,
      " ": 0,
    };
    let percentage_titles = [];
    this.cleaned_user_data.forEach((user) => {
      title_obj[user["title"]]++;
    });
    for (let t in title_obj) {
      percentage_titles.push(
        Math.round((title_obj[t] / user_length) * 100) + "%"
      );
    }
    return percentage_titles;
  }
  percentage_altered() {

    let altered_number = 0;
    let user_length = this.cleaned_user_data.length;
    for (let i = 0; i < user_length; i++) {
      if (
        JSON.stringify(this.formatted_user_data[i]) !=
        JSON.stringify(this.cleaned_user_data[i])
      ) {
        altered_number++;
      }
    }
    console.log(altered_number);
  }
}

// Example usage:
const dataProcessor = new DataProcessing();
// Pass the path to your CSV file
dataProcessor.load_CSV("Data");
dataProcessor.format_data();
dataProcessor.clean_data();
// console.log(dataProcessor.most_common_surname());
// console.log(dataProcessor.most_common_month());
// console.log(dataProcessor.percentage_altered());
