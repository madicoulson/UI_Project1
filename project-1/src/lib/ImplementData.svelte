<script lang="js">
    import {appendCurrentDay, dataPool, currentDay} from './script'
    import waterSVG from './water.svg'
    import stepSVG from './walking.svg'
    //import {easyFunc} from './ProgressTracking.svelte'
    
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
    let isWorkoutSubmitted = false;

    // Binded value within Water Log component
    let waterAmount = 0;
    let isWaterEntered = false;

    // Binded value within Step Counter component
    let stepAmount = 0;
    let isStepsEntered = false;

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

  function toggleWaterEntered() {
    isWaterEntered = true;
  }

  function toggleStepsEntered() {
    isStepsEntered = true;
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

  function addLiftData () {
    let lift = {};
    lift.exercise = exerciseName;
    lift.sets = numSets;
    lift.weight = weightVal;

    // Set the exisitingLiftDate to either the already updated currentDay.workout.lift, or
    // an empty array if not initialized. Push the lift data onto exisitingLiftData. 
    const existingLiftData = currentDay.workout.lift || [];
    existingLiftData.push(lift);

    currentDay.workout.lift = existingLiftData;

    exerciseName = "";
    numSets = 0;
    weightVal = 0;
  }

  // Here want to add so it spits out a summary of your workout
  function submitWorkoutData () {
    if (currentDay.workout.type === "" || currentDay.workout.duration === null || currentDay.workout.duration === 0) {
      alert("Please insert a workout type and duration before submitting.")
    }
    else {
      appendCurrentDay(); 
      isWorkoutSubmitted = true;
    } 
  }

  function toggleSubmitWorkout () {
    isWorkoutSubmitted = false;
  }

  function addWater (inputWater) {
    currentDay.water = parseInt(inputWater);
    appendCurrentDay();
  }

  function addSteps (inputSteps) {
    currentDay.steps = parseInt(inputSteps);
    appendCurrentDay();
  }

</script>


<implementData>
    <p class="component_header"> Workout Log </p>
    {#if isWorkoutSubmitted === false}
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
        <p class="component_subheader"> Enter your lift, and press submit to add it. You can add as many lifts as you like. </p>
        <label class="component_text">
          Exercise: <input type="text" bind:value={exerciseName}>
          <br>
          Sets: <input type="number" class="number_box" bind:value={numSets} min="0" max="100" />
          <br>
          Weight (lbs): <input type="number" class="number_box" bind:value={weightVal} min="0" max="1000" />
        </label>
        <br>
        <button class="general_button" on:click={()=>addLiftData()}>Add</button>
      </div>
      {/if}
      <p class="component_subheader"> Duration in Minutes </p>
      <input type="number" class="number_box" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)} />
        <input type="range" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)}/>
      <br>
      <button class="component_button" on:click={()=>submitWorkoutData()}>Submit Workout</button>
    {:else}
      <p class="component_subheader"> Workout Submitted! To re-enter or change your workout, press re-enter workout. This will remove your previous submission. </p>
      <br>
      <p class="component_subheader"> Workout Summary: </p>
      <p class="component_text"> Workout Type: {currentDay.workout.type} </p>
      <p class="component_text"> Duration: {currentDay.workout.duration} minutes </p>
      {#if isRun || isSwim || isBike}
        <p class="component_text"> Distance: {currentDay.workout.distance} miles </p>
      {/if}
      {#if isWeightLift}
        <p class="component_text"> Lift Data: {JSON.stringify(currentDay.workout.lift)} </p>
      {/if}
      <button class="component_button" on:click={()=>toggleSubmitWorkout()}>Re-enter Workout</button>
    {/if}
</implementData>

<implementData>
    <p class="component_header"> Water Log </p>
    <img src={waterSVG} alt="Water Bottle">
    <br>
    <label class="center component_subheader">
      Input Water (mL): <input type="number" class="number_box" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)}  on:change={()=>toggleWaterEntered()} />
      <input type="range" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)} on:change={()=>toggleWaterEntered()} />
    </label>
    {#if (isWaterEntered)}
    <p class="component_text"> The amount of water logged for today is <strong>{waterAmount} mL</strong>. If you would like to change the amount, reenter the value. </p>
    {/if}
</implementData>

<implementData>
    <p class="component_header"> Step Counter </p>
    <img src={stepSVG} alt="Person Walking">
    <br>
    <label class="center component_subheader">
      Input Steps: <input type="number" class="number_box" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
      <input type="range" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
    </label>
    {#if (isStepsEntered)}
    <p class="component_text">The amount of steps logged for today is <strong>{stepAmount}</strong>.If you would like to change the amount, reenter the value. </p>
    {/if}
</implementData>

<style>
implementData {
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
.component_subheader {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(52, 76, 98);
  font-size: 20px;
  font-weight: 700;
  padding-top: 0px;
}
.component_header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(52, 76, 98);
  font-size: 30px;
  font-weight: 500;
  padding-top: 0px;
  margin-top: 0px;
  border-bottom: 2px solid rgb(52, 76, 98);
  padding-bottom: 10px;
}

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

.general_button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  padding: 6px 12px 6px 12px;
  margin-top: 10px;
  background-color:rgb(52, 76, 98);
  color: white;
  border-radius: 16px;
  width:fit-content;
}
</style>