# Plot.ly - Belly Button Biodiversity

1. Creating a new repository for this project called `plotly-challenge`. 

2. Cloning the new repository to computer.

3. Inside your local git repository, create a directory for the Plotly challenge. Using the folder name to correspond to the challenge: **Belly_Button_Diversity**.

4. This is a full stack app that includes html, js, css, python and sqlite files.

## Step 1 - Plotly.js

Using Plotly.js to build interactive charts for dashboard.

* Creating a PIE chart that uses data from your samples route (`/samples/<sample>`) to display the top 10 samples.

  * Using `sample_values` as the values for the PIE chart.

  * Using `otu_ids` as the labels for the pie chart.

  * Using `otu_labels` as the hovertext for the chart.


* Creating a Bubble Chart that uses data from  samples route (`/samples/<sample>`) to display each sample.

  * Using `otu_ids` for the x values.

  * Using `sample_values` for the y values.

  * Using `sample_values` for the marker size.

  * Using `otu_ids` for the marker colors.

  * Using `otu_labels` for the text values.

* Displaying the sample metadata from the route `/metadata/<sample>`

  * Displaying each key/value pair from the metadata JSON object somewhere on the page.

* Updating all of the plots any time that a new sample is selected.

## Step 2 - Heroku

Deploying Flask app to Heroku.

* Using the provided sqlite file for the database.

- - -

## Advanced Challenge 

* Adapting the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the Weekly Washing Frequency obtained from the `/metadata/<sample>`route.

* Modifing the example gauge code to account for values ranging from 0 - 9.

* Update the chart whenever a new sample is selected.

- - -

## Flask API

Using Flask API starter code to serve the data needed for plots.

* Testing routes by visiting each one in the browser.

- - -
