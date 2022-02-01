import os
import re
import json

path = "."

fname = []

for root, d_names, f_names in os.walk(path):
    for f in f_names:
        if "assets" in root:
            continue
        fname.append(os.path.join(root, f))

print(fname)

words_used = []

for file_path in fname:
    with open(file_path, "r", encoding="utf-8") as open_file:
        file_content = open_file.read()
        words = re.findall("Translate\(\"([^\"]*)\"", file_content)
        words_used.extend(words)

with open(os.path.join(".", "utils", "translate", "translate_keys.json"), "w") as output:
    output.write(json.dumps(list(set(words_used)), indent=2))