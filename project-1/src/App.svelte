<script>
  import Header from './lib/Header.svelte'
  import Row from './lib/Row.svelte';
  import Subheader from './lib/Subheader.svelte';
  import WorkoutLog from './lib/WorkoutLogger.svelte';
  import StepLog from './lib/StepLogger.svelte';
  import GoalTracker from './lib/GoalTracker.svelte';
  import StatTracker from './lib/StatTracker.svelte';
  import WorkoutTracker from './lib/WorkoutTracker.svelte';
  import WaterLog from './lib/WaterLogger.svelte';
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