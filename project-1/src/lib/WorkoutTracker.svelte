<script lang="js">
    import {dataPool} from './script'
    import { onMount } from "svelte";

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
    displayPastWorkouts();
  })

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
      alreadyInitialized = true;
    }
  }


</script>

  <workoutTracker>
    <p class="component_header"> Past Workouts </p>

    <div class="workoutTrackerContent">
    <div class="workoutTrackerLeft"> 
    <p class="component_subheader">Past Workout: {workoutDate}</p>
    {#if editWorkout}
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


    {:else}
    <p class="component_text"> {@html workoutDisplay} </p>
    {/if}
  </div>
  <div class="workoutTrackerRight">
    {#if editWorkout}
    <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Cancel</button>
    <button class="component_button" on:click={()=>updateWorkout()} on:click={()=>toggleEditWorkout()}> Submit Changes </button>

    {:else}
      <button class="component_button_top" on:click={()=>toggleEditWorkout()}>Edit Workout</button>
      <button class="component_button" on:click={()=> displayPastWorkouts()}> Next Workout > </button>
    {/if}
  </div>
</div>
  </workoutTracker>


  <style>
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

.workoutTrackerContent {
    display:flex;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
}

  .workoutTrackerLeft {
    overflow: auto;
    width: 100%;
    scrollbar-width:thin;
  }

  .workoutTrackerRight {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  </style>