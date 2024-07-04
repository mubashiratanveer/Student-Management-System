import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgGreen("======>Student Application <======"));
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollement = true;
let Students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: chalk.yellowBright("please select an option.\n"),
        choices: ["Enrolled a student", "Show student status"],
    });
    if (action.ans === "Enrolled a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name",
        });
        let trimmedStudentName = studentName.ans.trim();
        let studentNameCheck = Students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName != "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n \tyour Account has been created");
                console.log(chalk.greenBright(`\t   Welcome ${trimmedStudentName}!`));
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Slect your course",
                    choices: [
                        "IT",
                        "Web devlopement",
                        "Graphics designing",
                        "English language",
                    ]
                });
                let courseFee = 0;
                switch (course.ans) {
                    case "IT":
                        courseFee = 8000;
                        break;
                    case "Web devlopement":
                        courseFee = 6000;
                        break;
                    case "Graphics designing":
                        courseFee = 4000;
                        break;
                    case "English language":
                        courseFee = 3000;
                        break;
                }
                let confirmCourse = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to Enrolled this course?",
                });
                if (confirmCourse.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFee);
                    Students.push(Student);
                    console.log("You have Enrolled in this course");
                }
            }
            else {
                console.log("invalid Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (Students.length != 0) {
            let studentNameCheck = Students.map((e) => e.name);
            let selectedName = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name",
                choices: studentNameCheck,
            });
            let foundStudent = Students.find((Student) => Student.name === selectedName.ans);
            console.log("Student information");
            console.log(foundStudent);
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?",
    });
    if (userConfirm.ans === false) {
        continueEnrollement = false;
    }
} while (continueEnrollement);
