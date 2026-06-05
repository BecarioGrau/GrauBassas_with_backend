import os, json

data_dir = r"c:\xampp\htdocs\Combinacion\frontend\public\data"
files = [f for f in os.listdir(data_dir) if f.endswith('.json') and f not in ('templates.json', 'navigation.json')]

for f in files:
    path = os.path.join(data_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
        except Exception:
            continue
    
    changed = False
    for item in data:
        if isinstance(item, dict) and 'tableConfig' in item:
            del item['tableConfig']
            changed = True
            
    if changed:
        with open(path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
            file.write('\n')
print("Successfully removed tableConfig from all JSON files.")
