<script lang="js">
    import {appendCurrentDay, dataPool, currentDay} from './script'
    import { Chart } from 'chart.js/auto';
    import { onMount } from "svelte";

 // Chart definitions for within Tracking Stats component
let durationChart;
let stepChart;
 let chart1, chart2;
 

  // Binded values for goals
  let totalStepCount = 0;
  let isAddGoal = false;
  let goalType = "";
  let workoutGoalType = "";
  let goalSteps = 100000;
  let goalStepsPercent = 0;
  let goalDistance = 0;
  let isDistanceGoal = false;
  let isDistanceGoalSubmitted = false;
  let totalDistance = 0;
  let goalDistancePercent = 0;
  let totalDuration = 0;
  let goalDurationPercent = 0;
  let goalDuration = 0;
  let isDurationGoal = false;
  let isDurationGoalSubmitted = false;
  let isStepGoalSubmitted = false;
  let isStepGoal = false;

  // Binded and helper values within Past Workouts component
  let clickCount = 0;
  let firstRunComplete = false;
  let selectedWorkoutType = dataPool[clickCount].workout.type;
  let selectedWorkoutDuration = dataPool[clickCount].workout.duration;
  let selectedWorkoutDistance = dataPool[clickCount].workout.distance;
  let selectedWorkoutLift = dataPool[clickCount].workout.lift;
  let workoutDisplay = JSON.stringify(dataPool[0].workout);
  let workoutDate = dataPool[0].date;
  let editWorkout = false;
  let newWorkoutType = "";
  let newWorkoutDuration = null;
  let newWorkoutDistance = null;
  let newWorkoutExercises = [];
  let newWorkoutSets = [];
  let newWorkoutWeights = [];
  let alreadyInitialized = false;

  onMount(()=> {
    renderGraphs();
    displayPastWorkouts();
    calculateSteps();
  })

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

  function calculateSteps(){
    totalStepCount = 0;
    for (let i = 0; i < dataPool.length; i++) {
      totalStepCount += dataPool[i].steps;
    }
    goalStepsPercent = (totalStepCount / goalSteps) * 100;
    isStepGoalSubmitted = true;
  }

  function addGoal(){
    if (isDistanceGoal) {calculateDistance();}
    if (isDurationGoal) {calculateDuration();}
    if (isStepGoal) {calculateSteps();}
    toggleAddGoal();

  }

  function calculateDistance(){
    totalDistance = 0;
    for (let i = 0; i < dataPool.length; i++) {
      if (dataPool[i].workout.distance != null || dataPool[i].workout.distance != undefined)
        totalDistance += dataPool[i].workout.distance;
    }
    goalDistancePercent = (totalDistance / goalDistance) * 100;
    isDistanceGoalSubmitted = true;
  }

  function calculateDuration() {
    totalDuration = 0;
    for (let i = 0; i < dataPool.length; i++) {
      totalDuration += dataPool[i].workout.duration;
    }
    goalDurationPercent = (totalDuration / goalDuration) * 100;
    isDurationGoalSubmitted = true;
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
    selectedWorkoutLift = dataPool[clickCount].workout.lift;

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

  function updateWorkout() 
  {
    if (newWorkoutType != "") {dataPool[clickCount].workout.type = newWorkoutType;}

    if (newWorkoutDuration != null) {dataPool[clickCount].workout.duration = newWorkoutDuration;}
    if (newWorkoutDistance != null) {dataPool[clickCount].workout.distance = newWorkoutDistance;}

    // LEFT OFF HERE - Need to map everything here!
    if (newWorkoutExercises.length > 0){
      selectedWorkoutLift.forEach((lift, index) => {
        lift.exercise = newWorkoutExercises[index];
        lift.sets = newWorkoutSets[index];
        lift.weight = newWorkoutWeights[index];
      })   
    }  

    // Refresh the display
    displayPastWorkouts(true);

    renderGraphs();

    // IMPORTANT TO RESET THINGS HERE!
    newWorkoutType = "";
    newWorkoutDuration = null;
    newWorkoutDistance = null;
    alreadyInitialized = false;
    newWorkoutExercises = [];
    newWorkoutSets = [];
    newWorkoutWeights = [];
  }

  function toggleEditWorkout() {
    if (editWorkout) {editWorkout = false;}
    else {editWorkout = true;}
  }

  function initializeWorkoutArrays() {
    if (alreadyInitialized === false) {
      selectedWorkoutLift.forEach((lift, index) => {
        newWorkoutExercises[index] = lift.exercise;
        newWorkoutSets[index] = lift.sets;
        newWorkoutWeights[index] = lift.weight;
      })
    
      alert(JSON.stringify(newWorkoutExercises));
      alert(JSON.stringify(newWorkoutSets));
      alreadyInitialized = true;
    }
  }

  function toggleAddGoal() {
    if (isAddGoal) {isAddGoal = false;}
    else {isAddGoal = true;}
  }

  function toggleIsDistance() {
    if (isDistanceGoal) {isDistanceGoal = false;}
    else {isDistanceGoal = true;}
  }

  function toggleIsSteps() {
    if (isStepGoal) {isStepGoal = false;}
    else {isStepGoal = true;}
  }

  function selectGoal() {
    if (goalType === 'steps') {
      toggleIsSteps();
    }
    if (workoutGoalType === 'distance') {
      toggleIsDistance();
    }
    else if (workoutGoalType === 'duration') {
      toggleIsDuration();
    }
  }

  function toggleIsDuration() {
    if (isDurationGoal) {isDurationGoal = false;}
    else {isDurationGoal = true;}
  }


</script>


<div class="component">
  <p class="component_header"> Current Goals </p>
  {#if isAddGoal}
  <br>
  <p class="component_subheader"> All goals entered will be tracked as a running total against all of your entries. </p>
    <button class="component_button_top" on:click={()=>toggleAddGoal()}>Cancel</button>
    <button class="component_button" on:click={()=>addGoal()}> Submit Goal </button>
    <label for="goal_type" class="component_subheader">Select Goal Type:</label>
    <select name="goal_type" class="component_text" bind:value={goalType} on:change={()=>selectGoal()}>
      <option> </option>
      <option value="workout"> Workout </option>
      <option value="water"> Water </option>
      <option value="steps"> Steps </option>
    </select>
    {#if goalType === "water"}
      <br>
      <br>
      <label class="component_subheader">
        Insert Goal Amount of Water in mL: <input type="number" class="number_box" min="0" max="100" />
      </label>
    {/if}
    {#if goalType === "steps"}
      <br>
      <br>
      <label class="component_subheader">
        Insert Goal Amount of Steps: <input type="number" class="number_box" min="0" max="100" bind:value={goalSteps} />
      </label>
    {/if}
    {#if goalType === "workout"}
      <br>
      <br>
      <label for="workout_goal" class="component_subheader">Select Workout Goal Type:</label>
      <select name="goal_type" class="component_text" bind:value={workoutGoalType} on:change={()=>selectGoal()}>
        <option> </option>
        <option value="distance"> Distance </option>
        <option value="duration"> Duration </option>
      </select>
      {#if workoutGoalType === "distance"}
      <br>
      <br>
      <label class="component_subheader">
        Insert Goal Number of Miles: <input type="number" class="number_box" min="0" max="100" bind:value={goalDistance} />
      </label>
      {/if}
      {#if workoutGoalType === "duration"}
        <br>
        <br>
        <label class="component_subheader">
          Insert Goal Number of Minutes: <input type="number" class="number_box" min="0" max="100" bind:value={goalDuration} />
        </label>
      {/if}
    {/if}
  {:else}
    {#if isStepGoalSubmitted}
    <button class="component_button_top" on:click={()=>toggleAddGoal()}>Add Goal</button>
    <p class="component_subheader"> Step Goal: {goalSteps.toLocaleString()} steps </p>
    <p class="component_text"> Current: {totalStepCount.toLocaleString()} steps </p>
    <div class="progress_bar">
      <div class="progress" style="width: {goalStepsPercent}%">
        <p class=progress_text>{goalStepsPercent}%</p>
      </div>
    </div>
    <br>
    {/if}
    {#if isDistanceGoalSubmitted}
    <p class="component_subheader"> Distance Goal: {goalDistance.toLocaleString()} miles </p>
    <p class="component_text"> Current: {totalDistance.toLocaleString()} miles </p>
    <div class="progress_bar">
      <div class="progress" style="width: {goalDistancePercent}%">
        <p class=progress_text>{goalDistancePercent}%</p>
      </div>
    </div>
    <br>
    {/if}
    {#if isDurationGoalSubmitted}
    <p class="component_subheader"> Duration Goal: {goalDuration.toLocaleString()} minutes </p>
    <p class="component_text"> Current: {totalDuration.toLocaleString()} minutes </p>
    <div class="progress_bar">
      <div class="progress" style="width: {goalDurationPercent}%">
        <p class=progress_text>{goalDurationPercent}%</p>
      </div>
    </div>
    <br>
    {/if}

  {/if}
  </div>

  <div class="component">
    <p class="component_header"> Tracking Stats </p>
    <button class="component_button_top" on:click={()=>renderGraphs()}>Refresh Graphs</button>
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

      <br>
      {#if selectedWorkoutLift !== undefined}
      <p class="component_text"> {JSON.stringify(selectedWorkoutLift)} </p>
      {#each selectedWorkoutLift as lift, index}
      <label class="component_text">Exercise:
        <input type="text" on:click={()=>initializeWorkoutArrays()} placeholder={lift.exercise} bind:value={newWorkoutExercises[index]}>
      </label>
      <br>
      <label class="component_text">Sets:
        <input type="number" on:click={()=>initializeWorkoutArrays()} placeholder={lift.sets.toLocaleString()} bind:value={newWorkoutSets[index]}>
      </label>
      <br>
      <label class="component_text">Weight:
        <input type="number" on:click={()=>initializeWorkoutArrays()} placeholder={lift.weight.toLocaleString()} bind:value={newWorkoutWeights[index]}>
      </label>
      <br>
      <br>
      {/each}
      {/if}

      <button class="component_button" on:click={()=>updateWorkout()} on:click={()=>toggleEditWorkout()}> Submit Changes </button>


    {:else}
    <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Edit Workout</button>
    <p class="component_text"> {@html workoutDisplay} </p>
    <button class="component_button" on:click={()=> displayPastWorkouts()}> Next Workout > </button>
    {/if}
  </div>

  <style>
  .component_button {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    padding: 12px 24px 12px 24px;
    margin-top: 10px;
    background-color:rgb(52, 76, 98);
    color: white;
    border-radius: 16px;
    width:fit-content;
    position:absolute;
    right: 10px;
    bottom: 10px;
  }

  .component_button_top {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    padding: 6px 12px 6px 12px;
    margin-top: 10px;
    background-color:rgb(52, 76, 98);
    color: white;
    border-radius: 16px;
    width:fit-content;
    position:absolute;
    top: 72px;
    right: 10px;
  }

  .component {
    background-color: rgb(228, 234, 238);
    height: 50vh;
    width: 33vw;
    max-width: 100%;
    max-height: 100%;
    border: rgb(52, 76, 98);
    border-width: 1.5px;
    border-style: solid;
    padding: 10px;
    margin: 10px;
    position: relative;
    border-radius: 16px;
    overflow:auto;
  }

  .component_text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: rgb(52, 76, 98);
    font-size: 20px;
    font-weight: 400px;
    padding-top: 0px;
  }

  .progress_bar {
    width: 100%;
    background-color:  rgb(211, 217, 222);
    height: 30px;
    border-radius: 5px;
    margin-top: 10px;
  }

  .progress {
    background-color: rgb(52, 76, 98);
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease;
  }

  .progress_text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-size: 20px;
    font-weight: 400px;
    padding-top: 2px;
    padding-left: 5px;
  }
  </style>