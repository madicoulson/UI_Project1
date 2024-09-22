<script lang="js">
  import {dataPool} from './script'
  import { onMount } from "svelte";

  // Binded global variables for past workouts
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

  // Function to run displayPastWorkouts to update past workouts on mount of the page.
  onMount(()=> {
    displayPastWorkouts();
  })

  // Function to display past workouts within component.
  function displayPastWorkouts (noCountIncrease = false) {
    // Only increase clickCount after the first run is complete so the first workout 
    // appears upon mount.
    if (firstRunComplete === true && noCountIncrease === false) {
      clickCount++;
    }

    // Reset the clickCount back to 0 after looping through the dataPool array.
    if (clickCount >= dataPool.length) { 
      clickCount = 0;
    }

    // Redefine the workout date, type, duration, distance, and lift variables based upon the clickCount.
    selectedWorkoutType = dataPool[clickCount].workout.type;
    selectedWorkoutDuration = dataPool[clickCount].workout.duration;
    selectedWorkoutDistance = dataPool[clickCount].workout.distance;
    selectedWorkoutLift = dataPool[clickCount].workout.lift;
    workoutDate = dataPool[clickCount].date;

    // Stringify the number workout.duration.
    let durationString = JSON.stringify(dataPool[clickCount].workout.duration);
    
    // Define the workoutDisplay with the workout type and duration, as these are required fields.
    workoutDisplay = "Workout Type: " + dataPool[clickCount].workout.type + "<br>" + "Duration: " + durationString + " minutes <br>";

    // If the workout includes a distance, append it to the workoutDisplay.
    if (dataPool[clickCount].workout.distance !== undefined){
      // Stringify the number workout.distance.
      let distanceString = JSON.stringify(dataPool[clickCount].workout.distance);
      workoutDisplay += "Distance: " + distanceString + " miles";
    }

    // If the workout includes a lift, append it to the workoutDisplay.
    if (dataPool[clickCount].workout.lift !== undefined){
      let workoutData = dataPool[clickCount].workout.lift;
      // Loop through the lift data and append the values to the workoutDisplay.   
      for (let i = 0; i < workoutData.length; i++) {
        workoutDisplay += "<br>" + "Exercise: " + workoutData[i].exercise + "<br>" + "Sets: " + JSON.stringify(workoutData[i].sets) + "<br>" + "Weight: " + JSON.stringify(workoutData[i].weight) + " lbs <br>";
      }
    }
    firstRunComplete = true;
  }

  // Function to change and update the workout data.
  function updateWorkout() 
  {
    // If the workout type, duration, or distance is defined, set the dataPool value equal to it.
    if (newWorkoutType != "") {dataPool[clickCount].workout.type = newWorkoutType;}
    if (newWorkoutDuration != null) {dataPool[clickCount].workout.duration = newWorkoutDuration;}
    if (newWorkoutDistance != null) {dataPool[clickCount].workout.distance = newWorkoutDistance;}

    // If the workout lift is defined, loop through each value and set the dataPool value equal to it.
    if (newWorkoutExercises.length > 0){
      selectedWorkoutLift.forEach((lift, index) => {
        lift.exercise = newWorkoutExercises[index];
        lift.sets = newWorkoutSets[index];
        lift.weight = newWorkoutWeights[index];
      })   
    }  

    // Refresh the display
    displayPastWorkouts(true);

    // Reset all variables for next update.
    newWorkoutType = "";
    newWorkoutDuration = null;
    newWorkoutDistance = null;
    alreadyInitialized = false;
    newWorkoutExercises = [];
    newWorkoutSets = [];
    newWorkoutWeights = [];
  }

  // Function to toggle if a workout is being added.
  function toggleEditWorkout() {
    if (editWorkout) {editWorkout = false;}
    else {editWorkout = true;}
  }

  // Function to initialize the workout array with the lift data upon change.
  function initializeWorkoutArrays() {
    if (alreadyInitialized === false) {
      selectedWorkoutLift.forEach((lift, index) => {
        newWorkoutExercises[index] = lift.exercise;
        newWorkoutSets[index] = lift.sets;
        newWorkoutWeights[index] = lift.weight;
      })
      alreadyInitialized = true;
    }
  }
</script>

<workoutTracker>
  <p class="component_header"> Past Workouts </p>

  <div class="workoutTrackerContent">
    <!-- Definition of left side of component -->
    <div class="workoutTrackerLeft"> 
      <p class="component_subheader">Past Workout: {workoutDate}</p>

      <!-- Setup for when workout is being edited -->
      {#if editWorkout}
        <!-- Display the workout type and duration with editable features -->
        <label class="component_text">Workout Type:
          <input type="text" placeholder={selectedWorkoutType} bind:value={newWorkoutType}>
        </label>
        <br>
        <label class="component_text"> Duration:
          <input type="number" placeholder={selectedWorkoutDuration.toLocaleString()} bind:value={newWorkoutDuration}>
        </label>
        <br>

        <!-- If the workout includes a distance, display the workout duration with editable features -->
        {#if selectedWorkoutDistance !== undefined}
          <label class="component_text"> Distance:
            <input type="number" placeholder={selectedWorkoutDistance.toLocaleString()} bind:value={newWorkoutDistance}>
          </label>
        {/if}
        <br>
        
        <!-- If the workout includes a lift, display the workout lift with editable features -->
        {#if selectedWorkoutLift !== undefined}
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
      
      <!-- Setup for display of past workouts -->
      {:else}
        <p class="component_text"> {@html workoutDisplay} </p>
      {/if}
    </div>
    
    <!-- Definition of right side of component for buttons -->
    <div class="workoutTrackerRight">
      <!-- Setup for when workout is being edited -->
      {#if editWorkout}
      <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Cancel</button>
      <button class="component_button" on:click={()=>updateWorkout()} on:click={()=>toggleEditWorkout()}> Submit Changes </button>

      <!-- Setup for display of past workouts -->
      {:else}
        <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Edit Workout</button>
        <button class="component_button" on:click={()=> displayPastWorkouts()}> Next Workout > </button>
      {/if}
    </div>
  </div>
</workoutTracker>


<style>
  /*workoutTracker component style defintion**/
  workoutTracker {
    background-color: rgb(228, 234, 238);
    height: 50vh;
    width: 33vw;
    max-width: 100%;
    max-height: 100%;
    border: rgb(52, 76, 98);
    border-width: 1.5px;
    border-style: solid;
    border-radius: 16px;
    display:flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;
  }

  /*Component content style defintion**/
  .workoutTrackerContent {
      display:flex;
      justify-content: space-between;
      overflow: hidden;
      height: 100%;
  }

  /*Left side of workoutTracker component style defintion**/
  .workoutTrackerLeft {
    overflow: auto;
    width: 100%;
    scrollbar-width:thin;
  }

  /*Right side of workoutTracker component style defintion**/
  .workoutTrackerRight {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>