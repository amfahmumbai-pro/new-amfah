import os
import glob
from PIL import Image, ImageDraw, ImageFont

def make_contact_sheet():
    logo_dir = r"c:\Users\Lenovo\Live Project\amfah_project\public\clientels"
    # Find all png and webp files
    files = sorted(glob.glob(os.path.join(logo_dir, "*.*")))
    files = [f for f in files if f.lower().endswith(('.png', '.webp', '.jpg', '.jpeg'))]
    
    print(f"Found {len(files)} logo files.")
    
    # Grid settings
    cols = 8
    rows = (len(files) + cols - 1) // cols
    cell_width = 180
    cell_height = 180
    padding = 10
    
    sheet_width = cols * cell_width
    sheet_height = rows * cell_height
    
    contact_sheet = Image.new("RGBA", (sheet_width, sheet_height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(contact_sheet)
    
    # Try to load a font, fall back to default
    try:
        font = ImageFont.load_default()
    except Exception:
        font = None
        
    for index, file_path in enumerate(files):
        try:
            img = Image.open(file_path).convert("RGBA")
            # Resize image to fit inside cell with padding
            max_w = cell_width - 2 * padding
            max_h = cell_height - 2 * padding - 20 # Leave room for label
            
            img.thumbnail((max_w, max_h))
            
            # Calculate grid position
            c = index % cols
            r = index // cols
            
            x = c * cell_width + (cell_width - img.width) // 2
            y = r * cell_height + (cell_height - 20 - img.height) // 2
            
            # Paste image (handle alpha transparency blend)
            contact_sheet.alpha_composite(img, (x, y))
            
            # Draw label
            filename = os.path.basename(file_path)
            label = filename.replace("-150x150", "") # Make name shorter for display
            
            # Draw name centered below logo
            text_x = c * cell_width + cell_width // 2
            text_y = r * cell_height + cell_height - 20
            
            draw.text((text_x, text_y), label, fill=(0, 0, 0, 255), anchor="mm", font=font)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            
    # Save image
    output_path = r"C:\Users\Lenovo\.gemini\antigravity-ide\brain\a23b67fd-bfcd-43d0-b6fd-6f97f180d4d2\logo_contact_sheet.png"
    contact_sheet.save(output_path, "PNG")
    print(f"Contact sheet saved to: {output_path}")

if __name__ == "__main__":
    make_contact_sheet()
