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
      const title_and_name = user[0];
      const date_of_birth = user[1];
      const age = user[2];
      const email = user[3];

      title_and_name.split(" ");
    });
    // // Map raw user data to formatted data
    // this.formatted_user_data = this.formatted_user_data.map((user) => ({
    //   title: user[0],
    //   date_of_birth: user[1],
    //   age: user[2],
    //   email: user[3],
    // }));
    // // Convert keys to lowercase with underscores
    // this.formatted_user_data = this.formatted_user_data.map((user) => {
    //   let formattedUser = {};
    //   for (let key in user) {
    //     formattedUser[key.toLowerCase().replace(" ", "_")] = user[key];
    //   }
    //   return formattedUser;
    // });

    console.log(this.formatted_user_data);
    // Convert to JSON format
    this.formatted_user_data = JSON.stringify(this.formatted_user_data);
    console.log("Data formatted successfully.");
  }
}

// Example usage:
const dataProcessor = new DataProcessing();
// Pass the path to your CSV file
dataProcessor.load_CSV("Data");
// console.log(dataProcessor.raw_user_data);
dataProcessor.format_data();
