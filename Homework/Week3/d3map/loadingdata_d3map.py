import json

# output
output = []

# load data into arrays
import csv
with open('data_pop_density.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    for row in reader:
    	output.append({"country": row[0], "code": row[1], "popDensity": row[2]})

# write result into new file
output_end = {"points": output}
outputfile = open('data_population.json', 'w');
json.dump(output_end, outputfile);
