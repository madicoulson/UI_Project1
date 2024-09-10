<script>
   import waterLogo from './svg/water.svg'
   import walkingLogo from './svg/walking.svg'

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

  function toggleWorkout(workout) {
    if (workout === "run") {
      isRun = true;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
    }
    if (workout === "yoga") {
      isRun = false;
      isYoga = true;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
    }
    if (workout === "weights") {
      isRun = false;
      isYoga = false;
      isWeightLift = true;
      isBike = false;
      isSwim = false;
      isOther = false;
    }
    if (workout === "bike") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = true;
      isSwim = false;
      isOther = false;
    }
    if (workout === "swim") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = true;
      isOther = false;
    }
    if (workout === "other") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = true;
    }
  }
</script>

<main>
  <h1>Fitness Journal</h1>
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
          Distance in Miles: <input type="number" class="number_box" bind:value={workoutDistance}>
        </label>
      </div>
      {/if}
      {#if isWeightLift}
      <div class=dropdown_spacing>
        <label class="component_text">
          Exercise: <input type="text">
          <br>
          Sets: <input type="number" class="number_box" bind:value={numSets} min="0" max="100" />
          <br>
          Weight (lbs): <input type="number" class="number_box" bind:value={weightVal} min="0" max="1000" />
        </label>
        <br>
        <button class="general_button">Submit</button>
      </div>
      {/if}
      <p class="component_subheader"> Duration in Minutes </p>
      <input type="number" class="number_box" bind:value={workoutDuration} min="0" max="180" />
	    <input type="range" bind:value={workoutDuration} min="0" max="180" />
      <br>
      <button class="component_button">Submit Workout</button>
    </div>

    <div class="component">
      <p class="component_header"> Water Log </p>
      <img src={waterLogo} alt="Water Bottle">
      <br>
      <label class="center component_subheader">
        Input Water (mL): <input type="number" class="number_box" bind:value={waterAmount} min="0" max="10000" />
        <input type="range" bind:value={waterAmount} min="0" max="10000" />
      </label>
    </div>

    <div class="component">
      <p class="component_header"> Step Counter </p>
      <img src={walkingLogo} alt="Walking">
      <br>
      <label class="center component_subheader">
        Input Steps: <input type="number" class="number_box" bind:value={stepAmount} min="0" max="10000" />
        <input type="range" bind:value={stepAmount} min="0" max="40000" />
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
