<script>
    import {dataPoolLength} from './script'
    // Variable to hold current date and time.
    let currentDateTime = new Date().toLocaleString();
    $: reactiveLength = $dataPoolLength;
</script>
  
<header>Fitness Journal
    <p class="dateTime">{reactiveLength} days active | {currentDateTime}</p>
</header>

<style>
header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(52, 76, 98);
  font-size: 50px;
  font-weight: 700;
  height: fit-content;
  padding: 10px;
  position: relative;
}

.dateTime {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(52, 76, 98);
  font-size: 30px;
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