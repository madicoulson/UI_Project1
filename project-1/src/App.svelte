<script>
  // Next thing to do: Make charts for the Workout Stats section comparing the different elements of the workouts

   import waterLogo from './svg/water.svg'
   import walkingLogo from './svg/walking.svg'
  
   // Global variable definitions
  let currentDateTime = new Date().toLocaleString();
  let workoutDuration = 0;
  let isRun = false;
  let isYoga = false;
  let isWeightLift = false;
  let isBike = false;
  let isSwim = false;
  let isOther = false;
  let workoutDistance = 0;
  let numSets = 0;
  let weightVal = 0;
  let waterAmount = 0;
  let stepAmount = 0;
  let exerciseName = "";
  let currentDay = {date:'', workout: {type:"", duration:null}, water:null, steps:null};

  // Dummy date for a sample inputs
  let dataPool = [
    {date:'09/08/2024', workout: {type:"Running",distance:1,duration:10}, water:1000, steps:10789},
    {date:'09/09/2024', workout: {type:"Yoga / Pilates",duration:45}, water:1100, steps:9876}
  ]

  // Function to toggle between workouts to ensure only one workout is selected at a time. 
  function toggleWorkout(workout) {
    if (workout === "run") {
      isRun = true;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      addWorkoutType("Running");
    }
    if (workout === "yoga") {
      isRun = false;
      isYoga = true;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      addWorkoutType("Yoga / Pilates");
    }
    if (workout === "weights") {
      isRun = false;
      isYoga = false;
      isWeightLift = true;
      isBike = false;
      isSwim = false;
      isOther = false;
      addWorkoutType("Weight Lifting");
    }
    if (workout === "bike") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = true;
      isSwim = false;
      isOther = false;
      addWorkoutType("Biking");
    }
    if (workout === "swim") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = true;
      isOther = false;
      addWorkoutType("Swimming");
    }
    if (workout === "other") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = true;
      addWorkoutType("Other");
    }
  }

  function addWater (inputWater) {
    currentDay.water = parseInt(inputWater);
    appendCurrentDay();
  }

  function addSteps (inputSteps) {
    currentDay.steps = parseInt(inputSteps);
    appendCurrentDay();
  }

  function addWorkoutType (inputType) {
    currentDay.workout.type = inputType;
  }

  function addWorkoutDuration (inputDuration) {
    currentDay.workout.duration = parseInt(inputDuration);
  }

  function addWorkoutDistance (inputDistance) {
    currentDay.workout.distance = parseInt(inputDistance);
  }

  function addLiftData (inputExercise, inputSets, inputWeight) {
    let lift = {};
    lift.exercise = inputExercise;
    lift.sets = parseInt(inputSets);
    lift.weight = parseInt(inputWeight);

    // Set the exisitingLiftDate to either the already updated currentDay.workout.lift, or
    // an empty array if not initialized. Push the lift data onto exisitingLiftData. 
    const existingLiftData = currentDay.workout.lift || [];
    existingLiftData.push(lift);

    currentDay.workout.lift = existingLiftData;
  }

  // Here want to add so it spits out a summary of your workout
  function submitWorkoutData () {
    appendCurrentDay();
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

  // Function to append the currentDay object to the dayArray array. If the user interacts with the page, the array object
  // is updated for the current day. 
  function appendCurrentDay() {
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
  }


</script>

<main>
  <h1>Fitness Journal
    <p class="dateTime">{currentDateTime}</p>
  </h1>
  <p class="header">DAILY TRACKING</p>

  <div class="row">
    <div class="component">
      <p class="component_header"> Workout Log </p>
      <p class="component_subheader"> Workout Type </p>
      <label class="component_text checkbox_spacing">
        <input type="checkbox" bind:checked={isWeightLift} on:click={()=>toggleWorkout("weights")}> Weight Lifting
        <input type="checkbox" bind:checked={isRun} on:click={()=>toggleWorkout("run")}> Running
        <input type="checkbox" bind:checked={isYoga} on:click={()=>toggleWorkout("yoga")}> Yoga / Pilates
        <input type="checkbox" bind:checked={isBike} on:click={()=>toggleWorkout("bike")}> Biking
        <input type="checkbox" bind:checked={isSwim} on:click={()=>toggleWorkout("swim")}> Swimming
        <input type="checkbox" bind:checked={isOther} on:click={()=>toggleWorkout("other")}> Other    
      </label>
      {#if isRun || isSwim || isBike}
      <div class="dropdown_spacing">
        <label class="component_text">
          Distance in Miles: <input type="number" class="number_box" min="0" max="1000" bind:value={workoutDistance} on:change={()=>addWorkoutDistance(workoutDistance)}>
        </label>
      </div>
      {/if}
      {#if isWeightLift}
      <div class=dropdown_spacing>
        <label class="component_text">
          Exercise: <input type="text" bind:value={exerciseName}>
          <br>
          Sets: <input type="number" class="number_box" bind:value={numSets} min="0" max="100" />
          <br>
          Weight (lbs): <input type="number" class="number_box" bind:value={weightVal} min="0" max="1000" />
        </label>
        <br>
        <button class="general_button" on:click={()=>addLiftData(exerciseName, numSets, weightVal)}>Submit</button>
      </div>
      {/if}
      <p class="component_subheader"> Duration in Minutes </p>
      <input type="number" class="number_box" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)} />
	    <input type="range" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)}/>
      <br>
      <button class="component_button" on:click={()=>submitWorkoutData()}>Submit Workout</button>
    </div>

    <div class="component">
      <p class="component_header"> Water Log </p>
      <img src={waterLogo} alt="Water Bottle">
      <br>
      <label class="center component_subheader">
        Input Water (mL): <input type="number" class="number_box" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)} />
        <input type="range" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)} />
      </label>
    </div>

    <div class="component">
      <p class="component_header"> Step Counter </p>
      <img src={walkingLogo} alt="Walking">
      <br>
      <label class="center component_subheader">
        Input Steps: <input type="number" class="number_box" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} />
        <input type="range" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} />
      </label>
    </div>
  </div>  

  <p class="header">PROGRESS TRACKING</p>

  <div class="row">
    <div class="component">
      <p class="component_header"> Current Goals </p>
    </div>

    <div class="component">
      <p class="component_header"> Workout Stats </p>
    </div>

    <div class="component">
      <p class="component_header"> Past Workouts </p>
    </div>
  </div>  
</main>

<style>
</style>
