key_file = open("cortexwebsite/aws/keys.txt", "r")
lines = key_file.read().split("\n")
access_key = lines[0]
secret_key = lines[1]
AWS_ACCESS_KEY_ID = access_key
AWS_SECRET_ACCESS_KEY = secret_key