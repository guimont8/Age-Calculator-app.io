let pYears = document.querySelector("#pYears");
let pMonths = document.querySelector("#pMonths");
let pDays = document.querySelector("#pDays");

let divYear = document.querySelector("#divYear");
let divMonth = document.querySelector("#divMonth");
let divDay = document.querySelector("#divDay");

let errorY = document.querySelector("#errorY");
let errorM = document.querySelector("#errorM");
let errorD = document.querySelector("#errorD");

let inputYear = document.querySelector("#inputYear");
let inputMonth = document.querySelector("#inputMonth");
let inputDay = document.querySelector("#inputDay");

let section1 = document.querySelector(".section1");


const button = document.getElementById("submit");

button.addEventListener("click", function () {
    const birthDay = parseInt(inputDay.value);
    const birthMonth = parseInt(inputMonth.value);
    const birthYear = parseInt(inputYear.value);

    divYear.style.color = "black";
    divDay.style.color = "black";
    divMonth.style.color = "black";

    //---------------------------------------------------------------------------------------//

    if (birthYear == "") {
        divYear.style.color = "red";
        errorY.textContent = "This field is required";
    } else if (birthYear >= 2023) {
        divYear.style.color = "red";
        errorY.textContent = "Must be a valid year";
    } else {
        errorY.textContent = "";
    }

    //------------------------------------------------------------------------------------------//

    if (birthDay == "") {
        divDay.style.color = "red";
        errorD.textContent = "This field is required";
    } else if (birthDay < 1 || birthDay > 31) {
        divDay.style.color = "red";
        errorD.textContent = "Must be a valid day (between 1 and 31)";
    } else {
        errorD.textContent = "";
    }

    //--------------------------------------------------------------------------------------------//

    if (birthMonth == "") {
        divMonth.style.color = "red";
        errorM.textContent = "This field is required";
    } else if (birthMonth < 1 || birthMonth > 12) {
        divMonth.style.color = "red";
        errorM.textContent = "Must be a valid month (between 1 and 12)";
    } else {
        if (birthMonth === 2) { // February
            const leapYear = (birthYear % 4 === 0 && birthYear % 100 !== 0) || birthYear % 400 === 0;
            if ((leapYear && birthDay > 29) || (!leapYear && birthDay > 28)) {
                divDay.style.color = "red";
                errorD.textContent = "Must be a valid day for February";
            } else {
                errorM.textContent = "";
            }
        } else if ([4, 6, 9, 11].includes(birthMonth)) { // April, June, September, November
            if (birthDay > 30) {
                divMonth.style.color = "red";
                errorM.textContent = "Must be a valid day for this month";
            } else {
                errorM.textContent = "";
            }
        } else { // All other months (January, March, May, July, August, October, December)
            errorM.textContent = "";
        }

        if (birthYear !== "" && birthMonth !== "" && birthDay !== "" &&
            errorY.textContent === "" && errorM.textContent === "" && errorD.textContent === "") {

            const completeDate = new Date(birthYear, birthMonth - 1, birthDay);
            const currentDate = new Date();

            const difference = currentDate - completeDate;

            const age = new Date(difference);
            const years = age.getUTCFullYear() - 1970;
            const months = age.getUTCMonth();
            const days = age.getUTCDate() - 1;

            pYears.textContent = years;
            pMonths.textContent = months;
            pDays.textContent = days;
        }
    }
});