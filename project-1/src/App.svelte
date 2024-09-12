<script>
  // https://svelte.dev/examples/area-chart
  // https://dev.to/wesleymutwiri/create-beautiful-charts-with-svelte-and-chart-js-512n
  // https://www.chartjs.org/docs/latest/samples/other-charts/pie.html
  // https://www.w3schools.com/ai/ai_chartjs.asp
  // https://www.educative.io/answers/how-to-create-charts-with-svelte-and-chartjs


  import waterLogo from './svg/water.svg'
  import walkingLogo from './svg/walking.svg'
  import { Chart } from 'chart.js/auto';
  import { onMount } from "svelte";
  import Header from './lib/Header.svelte'

  //***************************** GLOBAL VARIABLES *****************************//
  
  // Dummy data for sample inputs
  let dataPool = [
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
  let currentDay = {date:'', workout: {type:"", duration:null}, water:null, steps:null};

  // Chart definitions for within Tracking Stats component
  let durationChart;
  let stepChart;
  let chart1, chart2;

  // Current Date/Time Variable used in header display
  let currentDateTime = new Date().toLocaleString();
  
  // Binded values within Workout Log component
  let workoutDuration = 0;
  let isRun = false;
  let isYoga = false;
  let isWeightLift = false;
  let isBike = false;
  let isSwim = false;
  let isOther = false;
  let workoutDistance = 0;
  let exerciseName = "";
  let numSets = 0;
  let weightVal = 0;
  
  // Binded value within Water Log component
  let waterAmount = 0;

  // Binded value within Step Counter component
  let stepAmount = 0;

  // Binded and helper values within Past Workouts component
  let clickCount = 0;
  let firstRunComplete = false;
  let selectedWorkoutType = dataPool[clickCount].workout.type;
  let selectedWorkoutDuration = dataPool[clickCount].workout.duration;
  let selectedWorkoutDistance = dataPool[clickCount].workout.distance;
  let workoutDisplay = JSON.stringify(dataPool[0].workout);
  let workoutDate = dataPool[0].date;
  let editWorkout = false;
  let newWorkoutType = "";
  let newWorkoutDuration = null;
  let newWorkoutDistance = null;

  // Binded values for goals
  let totalStepCount = 0;
  let goalStepCount = 100000;
  let goalStepGraph;
  let goalGraph1;


  //***************************** FUNCTIONS *****************************//

  function renderGraphs() {
    // Prepare the labels (dates) and dataset (durations) for the chart
    let dateLabels = dataPool.map(entry => entry.date);
    const durations = dataPool.map(entry => entry.workout.duration);
    const steps = dataPool.map(entry=> entry.steps);

    const durationData = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Workout Durations',
                data: durations,
                backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
                fill: false
            }
        ]
    };

    const dataSteps = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Step Count',
                data: steps,
                backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
                fill: false
            }
        ]
    };

    // Destroy existing charts if they exist
    if (chart1) chart1.destroy();
    if (chart2) chart2.destroy();

    const ctx = durationChart.getContext('2d');
    // Initialize chart using default config set
    chart1 = new Chart(ctx, {
      type: 'line',
      data: durationData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            title: {
              text: 'Date',
              display: true
            }
          },
          y : {
            title: {
              text: 'Duration in Minutes',
              display: true
            },
            beginAtZero:true
          }
        }
      }
    });
    const ctx2 = stepChart.getContext('2d');
    // Initialize chart using default config set
    chart2 = new Chart(ctx2, {
      type: 'line',
      data: dataSteps,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            title: {
              text: 'Date',
              display: true
            }
          },
          y : {
            title: {
              text: 'Step Count',
              display: true
            },
            beginAtZero:true
          }
        }
      }
    });
  }

  function renderGoals () {
    calculateSteps();
    const stepData = {
        labels: ['Steps Taken', 'Steps to Go'],
        datasets: [
            {
                data: [totalStepCount, goalStepCount-totalStepCount],
                backgroundColor: ['#7000e1', '#fc8800'],
            }
        ]
    };

    // Destroy existing charts if they exist
    if (goalGraph1) goalGraph1.destroy();

    const ctx = goalStepGraph.getContext('2d');
    goalGraph1= new Chart(ctx, {
      type: 'pie',
      data: stepData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Step Goal: 100,000'
          }
        }
      },
    });
  }
  
  onMount(()=> {
    renderGraphs();
    displayPastWorkouts();
    renderGoals();
  })

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

  function toggleEditWorkout() {
    if (editWorkout) {editWorkout = false;}
    else {editWorkout = true;}
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
    if (currentDay.workout.type === "" || currentDay.workout.duration === null || currentDay.workout.duration === 0) {
      alert("Please insert a workout type and duration before submitting.")
    }
    else {appendCurrentDay();} 
    let check = JSON.stringify(currentDay.workout);
    alert(check);  
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

    // Update the rendered graphs and goals with the new data.
    renderGraphs();
    renderGoals();
  }

  function displayPastWorkouts (noCountIncrease = false) {
    if (firstRunComplete === true && noCountIncrease === false) {
      clickCount++;
    }
    if (clickCount >= dataPool.length) { 
      clickCount = 0;
    }

    selectedWorkoutType = dataPool[clickCount].workout.type;
    selectedWorkoutDuration = dataPool[clickCount].workout.duration;
    selectedWorkoutDistance = dataPool[clickCount].workout.distance;

    let durationString = JSON.stringify(dataPool[clickCount].workout.duration);
    workoutDate = dataPool[clickCount].date;
    workoutDisplay = "Workout Type: " + dataPool[clickCount].workout.type + "<br>" + "Duration: " + durationString + " minutes <br>";

    if (dataPool[clickCount].workout.distance !== undefined){
      let distanceString = JSON.stringify(dataPool[clickCount].workout.distance);
      workoutDisplay += "Distance: " + distanceString + " miles";
    }
    if (dataPool[clickCount].workout.lift !== undefined){
      let workoutData = dataPool[clickCount].workout.lift;   
      for (let i = 0; i < workoutData.length; i++) {
        workoutDisplay += "<br>" + "Exercise: " + workoutData[i].exercise + "<br>" + "Sets: " + JSON.stringify(workoutData[i].sets) + "<br>" + "Weight: " + JSON.stringify(workoutData[i].weight) + " lbs <br>";
      }
    }
    firstRunComplete = true;
  }

  function updateWorkout(type, duration, distance) 
  {
    if (type != "") {dataPool[clickCount].workout.type = type;}

    if (duration != null) {dataPool[clickCount].workout.duration = duration;}
    if (distance != null) {dataPool[clickCount].workout.distance = distance;}
  
    // Refresh the display
    displayPastWorkouts(true);

    renderGraphs();

    newWorkoutType = "";
    newWorkoutDuration = null;
    newWorkoutDistance = null;
  }

  function calculateSteps(){
    totalStepCount = 0;
    for (let i = 0; i < dataPool.length; i++) {
      totalStepCount += dataPool[i].steps;
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
      <canvas bind:this={goalStepGraph}></canvas>
    </div>

    <div class="component">
      <p class="component_header"> Tracking Stats </p>
      <canvas bind:this={durationChart}></canvas>
      <canvas bind:this={stepChart}></canvas>
    </div>

    <div class="component">
      <p class="component_header"> Past Workouts </p>
      <p class="component_subheader">Past Workout: {workoutDate}</p>
      {#if editWorkout}

        <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Cancel</button>
        <label class="component_text">Workout Type:
          <input type="text" placeholder={selectedWorkoutType} bind:value={newWorkoutType}>
        </label>
        <br>
        <label class="component_text"> Duration:
          <input type="number" placeholder={selectedWorkoutDuration.toLocaleString()} bind:value={newWorkoutDuration}>
        </label>

        <br>
        {#if selectedWorkoutDistance !== undefined}
        <label class="component_text"> Distance:
          <input type="number" placeholder={selectedWorkoutDistance.toLocaleString()} bind:value={newWorkoutDistance}>
        </label>
        {/if}

        <button class="component_button" on:click={()=>updateWorkout(newWorkoutType, newWorkoutDuration, newWorkoutDistance)} on:click={()=>toggleEditWorkout()}> Submit Changes </button>


      {:else}
      <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Edit Workout</button>
      <p class="component_text"> {@html workoutDisplay} </p>
      <button class="component_button" on:click={()=> displayPastWorkouts()}> Next Workout > </button>
      {/if}
    </div>
  </div>  
</main>

<style>
</style>
