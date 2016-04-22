import json

# output
output = []

# load data into arrays
import csv
with open('data_excel.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    for row in reader:
    	output.append({"country": row[0], "data": row[1]})

# write result into new file
output_end = {"points": output}
print json.dumps(output_end, indent=4);
