#Translations

How do they work:

We have 3 files named en.json, fr.json and de.json that contain english, french, and german translations of all the content we display on the website. 

We use a Translate() function inaccross the website whenever displaying content that renders the correct translation for every section. 

the first argument of the function is the key. This can either map to a translation or dictionary of values.
The second argument is an array of secondary keys that form a tree like structure. each key can either be a translation or another dictionary and is created in a nested manor

## Maintainance

We have an inhouse team of individuals fluent in french that help us accurately translate from english to french.

Whenever new content is added to the website, the english and french translations are posted on a translations board and approved/corrected by the team.

The German translations are taken care of by the RKI. we have a checkpoint branch in git which we then run a diff on to get all the changes made
to our de.json file. these changes and their english counterparts and then sent over to the RKI every month for approval. 

## Scripts

There are 2 scripts of note here:
```
    get_diff.py
    
    cleanup_translate.py
```

get_diff.py runs a diff on all 3 json files and outputs which keys are not in sync
i.e.
- Missing from one of the files
- Mispelled
- Deprecated

These are then printed out to the console and can be used to fix the issues.

The cleanup_translate.py file on the other hand goes through every file in the codebase
and comes up with a list of all the keys actually used by Translate functions. 
This way any translations and clutter that exists in our files that we no longer use can be removed improving
the readability of the translations. 

Both these scripts are very bare bones and have a decent scope for imporvement, but that can come later