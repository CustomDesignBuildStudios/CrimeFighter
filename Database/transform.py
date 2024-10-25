import csv

columnsToRemove = ['PHONE', 'PRODUCTCODE','MSRP','STATUS']
renameHeaders = {'DAYS_SINCE_LASTORDER': 'DAYSSINCELASTORDER'}

def formatDate(str):
    #format date correctly
    return f"TO_DATE('{str}', 'DD/MM/YYYY')"



def escapeCharacters(value):
    # Escape single quotes by doubling them
    value = value.replace("'", "''")
    
    # Escape backslashes by doubling them
    value = value.replace("\\", "\\\\")
    
    # Escape double quotes if needed (optional, not common in INSERT values)
    value = value.replace('"', '\\"')
    
    # Handle ampersands by replacing them with the char code
    value = value.replace("&", '\' || chr(38) || \'')
    
    # Replace newline characters
    value = value.replace("\n", "\\n")
    value = value.replace("\t", "\\t")
    
    return value



with open('Auto Sales data.csv', mode='r', newline='', encoding='utf-8') as csvfile, open('ToyCarOrdersAndSales Insert Commands.sql', mode='w', encoding='utf-8') as sqlfile:
    csvreader = csv.reader(csvfile)
    #get header line
    headers = next(csvreader)
    filteredHeaders = []
    indexesToRemove = []


    # Remove columns from header
    for i, header in enumerate(headers):
        if header not in columnsToRemove:
            filteredHeaders.append(header)
        else:
            indexesToRemove.append(i)

    #rename certain columns
    for i in range(len(filteredHeaders)):
        if filteredHeaders[i] in renameHeaders:
            filteredHeaders[i] = renameHeaders[filteredHeaders[i]]



    # Loop through each row and write sql to file
    for row in csvreader:

        #Remove columns in row   
        filteredRow = []     
        for i, value in enumerate(row):
            if i not in indexesToRemove:
                filteredRow.append(value.strip())


        values = []
        #loop through each value in the row
        for header, value in zip(filteredHeaders, filteredRow):
            #format date correctly
            if "ORDERDATE" in header:
                value = formatDate(value)
                values.append(value)
            else:            
                #If the value is numeric don't wrap in quotes
                if value.replace('.', '', 1).isdigit(): 
                    values.append(value)
                else:
                    # Escape single quotes
                    value = escapeCharacters(value)
                    values.append(f"'{value}'")
        
        #Create insert sql string
        sql = f"INSERT INTO CF_Crime VALUES ({', '.join(values)});\n"
        
        #Write sql insert string to new file
        sqlfile.write(sql)

