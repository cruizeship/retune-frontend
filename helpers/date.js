import moment from "moment";

export const dateDiffFromNow = (date) => {
    const moment_converted_time = moment
        .utc(date, "YYYY-MM-DDTHH:mm:SS")
        .fromNow();

    return moment_converted_time === "Invalid date"
        ? ""
        : moment_converted_time;
};

export const isUnderage = (birthdate) => {
    const currDate = new Date();
    var birthday = new Date(birthdate);
    var age = currDate.getFullYear() - birthday.getFullYear();
    var m = currDate.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && currDate.getDate() < birthday.getDate())) {
        age--;
    }
    if (age < 13) {
        return true;
    } else {
        return false;
    }
};
