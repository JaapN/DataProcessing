import json

# output
output = []

# load data into arrays
import csv
with open('HPIcountries.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    	output.append({"HPIrank": row[0], "country": row[1], "subregion": row[2], "lifeExpectancy": row[3], "WellBeing": row[4],
         "HappyLifeYears": row[5], "Footprint_gha_capita": row[6], "HPI": row[7], "Population": row[8], "GDP_capita": row[9],"governanceRank": row[10]})

# write result into new file
output_end = {"data": output}
outputfile = open('data_linkedViews.json', 'w');
json.dump(output_end, outputfile);
