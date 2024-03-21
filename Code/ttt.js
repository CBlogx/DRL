// const user1 = [
//   "Mrs Hannah White",
//   "08/06/1965",
//   "62",
//   "Hannah.White@example.com\r",
// ];
// const user2 = [
//   "Mrs Hannah White",
//   "02/11/2028",
//   "21",
//   "Hannah.White@example.com",
// ];
// const current_date = "26/02/2024";
// function check_date(dateString) {
//   // 检查日期字符串的格式
//   if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
//     // 如果是DD/MM/YYYY格式，直接返回
//     return dateString;
//   } else if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
//     // 如果是DD/MM/YY格式，将YY转换为YYYY
//     const parts = dateString.split("/");
//     const year = parseInt(parts[2]) < 24 ? "20" + parts[2] : "19" + parts[2];
//     return parts[0] + "/" + parts[1] + "/" + year;
//   } else if (/^\d{4}\/\d{2}\/\d{1}$/.test(dateString)) {
//     // 如果是YYYY/MM/DD格式，将YYYY/MM/DD转换为DD/MM/YYYY
//     const parts = dateString.split("/");
//     return "0" + parts[2] + "/" + parts[1] + "/" + parts[0];
//   } else if (/^\d{2}-[a-zA-Z]{3}-\d{2}$/.test(dateString)) {
//     // 如果是DD-MMM-YY格式，将MMM转换为MM，YY转换为YYYY
//     const parts = dateString.split("-");
//     const months = {
//       Jan: "01",
//       Feb: "02",
//       Mar: "03",
//       Apr: "04",
//       May: "05",
//       Jun: "06",
//       Jul: "07",
//       Aug: "08",
//       Sep: "09",
//       Oct: "10",
//       Nov: "11",
//       Dec: "12",
//     };
//     const year = parseInt(parts[2]) < 24 ? "20" + parts[2] : "19" + parts[2];
//     return parts[0] + "/" + months[parts[1]] + "/" + year;
//   } else {
//     const parts = dateString.split(" ");
//     const months = {
//       January: "01",
//       February: "02",
//       March: "03",
//       April: "04",
//       May: "05",
//       June: "06",
//       July: "07",
//       August: "08",
//       Sepptember: "09",
//       October: "10",
//       November: "11",
//       December: "12",
//     };
//     return parts[0] + "/" + months[parts[1]] + "/" + parts[2];
//   }
// }
// function date_convert(date) {
//   let parts = date.split("/");
//   let newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
//   return newDate;
// }

// function calculate_age_date(age, date) {
//   let ageByDate = calculate_age(date);
//   if (ageByDate == age) {
//     return [age, date];
//   } else if (ageByDate < 0) {
//     // 说明日期错误，需要返回正确日期
//     const today = new Date(date_convert(current_date));
//     let birth_year = today.getFullYear() - age;
//     let parts = date.split("/");
//     return [age, `${parts[0]}/${parts[1]}/${birth_year}`];
//   } else {
//     // 说明年龄错误，需要返回正确年龄
//     return [ageByDate, date];
//   }
// }
// function calculate_age(date) {
//   const birthday = new Date(date_convert(date));
//   const today = new Date(date_convert(current_date));
//   let age = today.getFullYear() - birthday.getFullYear();
//   const m = today.getMonth() - birthday.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
//     age--;
//   }
//   return age;
// }
// let b = calculate_age_date(user1[2], user1[1]);
// let d = calculate_age_date(user2[2], user2[1]);
// console.log(b);
// console.log(d);
// const fs = require("fs");
// const rows = [];
// function load_CSV(filename) {
//   try {
//     this.raw_user_data = fs.readFileSync(filename + ".csv", "utf4");
//     console.log("CSV data loaded successfully.");
//   } catch (err) {
//     console.error("Error loading CSV file:", err);
//   }
//   console.log(this.raw_user_data);
// }

// load_CSV("Data");

// user_emails = {};

// const emails = [
//   "example@example.com",
//   "test@test.com",
//   "example@example.com",
//   "test@test.com",
//   "another@example.com",
// ];
// emails.forEach((e) => {
//   user_emails[e] == undefined ? (user_emails[e] = 1) : user_emails[e]++;
// });
// console.log(user_emails);
const user1 = {
  title: " ",
  first_name: "Alexander",
  middle_name: "William",
  surname: "Hughes",
  date_of_birth: "28/08/1964",
  age: "59",
  email: "Alexander.Hughes@example.com",
};
const user2 = {
  title: " ",
  first_name: "Alexander",
  middle_name: "William",
  surname: "Hughes",
  date_of_birth: "28/08/1964",
  age: "59",
  email: "Alexander.Hughes@example.com",
};
console.log(JSON.stringify(user2));
console.log(JSON.stringify(user1));
console.log(JSON.stringify(user1) == JSON.stringify(user2));
