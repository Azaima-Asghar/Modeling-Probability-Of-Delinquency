# Final-Project

# Machine Learning

This branch contains [MachineLearning.ipynb](https://github.com/Azaima-Asghar/Modeling-probability-of-default/blob/colinwallaceflukenetworks/MachineLearning.ipynb), a Python Notebook. This is a mockup for the machine learning model segment of our group's pipeline. This file imports the Fannie Mae Acquisition Data (currently reads from a local .csv file, but will be updated to import from our server).

Some rough filtering is done (e.g. dropping rows with any NA values). All columns identified as "object" datatypes are encoded, then merged with the non-object columns of the Acquisition data.

A "Foreclosure" boolean is randomly generated for each row. For our final presentation, this will instead be a boolean transformed from each loan's Performance data.

The data is split into the target array ("Foreclosure"), and the feature matrix. The data is further split into training and testing sets, before being scaled according to the training data. A logistic regression is modelled, but doesn't appear to fit correctly. The deep neural network model provides improved results.

The current model takes 139 variables of input, densely connected to a layer of 24 Tanh neurons, followed by another dense layer of 8 Tanh neurons. The final output neuron is a single sigmoid, predicting classification. This structure, and the hyperparameters used while fitting, are likely to change as we transform the input data and try to improve results. 

The results of this neural network during and after fitting are expected given the circumstances. The first epoch's accuracy is around 60%, but improves with iteration up to 94% after 100 epochs. This fit sounds promising, until testing using the validation data returns a 61% accuracy. However, this makes sense since the target array is randomly generated. There are no broad patterns to find, so the model "improves" by overfitting the training data.