import json

# output
output = []

# load data into arrays
import csv
with open('Data_neerslag_maand.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    	output.append({"date": row[0], "residue": row[1]})

# write result into new file
output_end = {"points": output}
outputfile = open('dataneerslag_new.json', 'w');
json.dump(output_end, outputfile);
