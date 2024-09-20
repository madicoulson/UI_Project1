<script lang="js">
    import {appendCurrentDay, currentDay} from './script'
    import waterSVG from './water.svg'

    // Binded value within Water Log component
    let waterAmount = 0;
    let isWaterEntered = false;


    function toggleWaterEntered() {
        isWaterEntered = true;
    }

    function addWater (inputWater) {
        currentDay.water = parseInt(inputWater);
        appendCurrentDay();
    }

</script>


<waterLog>
    <p class="component_header"> Water Log </p>
    <br> <br>
    <img src={waterSVG} alt="Water Bottle">
    <br>
    <label class="center component_subheader">
      Input Water (mL): <input type="number" class="number_box_water_steps" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)}  on:change={()=>toggleWaterEntered()} />
      <input type="range" bind:value={waterAmount} min="0" max="10000" on:change={()=>addWater(waterAmount)} on:change={()=>toggleWaterEntered()} />
    </label>
    {#if (isWaterEntered)}
    <p class="component_text"> The amount of water logged for today is <strong>{waterAmount} mL</strong>. If you would like to change the amount, reenter the value. </p>
    {/if}
</waterLog>

<style>
waterLog {
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