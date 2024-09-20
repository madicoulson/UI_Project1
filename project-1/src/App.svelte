<script>
  // https://svelte.dev/examples/area-chart
  // https://dev.to/wesleymutwiri/create-beautiful-charts-with-svelte-and-chart-js-512n
  // https://www.chartjs.org/docs/latest/samples/other-charts/pie.html
  // https://www.w3schools.com/ai/ai_chartjs.asp
  // https://www.educative.io/answers/how-to-create-charts-with-svelte-and-chartjs

  import Header from './lib/Header.svelte'
  import Row from './lib/Row.svelte';
  import Subheader from './lib/Subheader.svelte';
  import WorkoutLog from './lib/WorkoutLog.svelte';
  import WaterLog from './lib/WaterLog.svelte';
  import StepLog from './lib/StepLog.svelte';
  import GoalTracker from './lib/GoalTracker.svelte';
  import StatTracker from './lib/StatTracker.svelte';
  import WorkoutTracker from './lib/WorkoutTracker.svelte';

</script>

<main>
  <Header></Header>

  <Subheader subheader="DAILY TRACKING"></Subheader>
  

  <Row>
    <WorkoutLog></WorkoutLog>
    <WaterLog></WaterLog>
    <StepLog></StepLog>
  </Row>  

  <Subheader subheader="PROGRESS TRACKING"></Subheader>

  <Row>
    <GoalTracker></GoalTracker>
    <StatTracker></StatTracker>
    <WorkoutTracker></WorkoutTracker>
  </Row> 
</main>

<style>
</style>
