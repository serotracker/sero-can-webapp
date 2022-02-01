import json

en = json.load(open("en.json", "r", encoding="utf-8"))
fr = json.load(open("fr.json", "r", encoding="utf-8"))
de = json.load(open("de.json", "r", encoding="utf-8"))


def get_diff(dict1, dict2):
    missing_keys = []
    for key in dict1:
        if key not in dict2:
            missing_keys.append(key)
        elif type(dict1[key]) is dict:
            keys = get_diff(dict1[key], dict2[key])
            if len(keys) > 0:
                missing_keys.append({key: keys})
    return missing_keys


# French vs English


print(f'keys in english but not in french: {json.dumps(get_diff(en, fr), indent=2)}')

print(f'keys in french but not in english: {json.dumps(get_diff(fr, en), indent=2)}')

# German vs English

print(f'keys in english but not in german: {json.dumps(get_diff(en, de), indent=2)}')

print(f'keys in german but not in english: {json.dumps(get_diff(de, en), indent=2)}')

# French vs German

print(f'keys in german but not in french: {json.dumps(get_diff(de, fr), indent=2)}')

print(f'keys in french but not in german: {json.dumps(get_diff(fr, de), indent=2)}')


print(len(en.keys()))