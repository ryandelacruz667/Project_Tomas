import json
import csv
import re

# Read the CSV file
csv_data = {}
with open('layers/Joining Table.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Clean up the FAMILY-ID (remove quotes and whitespace)
        family_id = row['FAMILY-ID'].strip().strip('"')
        barangay = row[' BARANGAY'].strip()  # Note: there's a leading space in the CSV header
        
        # Store in a dictionary keyed by BARANGAY
        # If multiple FAMILY-IDs exist for same BARANGAY, we'll use the first one
        # You may need to adjust this logic based on your matching criteria
        if barangay not in csv_data:
            csv_data[barangay] = family_id

# Read the JS file
with open('layers/StoTomasHouseholdsjoined_layer_1.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON part (everything after the variable declaration)
match = re.search(r'var json_StoTomasHouseholdsjoined_layer_1 = ({.*});?\s*$', content, re.DOTALL)
if not match:
    print("Error: Could not find JSON data in the JS file")
    exit(1)

json_str = match.group(1)
geojson_data = json.loads(json_str)

# Update FAMILY-ID for each feature based on BARANGAY match
updated_count = 0
for feature in geojson_data['features']:
    props = feature['properties']
    barangay = props.get('BARANGAY', '').strip()
    
    if barangay in csv_data:
        old_family_id = props.get('FAMILY-ID', '')
        new_family_id = csv_data[barangay]
        props['FAMILY-ID'] = new_family_id
        updated_count += 1
        print(f"Updated feature fid={props.get('fid')}: BARANGAY={barangay}, FAMILY-ID: {old_family_id} -> {new_family_id}")
    else:
        print(f"Warning: No matching FAMILY-ID found for BARANGAY={barangay} (fid={props.get('fid')})")

# Write back to the JS file
new_content = 'var json_StoTomasHouseholdsjoined_layer_1 = ' + json.dumps(geojson_data, ensure_ascii=False) + ';'
with open('layers/StoTomasHouseholdsjoined_layer_1.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nTotal features updated: {updated_count}")
print(f"Total features in file: {len(geojson_data['features'])}")