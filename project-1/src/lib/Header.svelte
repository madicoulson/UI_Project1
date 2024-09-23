<script>
  import {dataPoolLength, dateDifference, daysSinceStart} from './script'
  import { onMount } from "svelte";

  // Variables to hold current date and time.
  let currentDateTime = new Date().toLocaleString();

  // Reactive variables to hold writable export variable data.
  $: reactiveLength = $dataPoolLength;
  $: reactiveDays = $dateDifference;

  // Function to run daysSinceStart to update day count on mount of the page.
  onMount(()=> {
    daysSinceStart();
  })
</script>
  
<header>Madi's Fitness Journal
  <p class="dateTime"> {reactiveDays} days since start | {reactiveLength} days active | {currentDateTime}</p>
</header>

<style>
  /*header component style defintion**/
  header {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: rgb(52, 76, 98);
    font-size: 50px;
    font-weight: 700;
    height: fit-content;
    padding: 10px;
    position: relative;
  }

  /*Date and Time display style defintion**/
  .dateTime {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: rgb(52, 76, 98);
    font-size: 25px;
    font-weight: 1000;
    height: fit-content;
    padding: 10px;
    margin-bottom: 0px;
    letter-spacing: 1.5px;
    position:absolute;
    bottom: 10px;
    right: 10px;
  }
</style>