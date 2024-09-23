<script lang="js">
  import {appendCurrentDay, currentDay} from './script'
    
  // Binded global variables for workout entry
  let workoutDuration = 0;
  let isRun = false;
  let isYoga = false;
  let isWeightLift = false;
  let isBike = false;
  let isSwim = false;
  let isOther = false;
  let isHike = false;
  let isSki = false;
  let isWalk = false;
  let isSports = false;
  let workoutDistance = 0;
  let exerciseName = "";
  let numSets = 0;
  let weightVal = 0;
  let isWorkoutSubmitted = false;
  let isCustomizeWorkouts = false;
  
  let isRunChecked = true;
  let isYogaChecked = true;
  let isWeightLiftChecked = true;
  let isBikeChecked = true;
  let isSwimChecked = true;
  let isOtherChecked = true;
  let isHikingChecked = false;
  let isSkiingChecked = false;
  let isWalkingChecked = false;
  let isSportsChecked = false;

  let isRunCheckedTemp = true;
  let isYogaCheckedTemp = true;
  let isWeightLiftCheckedTemp = true;
  let isBikeCheckedTemp = true;
  let isSwimCheckedTemp = true;
  let isOtherCheckedTemp = true;
  let isHikingCheckedTemp = false;
  let isSkiingCheckedTemp = false;
  let isWalkingCheckedTemp = false;
  let isSportsCheckedTemp = false;

  // Function to toggle between workouts to ensure only one workout is selected at a time and append the workout type.
  function toggleWorkout(workout) {
    if (workout === "run") {
      isRun = true;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Running");
    }
    if (workout === "yoga") {
      isRun = false;
      isYoga = true;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Yoga / Pilates");
    }
    if (workout === "weights") {
      isRun = false;
      isYoga = false;
      isWeightLift = true;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Weight Lifting");
    }
    if (workout === "bike") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = true;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Biking");
    }
    if (workout === "swim") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = true;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Swimming");
    }
    if (workout === "other") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = true;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Other");
    }
    if (workout === "hike") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = true;
      isSki = false;
      isWalk = false;
      isSports = false;
      addWorkoutType("Hiking");
    }
    if (workout === "ski") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = true;
      isWalk = false;
      isSports = false;
      addWorkoutType("Skiing");
    }
    if (workout === "walk") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = true;
      isSports = false;
      addWorkoutType("Walking");
    }
    if (workout === "sports") {
      isRun = false;
      isYoga = false;
      isWeightLift = false;
      isBike = false;
      isSwim = false;
      isOther = false;
      isHike = false;
      isSki = false;
      isWalk = false;
      isSports = true;
      addWorkoutType("Sports");
    }
  }

  // Function to append the input workout type value to the currentDay object.
  function addWorkoutType (inputType) {
    currentDay.workout.type = inputType;
  }

  // Function to append the input duration value to the currentDay object.
  function addWorkoutDuration (inputDuration) {
    currentDay.workout.duration = parseInt(inputDuration);
  }

  // Function to append the input distance value to the currentDay object.
  function addWorkoutDistance (inputDistance) {
    currentDay.workout.distance = parseInt(inputDistance);
  }

  // Function to append the input lift data to the currentDay object.
  function addLiftData () {
    // Append the values to the lift object.
    let lift = {};
    lift.exercise = exerciseName;
    lift.sets = numSets;
    lift.weight = weightVal;

    // Set the exisitingLiftDate to either the already updated currentDay.workout.lift, or
    // an empty array if not initialized. Push the lift data onto exisitingLiftData. 
    const existingLiftData = currentDay.workout.lift || [];
    existingLiftData.push(lift);

    // Set currentDay.workout.lift to the newly appended existingLiftData
    currentDay.workout.lift = existingLiftData;

    // Reset the values.
    exerciseName = "";
    numSets = 0;
    weightVal = 0;
  }

  // Function to append the input workout data to the dataPool array.
  function submitWorkoutData () {
    // Ensure at minimum to type and duration fields are set.
    if (currentDay.workout.type === "" || currentDay.workout.duration === null || currentDay.workout.duration === 0) {
      alert("Please insert a workout type and duration before submitting.")
    }
    // Call appendCurrentDay to add the data to the array.
    else {
      appendCurrentDay(); 
      isWorkoutSubmitted = true;
    } 
  }

  // Function to toggle whether a workout has been added.
  function toggleSubmitWorkout () {
    isWorkoutSubmitted = false;
  }

  // Function to toggle whether the workouts are being customized. 
  function toggleIsCustomizeWorkout () {
    if (isCustomizeWorkouts){isCustomizeWorkouts=false;}
    else {isCustomizeWorkouts=true;}
  }

  // Function to set the checked variables to their temp values if customizations are set.
  function setCustomizations (){
    isWeightLiftChecked = isWeightLiftCheckedTemp;
    isRunChecked = isRunCheckedTemp;
    isYogaChecked = isYogaCheckedTemp;
    isBikeChecked = isBikeCheckedTemp;
    isSwimChecked = isSwimCheckedTemp;
    isOtherChecked = isOtherCheckedTemp;
    isHikingChecked = isHikingCheckedTemp;
    isSkiingChecked = isSkiingCheckedTemp;
    isWalkingChecked = isWalkingCheckedTemp;
    isSportsChecked = isSportsCheckedTemp;
  }
