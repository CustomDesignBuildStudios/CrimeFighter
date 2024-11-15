import csv

# This replaces as single quotes with 2 single quotes
# single quotes arent good in oracle 
def turnSingleToDoubleQutoes(value):
    return value.replace("'", "''")

# The date format should be dd/mm/yyyy
def formatDate(date):
    # Split date into day, month, and year
    partsSpace = date.split(' ')

    parts = partsSpace[0].split('/')



    return f"TO_DATE('{parts[1]}/{parts[0]}/{parts[2]}', 'dd/mm/yyyy')"

def formatDateTime(date, time):
    # Split the date part into day, month, and year
    parts = date.split('/')
    day, month, year_time = parts[1], parts[0], parts[2].split(' ')
    
    year = year_time[0]
    # Convert the 24-hour time (e.g., '2130') into HH:MI:SS format
    formatted_time = f"{time[:2]}:{time[2:]}:00"
    
    # Return a TO_TIMESTAMP SQL expression that combines date and 24-hour time
    return f"TO_TIMESTAMP('{day}/{month}/{year} {formatted_time}', 'dd/mm/yyyy hh24:mi:ss')"



# Read the CSV file 
inputfile = 'Crime_Data_from_2020_to_Present.csv'
outputfile = 'datafile.dat'


premiseTypes = {}
crimeTypes = {}
weaponTypes = {}


# Open CSV file and SQL file for writing
with open(inputfile, mode='r', newline='', encoding='utf-8') as csvfile, open(outputfile, mode='w', encoding='utf-8') as sqlfile:
    
    '''The DictReader is a function that reads the header, and seperates the values
        in the csv file for each column into that attributes name. And the attribute name 
        can be used as the key in the sql_command line below'''
    
    csvreader = csv.DictReader(csvfile)
    

# ,LOCATION,Cross Street,LAT,LON

    # sqlfile.write("SET DEFINE OFF;INSERT ALL")

    # Loop through each row of ToyCarOrdersAndSales.csv
    for row in csvreader:
        dateTimeOcc = formatDateTime(row['DATE OCC'] , row['TIME OCC'])


        crimeTypes[row['Crm Cd']] = row['Crm Cd Desc']
        premiseTypes[row['Premis Cd']] = row['Premis Desc']
        weaponTypes[row['Weapon Used Cd']] = row['Weapon Desc']

        # This uses the DictReader function for each attribute. Makes it 100x easier.
        insert_command = (
                f"'',{row['DR_NO']}, {formatDate(row['Date Rptd'])}, {dateTimeOcc}, '{row['AREA']}', "
                f"'{turnSingleToDoubleQutoes(row['AREA NAME'])}', '{turnSingleToDoubleQutoes(row['Rpt Dist No'])}',{row['Part 1-2']}, "
                f"'{turnSingleToDoubleQutoes(row['Crm Cd'])}', '{turnSingleToDoubleQutoes(row['Crm Cd Desc'])}','{turnSingleToDoubleQutoes(row['Mocodes'])}', "
                f"{int(row['Vict Age'])}, '{turnSingleToDoubleQutoes(row['Vict Sex'])}','{turnSingleToDoubleQutoes(row['Vict Descent'])}', "
                f"{row['Premis Cd']}, '{turnSingleToDoubleQutoes(row['Premis Desc'])}','{turnSingleToDoubleQutoes(row['Weapon Used Cd'])}', "
                f"'{turnSingleToDoubleQutoes(row['Weapon Desc'])}', '{turnSingleToDoubleQutoes(row['Status'])}','{turnSingleToDoubleQutoes(row['Status Desc'])}', "
                f"'{turnSingleToDoubleQutoes(row['Crm Cd 1'])}', '{turnSingleToDoubleQutoes(row['Crm Cd 2'])}','{turnSingleToDoubleQutoes(row['Crm Cd 3'])}', "
                f"'{turnSingleToDoubleQutoes(row['Crm Cd 4'])}', '{turnSingleToDoubleQutoes(" ".join(row['LOCATION'].split()))}','{turnSingleToDoubleQutoes(row['Cross Street'])}', "
                f"{row['LAT']}, {row['LON']}\n"
            )
        # Write the SQL command to the output file
        sqlfile.write(insert_command)

    # for key, value in premiseTypes.items():
    #     if(value == '' or key == ''): continue
    #     insert_command = (
    #             f"INSERT INTO cf_premistype VALUES (cf_premisTypeInsert.NEXTVAL,"
    #             f"{turnSingleToDoubleQutoes(key)}, '{turnSingleToDoubleQutoes(value)}');\n"
    #         )
    #     sqlfile.write(insert_command)




    # for key, value in crimeTypes.items():
    #     if(value == '' or key == ''): continue
    #     insert_command = (
    #             f"INSERT INTO cf_crimetype VALUES (cf_crimeTypeInsert.NEXTVAL,"
    #             f"{turnSingleToDoubleQutoes(key)}, '{turnSingleToDoubleQutoes(value)}');\n"
    #         )
    #     sqlfile.write(insert_command)



    # for key, value in weaponTypes.items():
    #     if(value == '' or key == ''): continue
    #     insert_command = (
    #             f"INSERT INTO cf_weaponType VALUES (cf_weaponTypeInsert.NEXTVAL,"
    #             f"{turnSingleToDoubleQutoes(key)}, '{turnSingleToDoubleQutoes(value)}');\n"
    #         )
    #     sqlfile.write(insert_command)

    # sqlfile.write("SELECT * FROM dual;COMMIT;")
