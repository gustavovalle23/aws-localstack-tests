import os
import boto3
from mypy_boto3_s3.client import S3Client
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()


def create_bucket_if_does_not_exists(bucket_name: str, s3: S3Client):
    try:
        s3.head_bucket(Bucket=bucket_name)
    except ClientError as e:
        if e.response["Error"]["Code"] == "404":
            s3.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={"LocationConstraint": "us-west-2"},
            )
            print(f"Bucket '{bucket_name}' created successfully.")
    else:
        print(f"Bucket ${bucket_name} already exists.")


aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
endpoint = os.getenv("ENDPOINT")
bucket_name = os.getenv("BUCKET_NAME") or "my-bucket"


s3: S3Client = boto3.client(
    "s3",
    endpoint_url=endpoint,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

create_bucket_if_does_not_exists(bucket_name, s3)
