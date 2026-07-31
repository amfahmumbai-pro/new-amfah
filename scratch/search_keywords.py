import os

def search_files():
    keywords = ["acg", "sun", "mankind", "jubilant", "macleods", "nestor"]
    found = []
    for root, dirs, files in os.walk(r"c:\Users\Lenovo\Live Project\amfah_project"):
        # skip node_modules and .git
        if "node_modules" in root or ".git" in root or ".next" in root:
            continue
        for f in files:
            for kw in keywords:
                if kw in f.lower():
                    found.append(os.path.join(root, f))
                    
    print("Found files:")
    for path in found:
        print(f" - {path}")

if __name__ == "__main__":
    search_files()
