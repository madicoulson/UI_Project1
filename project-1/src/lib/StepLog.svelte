<script lang="js">
    import {appendCurrentDay, currentDay} from './script'
    import stepSVG from './walking.svg'

    // Binded value within Step Counter component
    let stepAmount = 0;
    let isStepsEntered = false;

    function toggleStepsEntered() {
      isStepsEntered = true;
    }

    function addSteps (inputSteps) {
      currentDay.steps = parseInt(inputSteps);
      appendCurrentDay();
    }

</script>

<stepLog>
    <p class="component_header"> Step Counter </p>
    <img src={stepSVG} alt="Person Walking">
    <br>
    <label class="center component_subheader">
      Input Steps: <input type="number" class="number_box_water_steps" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
      <input type="range" bind:value={stepAmount} min="0" max="40000" on:change={()=>addSteps(stepAmount)} on:change={()=>toggleStepsEntered()} />
    </label>
    {#if (isStepsEntered)}
    <p class="component_text">The amount of steps logged for today is <strong>{stepAmount}</strong>.If you would like to change the amount, reenter the value. </p>
    {/if}
</stepLog>

<style>
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