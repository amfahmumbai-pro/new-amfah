import os
import glob
from PIL import Image

def analyze_logos():
    logo_dir = r"c:\Users\Lenovo\Live Project\amfah_project\public\clientels"
    files = sorted(glob.glob(os.path.join(logo_dir, "*.*")))
    
    # We want to print filenames and check their sizes and see if there are any specific files we missed
    print("Files in public/clientels:")
    for f in sorted(os.listdir(logo_dir)):
        if f.endswith('.png') or f.endswith('.webp'):
            print(f" - {f}")

if __name__ == "__main__":
    analyze_logos()
