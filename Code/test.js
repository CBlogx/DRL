const user = [
  "Mrs Hannah White",
  "23/12/1988",
  "44",
  "Hannah.White@example.com\r",
];

// const title_and_name = user[0].split(" ");
// const date_of_birth = user[1];
// const age = user[2];
// const email = user[3];

// console.log(title_and_name);

// Title and Name
// const title_array = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
// const titleExist = title_array.includes(title_and_name[0]);
// const title = titleExist ? title_and_name[0] : " ";
// const first_name = titleExist ? title_and_name[1] : title_and_name[0];
// const subrname = title_and_name.pop();
// const lastElement = title_and_name.pop();
// const middle_name = lastElement == first_name ? " " : lastElement;
// console.log(title, first_name, middle_name, subrname);

// 处理生日
// correct:30/01/1943
// 03/07/83
// 2012/10/3
// 19-Jun-98

// function formatDate(dateString) {
//   // 检查日期字符串的格式
//   if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
//     // 如果是DD/MM/YYYY格式，直接返回
//     return dateString;
//   } else if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
//     // 如果是DD/MM/YY格式，将YY转换为YYYY
//     const parts = dateString.split("/");
//     const year = parseInt(parts[2]) < 50 ? "20" + parts[2] : "19" + parts[2];
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
//     const year = parseInt(parts[2]) < 50 ? "20" + parts[2] : "19" + parts[2];
//     return parts[0] + "/" + months[parts[1]] + "/" + year;
//   } else {
//     // 无法识别的日期格式，返回空字符串或者其他错误处理方式
//     return "";
//   }
// }

// 测试示例
// const dateStrings = ["30/01/1943", "03/07/83", "2012/10/3", "19-Jun-98"];
// dateStrings.forEach((dateString) => {
//   console.log(dateString + " 格式化后为: " + formatDate(dateString));
// });

// 处理年龄
// function parseAge(ageString) {
//   // 将错误格式的年龄转换为正确格式
//   const ageMap = {
//     zero: 0,
//     one: 1,
//     two: 2,
//     three: 3,
//     four: 4,
//     five: 5,
//     six: 6,
//     seven: 7,
//     eight: 8,
//     nine: 9,
//     ten: 10,
//     eleven: 11,
//     twelve: 12,
//     thirteen: 13,
//     fourteen: 14,
//     fifteen: 15,
//     sixteen: 16,
//     seventeen: 17,
//     eighteen: 18,
//     nineteen: 19,
//     twenty: 20,
//     thirty: 30,
//     forty: 40,
//     fifty: 50,
//     sixty: 60,
//     seventy: 70,
//     eighty: 80,
//     ninety: 90,
//   };

//   // 检查是否包含横杠，如果有，说明是两位数的英文表示
//   if (ageString.includes("-")) {
//     const parts = ageString.split("-");
//     return ageMap[parts[0]] + ageMap[parts[1]];
//   } else {
//     return ageMap[ageString];
//   }
// }

// 测试示例
// const ageStrings = [
//   "sixty",
//   "eighty-eight",
//   "fourteen",
//   "thirty-five",
//   "forty-two",
// ];
// ageStrings.forEach((ageString) => {
//   console.log(ageString + " 改正后的年龄为: " + parseAge(ageString));
// });

// function correctBirthdateByAge(ageString, currentDate) {
//   let data = currentDate.split("/");
//   let birth = ageString[0].split("/");
//   let age = parseInt(ageString[1]);

//   console.log(data, birth, age);
// }

// 处理年龄与生日
// 解析错误格式的年龄字符串

// 测试示例
// const currentDate = "26/02/2024";
// const ageStrings2 = ["03/10/2012", "20"];

// correctBirthdateByAge(ageStrings2, currentDate);

function validateEmail(email) {
  // 使用正则表达式检查邮箱格式
  const parts = email.split("@");

  const name = parts[0];
  console.log(parts);
}

// 测试邮箱地址
var email = "@example.com";
validateEmail(email);

// if (validateEmail(email)) {
//   console.log(email + " 符合邮箱格式");
// } else {
//   console.log(email + " 不符合邮箱格式");
// }
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
console.log(ageMap[10] == undefined);
