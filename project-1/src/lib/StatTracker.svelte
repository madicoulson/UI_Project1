<script lang="js">
    import {dataPool} from './script'
    import { Chart } from 'chart.js/auto';
    import { onMount } from "svelte";

    //Binded global variables for charts
    let durationChart;
    let stepChart;
    let durationChartCreation;
    let stepChartCreation;

    // Function to render and display graphs on mount of the page.
    onMount(()=> {
        renderGraphs();
    })

    // Function to create and render graphs.
    function renderGraphs() {
        // Map the date, duration, and steps
        let dateLabels = dataPool.map(entry => entry.date);
        const durations = dataPool.map(entry => entry.workout.duration);
        const steps = dataPool.map(entry=> entry.steps);

        // Define data for the workout duration graph
        const durationData = {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Workout Durations',
                    data: durations,
                    backgroundColor: ['#00b0e8'],
                    fill: false
                }
            ]
        };

        // Define data for the steps graph
        const dataSteps = {
            labels: dateLabels,
            datasets: [
                {
                    label: 'Step Count',
                    data: steps,
                    backgroundColor: ['#00b0e8'],
                    fill: false
                }
            ]
        };

        // Destroy existing charts if they already exist
        if (durationChartCreation) durationChartCreation.destroy();
        if (stepChartCreation) stepChartCreation.destroy();

        // Define the durationChart context
        const durationContext = durationChart.getContext('2d');

        // Define the chart using the durationData and context
        durationChartCreation = new Chart(durationContext, {
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
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'Verdana',
                                size: 12,      
                                style: 'normal',
                                weight: 'bold',  
                            }
                        }

                    },

                }
            }
        });

        // Define the stepChart context
        const stepContext = stepChart.getContext('2d');

        // Define the chart using the stepData and context
        stepChartCreation = new Chart(stepContext, {
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
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'Verdana',
                                size: 12,      
                                style: 'normal',
                                weight: 'bold',  
                            }
                        }

                    },

                }
            }
        });
    }
</script>


<statTracker>
    <p class="component_header"> Tracking Stats </p>

    <!-- Button definition to refresh graphs upon data change. -->
    <button class="component_button_top_stats" on:click={()=>renderGraphs()}>Refresh Graphs</button>
    <br> <br> <br>
    
    <!-- Canvas binding for duration chart. -->
    <canvas bind:this={durationChart}></canvas>
    <br> <br>

    <!-- Canvas binding for step chart. -->
    <canvas bind:this={stepChart}></canvas>
</statTracker>

<style>
    /*statTracker component style defintion**/
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

    /*Absolute position button style defintion**/
    .component_button_top_stats {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 14px;
        padding: 6px 12px 6px 12px;
        margin-top: 10px;
        background-color:rgb(52, 76, 98);
        color: white;
        border-radius: 16px;
        width:fit-content;
        top: 57px;
        right: 10px;
        position: absolute;
    }

    /*Canvas style defintion**/
    canvas {
        width: 100%;
        height: 100%;
        background-color:  rgb(211, 217, 222);
    }
</style>