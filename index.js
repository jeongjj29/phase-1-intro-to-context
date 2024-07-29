function createEmployeeRecord([
  firstNameString,
  familyNameString,
  titleString,
  payRateNumber,
]) {
  const employeeRecord = {
    firstName: firstNameString,
    familyName: familyNameString,
    title: titleString,
    payPerHour: payRateNumber,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays) {
  const arrayOfObjects = [];
  arrayOfArrays.forEach((array) => {
    arrayOfObjects.push(createEmployeeRecord(array));
  });
  return arrayOfObjects;
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
  employeeRecordObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  });
  return employeeRecordObj;
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
  employeeRecordObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  });
  return employeeRecordObj;
}

const testEmpObj = {
  firstName: "Jae",
  familyName: "Jeong",
  title: "student",
  payPerHour: 20,
  timeInEvents: [
    {
      type: "TimeIn",
      hour: 1200,
      date: "2024-07-29",
    },
    {
      type: "TimeIn",
      hour: 100,
      date: "2024-07-30",
    },
  ],
  timeOutEvents: [
    {
      type: "TimeOut",
      hour: 2400,
      date: "2024-07-29",
    },
    {
      type: "TimeOut",
      hour: 2300,
      date: "2024-07-30",
    },
  ],
};

function hoursWorkedOnDate(employeeRecordObj, dateStamp) {
  const timesIn = employeeRecordObj.timeInEvents;
  let timeInHour = 0;
  timesIn.forEach((obj) => {
    if (obj.date === dateStamp) {
      timeInHour = obj.hour;
    }
  });

  const timesOut = employeeRecordObj.timeOutEvents;
  let timeOutHour = 0;
  timesOut.forEach((obj) => {
    if (obj.date === dateStamp) {
      timeOutHour = obj.hour;
    }
  });
  return (timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(employeeRecordObj, dateStamp) {
  const hoursWorked = hoursWorkedOnDate(employeeRecordObj, dateStamp);
  return hoursWorked * employeeRecordObj.payPerHour;
}

function allWagesFor(employeeRecordObj) {
  let totalWagesEarned = 0;
  employeeRecordObj.timeInEvents.forEach((obj) => {
    totalWagesEarned += wagesEarnedOnDate(employeeRecordObj, obj.date);
  });
  return totalWagesEarned;
}

function calculatePayroll(arrayOfEmployees) {
  let totalPayroll = 0;
  arrayOfEmployees.forEach((employee) => {
    totalPayroll += allWagesFor(employee);
  });
  return totalPayroll;
}
