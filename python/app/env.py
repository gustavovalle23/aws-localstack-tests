import os

aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
endpoint = os.getenv("ENDPOINT")
dynamodb_user_table = os.getenv("DYNAMODB_USER_TABLE")
