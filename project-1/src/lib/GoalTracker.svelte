<script lang="js">
    import {dataPool} from './script'
    import { onMount } from "svelte";

    // Binded global variables for goals
    let totalStepCount = 0;
    let isAddGoal = false;
    let goalType = "";
    let workoutGoalType = "";
    let goalSteps = 100000;
    let goalStepsPercent = 0;
    let goalDistance = 1;
    let isDistanceGoal = false;
    let isDistanceGoalSubmitted = false;
    let totalDistance = 0;
    let goalDistancePercent = 0;
    let totalDuration = 0;
    let goalDurationPercent = 0;
    let goalDuration = 1;
    let isDurationGoal = false;
    let isDurationGoalSubmitted = false;
    let isStepGoalSubmitted = false;
    let isStepGoal = false;
    let totalWater = 0;
    let goalWaterPercent = 0;
    let goalWater = 1;
    let isWaterGoal = false;
    let isWaterGoalSubmitted = false;

    // Function to run calculateSteps to update step goal on mount of the page.
    onMount(()=> {
      calculateSteps();
    })

    // Function to calculate the percentage of steps taken over the goal amount of steps.
    function calculateSteps(){
      // Calculate the totalStepCount by looping through the dataPool array.
      totalStepCount = 0;
      for (let i = 0; i < dataPool.length; i++) {
        totalStepCount += dataPool[i].steps;
      }
      // Calculate the percentage of steps taken and set the goal submitted bool to true.
      goalStepsPercent = (totalStepCount / goalSteps) * 100;
      isStepGoalSubmitted = true;
    }

    // Function to run the appropriate calculate function based on the binded goal type.
    function addGoal(){
      if (isDistanceGoal) {calculateDistance();}
      else if (isDurationGoal) {calculateDuration();}
      else if (isStepGoal) {calculateSteps();}
      else if (isWaterGoal) {calculateWater();}
      toggleAddGoal();
    }

    // Function to calculate the percentage of distance taken over the goal amount of distance.
    function calculateDistance(){
      // Calculate the totalDistance by looping through the dataPool array.
      totalDistance = 0;
      for (let i = 0; i < dataPool.length; i++) {
        if (dataPool[i].workout.distance != null || dataPool[i].workout.distance != undefined)
          totalDistance += dataPool[i].workout.distance;
      }
      // Calculate the percentage of distance taken and set the goal submitted bool to true.
      goalDistancePercent = (totalDistance / goalDistance) * 100;
      isDistanceGoalSubmitted = true;
    }

    // Function to calculate the percentage of duration over the goal amount of duration.
    function calculateDuration() {
      // Calculate the totalDuration by looping through the dataPool array.
      totalDuration = 0;
      for (let i = 0; i < dataPool.length; i++) {
        totalDuration += dataPool[i].workout.duration;
      }
      // Calculate the percentage of duration and set the goal submitted bool to true.
      goalDurationPercent = (totalDuration / goalDuration) * 100;
      isDurationGoalSubmitted = true;
    }

    // Function to calculate the percentage of water drank over the goal amount of amount.
    function calculateWater() {
      // Calculate the totalWater by looping through the dataPool array.
      totalWater = 0;
      for (let i = 0; i < dataPool.length; i++) {
        totalWater += dataPool[i].water;
      }
      // Calculate the percentage of water drank and set the goal submitted bool to true.
      goalWaterPercent = (totalWater / goalWater) * 100;
      isWaterGoalSubmitted = true;
    }

    // Function to toggle whether a goal is being added.
    function toggleAddGoal() {
      if (isAddGoal) {isAddGoal = false;}
      else {isAddGoal = true;}
    }

    // Function to toggle whether a distance goal is being added.
    function toggleIsDistance() {
      if (isDistanceGoal) {isDistanceGoal = false;}
      else {isDistanceGoal = true;}
    }
    
    // Function to toggle whether a step goal is being added.
    function toggleIsSteps() {
      if (isStepGoal) {isStepGoal = false;}
      else {isStepGoal = true;}
    }

    // Function to determine which goal is being set based upon its type.
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

    // Function to toggle whether a duration goal is being added.
    function toggleIsDuration() {
      if (isDurationGoal) {isDurationGoal = false;}
      else {isDurationGoal = true;}
    }

    // Function to toggle whether a water goal is being added.
    function toggleIsWater() {
      if (isWaterGoal) {isWaterGoal = false;}
      else {isWaterGoal = true;}
    }

    // Function to refresh the goals so upon data update, the goals update as well.
    function refreshGoals(){
      if (isDistanceGoalSubmitted) {calculateDistance();}
      if (isDurationGoalSubmitted) {calculateDuration();}
      if (isStepGoalSubmitted) {calculateSteps();}
      if (isWaterGoalSubmitted) {calculateWater();}
    }
