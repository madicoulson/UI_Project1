<script lang="js">
    import {dataPool} from './script'
    import { Chart } from 'chart.js/auto';
    import { onMount } from "svelte";

    // Chart definitions for within Tracking Stats component
    let durationChart;
    let stepChart;
    let chart1, chart2;

    onMount(()=> {
        renderGraphs();
    })

    function renderGraphs() {
        // Prepare the labels (dates) and dataset (durations) for the chart
        let dateLabels = dataPool.map(entry => entry.date);
        const durations = dataPool.map(entry => entry.workout.duration);
        const steps = dataPool.map(entry=> entry.steps);

        const durationData = {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Workout Durations',
                    data: durations,
                    backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
                    fill: false
                }
            ]
        };

        const dataSteps = {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Step Count',
                    data: steps,
                    backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
                    fill: false
                }
            ]
        };

        // Destroy existing charts if they exist
        if (chart1) chart1.destroy();
        if (chart2) chart2.destroy();

        const ctx = durationChart.getContext('2d');
        // Initialize chart using default config set
        chart1 = new Chart(ctx, {
        type: 'line',
        data: durationData,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
            x: {
                title: {
                text: 'Date',
                display: true
                }
            },
            y : {
                title: {
                text: 'Duration in Minutes',
                display: true
                },
                beginAtZero:true
            }
            }
        }
        });
        const ctx2 = stepChart.getContext('2d');
        // Initialize chart using default config set
        chart2 = new Chart(ctx2, {
        type: 'line',
        data: dataSteps,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
            x: {
                title: {
                text: 'Date',
                display: true
                }
            },
            y : {
                title: {
                text: 'Step Count',
                display: true
                },
                beginAtZero:true
            }
            }
        }
        });
    }
</script>


<statTracker>
    <p class="component_header"> Tracking Stats </p>
    <button class="component_button_top" on:click={()=>renderGraphs()}>Refresh Graphs</button>
    <br> <br>
    <canvas bind:this={durationChart}></canvas>
    <br> <br>
    <canvas bind:this={stepChart}></canvas>
</statTracker>

<style>
statTracker {
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

canvas {
  width: 100%;
  height: 100%;
  background-color:  rgb(211, 217, 222);
}
</style>