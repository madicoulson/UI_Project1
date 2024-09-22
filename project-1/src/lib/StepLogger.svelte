<script lang="js">
  import {appendCurrentDay, currentDay} from './script'
  import stepSVG from './walking.svg'

  // Binded global variables for steps
  let stepAmount = 0;
  let isStepsEntered = false;

  // Function to toggle whether a step amount has been added.
  function toggleStepsEntered() {
    isStepsEntered = true;
  }

  // Function to append the input step value to the currentDay object and dataPool array.
  function addSteps (inputSteps) {
    currentDay.steps = parseInt(inputSteps);
    appendCurrentDay();
  }
</script>

<stepLog>
  <p class="component_header"> Step Counter </p>
  <br> <br>

  <!-- Display of SVG image -->
  <img src={stepSVG} alt="Person Walking">
  <br>

  <!-- Input to enter step amount -->
  <label class="center component_subheader">
    Input Steps: <input type="number" class="number_box_water_steps" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
    <input type="range" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
  </label>

  <!-- If the step amount has been entered, display message alerting user. -->
  {#if (isStepsEntered)}
    <p class="component_text">The amount of steps logged for today is <strong>{stepAmount}</strong>.If you would like to change the amount, reenter the value. </p>
  {/if}
</stepLog>

<style>
  /*stepLog component style defintion**/
  stepLog {
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
</style>