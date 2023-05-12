import os
import boto3
from mypy_boto3_s3.client import S3Client
from mypy_boto3_s3.type_defs import ObjectTypeDef
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from typing import List

from app.env import aws_access_key_id, aws_secret_access_key, endpoint

load_dotenv()


def create_s3_client() -> S3Client:
    return boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )


def create_bucket_if_does_not_exists(s3: S3Client, bucket_name: str) -> int:
    try:
        s3.head_bucket(Bucket=bucket_name)
    except ClientError as e:
        if e.response["Error"]["Code"] == "404":
            s3.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={"LocationConstraint": "us-west-2"},
            )
            print(f"Bucket '{bucket_name}' created successfully.")
            return 201
    else:
        print(f"Bucket ${bucket_name} already exists.")
        return 200


def put_object_s3(s3: S3Client, bucket_name: str) -> None:
    create_bucket_if_does_not_exists(s3, bucket_name)

    with open("node.png", "rb") as file:
        file_content = file.read()

    s3.put_object(Bucket=bucket_name, Key="path/to/file.png", Body=file_content)


def list_s3_objects(s3: S3Client, bucket_name) -> List[ObjectTypeDef]:
    response = s3.list_objects(Bucket=bucket_name)
    if "Contents" in response:
        contents = response["Contents"]
        print(f"Bucket {bucket_name} contains {len(contents)} files:")
        for item in contents:
            print(item["Key"])
        return contents
    else:
        print(f"Bucket {bucket_name} is empty.")
        return []


if __name__ == "__main__":
    bucket_name = os.getenv("BUCKET_NAME") or "my-bucket"
    s3 = create_s3_client()
    put_object_s3(s3, bucket_name)
    list_s3_objects(s3, bucket_name)
