import os
import glob
import cv2
import numpy as np
import json

def match_logos():
    ref_image_path = r"C:\Users\Lenovo\.gemini\antigravity-ide\brain\a23b67fd-bfcd-43d0-b6fd-6f97f180d4d2\.tempmediaStorage\media_a23b67fd-bfcd-43d0-b6fd-6f97f180d4d2_1781260384837.png"
    logo_dir = r"c:\Users\Lenovo\Live Project\amfah_project\public\clientels"
    
    # Load reference image
    ref_img = cv2.imread(ref_image_path)
    if ref_img is None:
        print(f"Failed to load reference image from {ref_image_path}")
        return
        
    # Downscale the reference image to 50% width to speed up matching 4x
    target_width = 720
    aspect_ratio = ref_img.shape[0] / ref_img.shape[1]
    target_height = int(target_width * aspect_ratio)
    ref_resized = cv2.resize(ref_img, (target_width, target_height))
    
    ref_gray = cv2.cvtColor(ref_resized, cv2.COLOR_BGR2GRAY)
    ref_h, ref_w = ref_gray.shape
    print(f"Reference image loaded and resized to: {ref_w}x{ref_h}")
    
    # Columns map
    categories = [
        "Govt Institutions",
        "Healthcare",
        "Pharma",
        "IT/ Data Center",
        "Hotels",
        "Educational Institutions",
        "Banks"
    ]
    col_width = ref_w / 7.0
    
    logo_files = sorted(glob.glob(os.path.join(logo_dir, "*.*")))
    logo_files = [f for f in logo_files if f.lower().endswith(('.png', '.webp', '.jpg', '.jpeg'))]
    
    matches = {cat: [] for cat in categories}
    unmatched = []
    
    for logo_path in logo_files:
        filename = os.path.basename(logo_path)
        logo_img = cv2.imread(logo_path)
        if logo_img is None:
            continue
            
        logo_gray = cv2.cvtColor(logo_img, cv2.COLOR_BGR2GRAY)
        
        # If logo has alpha channel, mask out background
        if logo_img.shape[2] == 4:
            _, alpha = cv2.threshold(logo_img[:, :, 3], 1, 255, cv2.THRESH_BINARY)
            logo_gray = cv2.bitwise_and(logo_gray, logo_gray, mask=alpha)
            
        best_val = -1
        best_loc = None
        best_size = None
        
        # Scales for 50% reference image width:
        # Since ref width is 720, the logos in it are approx 30-50px wide/tall.
        # Original logo is 150x150, so scale is around 0.2 to 0.4.
        for scale in np.linspace(0.15, 0.45, 13):
            w = int(logo_gray.shape[1] * scale)
            h = int(logo_gray.shape[0] * scale)
            if w < 10 or h < 10 or w > ref_w or h > ref_h:
                continue
                
            resized = cv2.resize(logo_gray, (w, h))
            res = cv2.matchTemplate(ref_gray, resized, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(res)
            
            if max_val > best_val:
                best_val = max_val
                best_loc = max_loc
                best_size = (w, h)
                
        threshold = 0.50
        if best_val >= threshold:
            x_match, y_match = best_loc
            w_match, h_match = best_size
            x_center = x_match + w_match / 2.0
            
            # Determine column index
            col_idx = int(x_center / col_width)
            if col_idx < 0: col_idx = 0
            if col_idx > 6: col_idx = 6
            
            cat_name = categories[col_idx]
            matches[cat_name].append({
                "filename": filename,
                "score": float(best_val),
                "pos": (int(x_center), int(y_match + h_match / 2.0))
            })
            print(f"Matched {filename} -> {cat_name} (Score: {best_val:.3f} at x={x_center:.1f})")
        else:
            unmatched.append((filename, best_val))
            
    print("\nSummary:")
    for cat in categories:
        print(f" - {cat}: {len(matches[cat])} matches")
    print(f" - Unmatched: {len(unmatched)}")
    
    # Save results to mapped_logos.json
    output = {}
    for cat in categories:
        # Sort matches by vertical y coordinate to preserve top-to-bottom order!
        sorted_cat_matches = sorted(matches[cat], key=lambda x: x["pos"][1])
        output[cat] = [{"name": x["filename"].split('-')[0].replace(".png","").replace(".webp","").replace(".jpg","").replace(".jpeg",""), "image": f"/clientels/{x['filename']}"} for x in sorted_cat_matches]
        
    with open(r"c:\Users\Lenovo\Live Project\amfah_project\scratch\mapped_logos.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)
    print("Saved mapping to scratch/mapped_logos.json")
    
    if unmatched:
        print("\nUnmatched details (top 15 highest scores):")
        unmatched_sorted = sorted(unmatched, key=lambda x: x[1], reverse=True)
        for fn, val in unmatched_sorted[:15]:
            print(f" - {fn}: {val:.3f}")

if __name__ == "__main__":
    match_logos()