</script>

<goalTracker>
    <p class="component_header"> Current Goals </p>
    <div class="goalTrackerContent">
      <!-- Definition of left side of component -->
      <div class="goalTrackerLeft">
      <!-- Setup for when goal is being added -->
      {#if isAddGoal}
        <p class="component_subheader"> All goals entered will be tracked as a running total against all of your entries. </p>
        <label for="goal_type" class="component_subheader">Select Goal Type:</label>
        <select name="goal_type" class="component_text" bind:value={goalType} on:change={()=>selectGoal()}>
          <option> </option>
          <option value="workout"> Workout </option>
          <option value="water"> Water </option>
          <option value="steps"> Steps </option>
        </select>
        
        <!-- Adding water goal -->
        {#if goalType === "water"}
          <br>
          <br>
          <label class="component_subheader">
            Insert Goal Amount of Water in mL: <input type="number" class="number_box" min="1" max="1000000" bind:value={goalWater} />
          </label>
        {/if}
        
        <!-- Adding water step -->
        {#if goalType === "steps"}
          <br>
          <br>
          <label class="component_subheader">
            Insert Goal Amount of Steps: <input type="number" class="number_box" min="1" max="10000000" bind:value={goalSteps} />
          </label>
        {/if}
        
        <!-- Adding workout goal -->     
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
            Insert Goal Number of Miles: <input type="number" class="number_box" min="1" max="10000000" bind:value={goalDistance} />
          </label>
          {/if}
          {#if workoutGoalType === "duration"}
            <br>
            <br>
            <label class="component_subheader">
              Insert Goal Number of Minutes: <input type="number" class="number_box" min="1" max="10000000" bind:value={goalDuration} />
            </label>
          {/if}
        {/if}
      
      <!-- Setup for display of goals -->
      {:else}
        <!-- Display step goal -->
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

        <!-- Display workout distance goal -->
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

        <!-- Display workout duration goal -->
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

        <!-- Display water goal -->
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
    </div>
    
    <!-- Definition of right side of component for buttons -->
    <div class="goalTrackerRight">
      <!-- Setup for when goal is being added -->
      {#if isAddGoal}
        <button class="component_button_top" on:click={()=>toggleAddGoal()}>Cancel</button>
        <button class="component_button" on:click={()=>addGoal()}> Submit Goal </button>
      
      <!-- Setup for display of goals -->
      {:else}
        <button class="component_button_top" on:click={()=>toggleAddGoal()}>Add Goal</button>
        <button class="component_button" on:click={()=>refreshGoals()}>Refresh Goals</button>
      {/if}
    </div>
  </div>
</goalTracker>

<style>
  /*goalTracker component style defintion**/
  goalTracker {
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

  /*Progress bar style defintion**/
  .progress_bar {
      width: 100%;
      background-color:  rgb(211, 217, 222);
      height: 30px;
      border-radius: 5px;
      margin-top: 10px;
  }

  /* Internal fill of progress bar style defintion**/
  .progress {
    background-color: rgb(52, 76, 98);
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease;
  }

  /* Text within progress bar style defintion**/
  .progress_text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-size: 20px;
    font-weight: 400px;
    padding-top: 2px;
    padding-left: 5px;
  }

  /*Component content style defintion**/
  .goalTrackerContent {
    display:flex;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
  }

  /*Left side of goalTracker component style defintion**/
  .goalTrackerLeft {
    overflow: auto;
    width: 100%;
    scrollbar-width: thin;
  }

  /*Right side of goalTracker component style defintion**/
  .goalTrackerRight {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>