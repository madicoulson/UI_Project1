<script lang="js">
    import {dataPool} from './script'
    import { onMount } from "svelte";

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
  let totalWater = 0;
  let goalWaterPercent = 0;
  let goalWater = 0;
  let isWaterGoal = false;
  let isWaterGoalSubmitted = false;

  onMount(()=> {
    calculateSteps();
  })


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
    else if (isDurationGoal) {calculateDuration();}
    else if (isStepGoal) {calculateSteps();}
    else if (isWaterGoal) {calculateWater();}
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

  function calculateWater() {
    totalWater = 0;
    for (let i = 0; i < dataPool.length; i++) {
      totalWater += dataPool[i].water;
    }
    goalWaterPercent = (totalWater / goalWater) * 100;
    isWaterGoalSubmitted = true;
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
    else if (goalType === 'water') {
      toggleIsWater();
    }
    else if (workoutGoalType === 'distance') {
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

  function toggleIsWater() {
    if (isWaterGoal) {isWaterGoal = false;}
    else {isWaterGoal = true;}
  }

  function refreshGoals(){
    if (isDistanceGoalSubmitted) {calculateDistance();}
    if (isDurationGoalSubmitted) {calculateDuration();}
    if (isStepGoalSubmitted) {calculateSteps();}
    if (isWaterGoalSubmitted) {calculateWater();}
  }


</script>

<goalTracker>
    <p class="component_header"> Current Goals </p>
    {#if isAddGoal}
    <p class="component_subheader"> All goals entered will be tracked as a </p>
    <p class="component_subheader">running total against all of your entries.</p>
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
          Insert Goal Amount of Water in mL: <input type="number" class="number_box" min="0" max="100" bind:value={goalWater} />
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
    <button class="component_button_top" on:click={()=>toggleAddGoal()}>Add Goal</button>
    <button class="component_button" on:click={()=>refreshGoals()}>Refresh Goals</button>
      {#if isStepGoalSubmitted}
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
          <p class="progress_text">{goalDurationPercent}%</p>
        </div>
      </div>
      <br>
      {/if}
      {#if isWaterGoalSubmitted}
      <p class="component_subheader"> Water Goal: {goalWater.toLocaleString()} mL </p>
      <p class="component_text"> Current: {totalWater.toLocaleString()} mL </p>
      <div class="progress_bar">
        <div class="progress" style="width: {goalWaterPercent}%">
          <p class="progress_text">{goalWaterPercent}%</p>
        </div>
      </div>
      <br>
      {/if}
    {/if}
</goalTracker>

<style>
goalTracker {
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