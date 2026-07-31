import os
import re

def check_missing():
    component_path = r"c:\Users\Lenovo\Live Project\amfah_project\src\components\sections\ClienteleShowcase.js"
    logo_dir = r"c:\Users\Lenovo\Live Project\amfah_project\public\clientels"
    
    # Read component file
    with open(component_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find all "/clientels/..." matches
    mapped_logos = set(re.findall(r'/clientels/[\w\.\-]+', content))
    # Normalize paths to just filename
    mapped_filenames = {os.path.basename(p) for p in mapped_logos}
    
    # List all files in directory
    all_files = {f for f in os.listdir(logo_dir) if f.lower().endswith(('.png', '.webp', '.jpg', '.jpeg'))}
    
    missing = all_files - mapped_filenames
    
    print(f"Total logos in folder: {len(all_files)}")
    print(f"Mapped logos in ClienteleShowcase.js: {len(mapped_filenames)}")
    print(f"Missing logos ({len(missing)}):")
    for f in sorted(missing):
        print(f" - {f}")

if __name__ == "__main__":
    check_missing()
