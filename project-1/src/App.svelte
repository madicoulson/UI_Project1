<script>
  // https://svelte.dev/examples/area-chart
  // https://dev.to/wesleymutwiri/create-beautiful-charts-with-svelte-and-chart-js-512n
  // https://www.chartjs.org/docs/latest/samples/other-charts/pie.html
  // https://www.w3schools.com/ai/ai_chartjs.asp
  // https://www.educative.io/answers/how-to-create-charts-with-svelte-and-chartjs

  import Header from './lib/Header.svelte'
  import ImplementData from './lib/ImplementData.svelte';
  import Row from './lib/Row.svelte';
  import ProgressTracking from './lib/ProgressTracking.svelte';
  import Subheader from './lib/Subheader.svelte';

</script>

<main>
  <Header></Header>

  <Subheader subheader="DAILY TRACKING"></Subheader>
  

  <Row>
    <ImplementData></ImplementData>
  </Row>  

  <Subheader subheader="PROGRESS TRACKING"></Subheader>

  <Row>
   <ProgressTracking></ProgressTracking>
  </Row> 
</main>

<style>
</style>
