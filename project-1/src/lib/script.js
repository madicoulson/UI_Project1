// Dummy data for sample inputs
 export let dataPool = [
    {date:'09/03/2024', workout: {"type":"Weight Lifting","duration":60,"lift":[{"exercise":"Bench Press","sets":4,"weight":75},
          {"exercise":"Tricep Dips","sets":4,"weight":30},{"exercise":"Chest Press","sets":4,"weight":40},
          {"exercise":"Curls","sets":4,"weight":12}]}, water:1000, steps:8976},
    {date:'09/04/2024', workout: {type:"Running", distance:3, duration:30}, water:1000, steps:8976},
    {date:'09/05/2024', workout: {type:"Yoga / Pilates", duration:60}, water:1000, steps:6754},
    {date:'09/06/2024', workout: {type:"Running",distance:5,duration:50}, water:1000, steps:10789},
    {date:'09/07/2024', workout: {type:"Yoga / Pilates",duration:45}, water:1000, steps:11290},
    {date:'09/08/2024', workout: {type:"Running",distance:1,duration:10}, water:1000, steps:8900},
    {date:'09/09/2024', workout: {type:"Yoga / Pilates",duration:55}, water:1100, steps:9876},
    {date:'09/10/2024', workout: {type:"Running",distance:2,duration:20}, water:1000, steps:7654}
  ]

  // Defined current day data to append to through interaction in the components
  export let currentDay = {date:'', workout: {type:"", duration:null}, water:null, steps:null};

 // Function to append the currentDay object to the dayArray array. If the user interacts with the page, the array object
  // is updated for the current day. 
  export function appendCurrentDay() {
    // Append the date to the currentDay object by using the getDate() function.
    currentDay.date = getDate();

    // Check and see if there is already an arrayElement that corresponds with  the currentDay entry (there should be
    // since the date object has been added.) The index of the element will be returned. If not element is found, -1 will
    // be returned.
    // Work Cited: https://www.geeksforgeeks.org/javascript-array-findindex-method/
    let index = dataPool.findIndex(arrayElement => arrayElement === currentDay);

    // If the index is not found, update the current element.
    if (index !== -1) {
      dataPool[index] = currentDay;
    }
    // Otherwise, push currentDay object onto the array.
    else {
      dataPool.push(currentDay);
    }

    let check = JSON.stringify(dataPool);
    alert(check);

    return dataPool;

    // Update the rendered graphs and goals with the new data.
    //renderGraphs();
    //renderGoals();
  }

  // Function to get the current date and return it as a string formed as MM/DD/YYYY
  // Work Cited: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  function getDate() {
    // Create a new Date object.
    let currentDate = new Date();

    // Define the day, month, and year. The day and month must be padded because they start at 0.
    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let year = String(currentDate.getFullYear());

    // Concatenate the month, day and year together and cast as a string.
    let currentDateString = month + '/' + day + '/' + year;
    return currentDateString;
  }