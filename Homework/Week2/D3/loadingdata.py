import json

# output
output = []

# load data into arrays
import csv
with open('data_neerslag.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    	output.append({"date": row[0], "residue": row[1]})

# write result into new file
output_end = {"points": output}
outputfile = open('dataneerslag.json', 'w');
json.dump(output_end, outputfile);
