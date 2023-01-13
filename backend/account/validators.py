import os


def validate_file_extention(name):
    isValid = True

    ext = os.path.splitext(name)[1]
    valid_extentions = ['.pdf']

    if not ext.lower() in valid_extentions:
        isValid = False

    return isValid
