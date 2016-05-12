import json

# output
output = []

# load data into arrays
import csv
with open('data_d3line_Vlissingen.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    for row in reader:
    	output.append({"date": row[0], "windV": row[1], "temperature": row[2], "cloudiness": row[3]})

# write result into new file
output_end = {"data": output}
outputfile = open('data_d3line_Vlissingen.json', 'w');
json.dump(output_end, outputfile);