</script>

<workoutLog>
  <p class="component_header"> Workout Log </p>
  <div class="workoutLogContent">
    <!-- Definition of top part of component -->
    <div class="workoutLogTopSection">
        <!-- Setup for when workout is being input -->
        {#if isWorkoutSubmitted === false && isCustomizeWorkouts === false}
          <p class="component_subheader"> Workout Type </p>
          <button class="component_button_top_workout" on:click={()=>toggleIsCustomizeWorkout()}>Customize Workouts</button>

          <!-- Type input -->
          <label class="component_text checkbox_spacing">
              {#if isWeightLiftChecked}
                <input type="checkbox" bind:checked={isWeightLift} on:click={()=>toggleWorkout("weights")}> Weight Lifting
              {/if}
              {#if isRunChecked}
                <input type="checkbox" bind:checked={isRun} on:click={()=>toggleWorkout("run")}> Running
              {/if}
              {#if isYogaChecked}
                <input type="checkbox" bind:checked={isYoga} on:click={()=>toggleWorkout("yoga")}> Yoga / Pilates
              {/if}
              {#if isBikeChecked}
                <input type="checkbox" bind:checked={isBike} on:click={()=>toggleWorkout("bike")}> Biking
              {/if}
              {#if isSwimChecked}
                <input type="checkbox" bind:checked={isSwim} on:click={()=>toggleWorkout("swim")}> Swimming
              {/if}  
              {#if isHikingChecked}
                <input type="checkbox" bind:checked={isHike} on:click={()=>toggleWorkout("hike")}> Hiking
              {/if}  
              {#if isSkiingChecked}
                <input type="checkbox" bind:checked={isSki} on:click={()=>toggleWorkout("ski")}> Skiing
              {/if}  
              {#if isWalkingChecked}
                <input type="checkbox" bind:checked={isWalk} on:click={()=>toggleWorkout("walk")}> Walking
              {/if} 
              {#if isSportsChecked}
                <input type="checkbox" bind:checked={isSports} on:click={()=>toggleWorkout("sports")}> Sports
              {/if}
              {#if isOtherChecked}
                <input type="checkbox" bind:checked={isOther} on:click={()=>toggleWorkout("other")}> Other
              {/if}
          </label>
          
          <!-- If the type should have a distance, drop down distance input. -->
          {#if isRun || isSwim || isBike || isHike || isWalk}
            <div class="dropdown_spacing">
                <label class="component_subheader">
                    Distance in Miles: <input type="number" class="number_box" min="0" max="1000" bind:value={workoutDistance} on:change={()=>addWorkoutDistance(workoutDistance)}>
                </label>
            </div>
          {/if}

          <!-- If the type is weight lifting, drop down lift input. -->
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
                <button class="component_button_general" on:click={()=>addLiftData()}>Add</button>
            </div>
          {/if}

          <!-- Duration input -->
          <p class="component_subheader"> Duration in Minutes: </p>
          <input type="number" class="number_box" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)} />
              <input type="range" bind:value={workoutDuration} min="0" max="180" on:change={()=>addWorkoutDuration(workoutDuration)}/>
          <br> 
            
        <!-- Setup for when workout is being input -->
        {:else if isWorkoutSubmitted === false && isCustomizeWorkouts === true}
          <button class="component_button_top_workout" on:click={()=>toggleIsCustomizeWorkout()}>Cancel</button>
          <p class="component_subheader"> Edit Workout Types </p>
          <p class="component_text"> Check the workout types you want to include: </p>
          <label class="component_text checkbox_spacing">
              <input type="checkbox" bind:checked={isWeightLiftCheckedTemp}> Weight Lifting
              <input type="checkbox" bind:checked={isRunCheckedTemp}> Running
              <input type="checkbox" bind:checked={isYogaCheckedTemp}> Yoga / Pilates
              <input type="checkbox" bind:checked={isBikeCheckedTemp}> Biking
              <input type="checkbox" bind:checked={isSwimCheckedTemp}> Swimming    
              <input type="checkbox" bind:checked={isHikingCheckedTemp}> Hiking    
              <input type="checkbox" bind:checked={isSkiingCheckedTemp}> Skiing 
              <input type="checkbox" bind:checked={isWalkingCheckedTemp}> Walking
              <input type="checkbox" bind:checked={isSportsCheckedTemp}> Sports   
              <input type="checkbox" bind:checked={isOtherCheckedTemp}> Other    
          </label>

        <!-- Setup for when workout is submitted -->
        {:else}
          <p class="component_subheader"> Workout Submitted! To re-enter or change your workout, press re-enter workout. This will remove your previous submission. </p>
          <br>
          <p class="component_subheader"> Workout Summary: </p>
          <p class="component_text"> Workout Type: {currentDay.workout.type} </p>
          <p class="component_text"> Duration: {currentDay.workout.duration} minutes </p>
          {#if isRun || isSwim || isBike || isHike || isWalk}
              <p class="component_text"> Distance: {currentDay.workout.distance} miles </p>
          {/if}
          {#if isWeightLift}
              <p class="component_text"> Lift Data: {JSON.stringify(currentDay.workout.lift)} </p>
          {/if}
        {/if}        
    </div>
  </div>

  <!-- Button settings along bottom of component. -->
  {#if isWorkoutSubmitted === false && isCustomizeWorkouts === false}
      <button class="component_button_workout" on:click={()=>submitWorkoutData()}>Submit Workout</button>
  {:else if isWorkoutSubmitted === false && isCustomizeWorkouts === true}
      <button class="component_button_workout" on:click={()=>setCustomizations()} on:click={()=>toggleIsCustomizeWorkout()}>Submit Customization</button>
  {:else}
      <button class="component_button_workout" on:click={()=>toggleSubmitWorkout()}>Re-enter Workout</button>
  {/if}
</workoutLog>

<style>
  /*workoutLog component style defintion**/
  workoutLog {
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
      position: relative;
  }

  /*Component content style defintion**/
  .workoutLogContent {
    display: flex;
    flex-direction: column; /* Stack sections vertically */
    width: 100%; /* Full width */
    justify-content: space-between;
    overflow: hidden;
    position: relative;
  }

  /*Top section of workoutLog component style defintion**/
  .workoutLogTopSection {
    margin-bottom: 10px;
    position:relative;
    overflow: auto;
    scrollbar-width:thin;
  }

  /*Component top button style defintion**/
  .component_button_top_workout {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    padding: 6px 12px 6px 12px;
    margin-top: 10px;
    background-color:rgb(52, 76, 98);
    color: white;
    border-radius: 16px;
    width:fit-content;
    top: 10px;
    right: 10px;
    position: absolute;
  }

  /*Component general button style defintion**/
  .component_button_general {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    padding: 3px 6px 3px 6px;
    margin-top: 10px;
    background-color:rgb(52, 76, 98);
    color: white;
    border-radius: 16px;
    width:fit-content;
  }

  /*Drop down style defintion**/
  .dropdown_spacing {
    margin-top: 20px;
    display:block;
    background-color: rgb(211, 217, 222);
    padding: 10px;
    width:fit-content;
  }

  /*Checkbox style defintion**/
  .checkbox_spacing input[type="checkbox"] {
    margin-left: 10px; /* Adjust the spacing as needed */
  }

  /*Component button style defintion**/
  .component_button_workout {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    padding: 12px 24px 12px 24px;
    margin-top: 10px;
    background-color:rgb(52, 76, 98);
    color: white;
    border-radius: 16px;
    width:fit-content;
    right: 10px;
    bottom: 10px;
    white-space: nowrap;
    bottom: 10px;
    right: 10px;
    position: absolute;
  }
</style>