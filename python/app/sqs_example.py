import boto3
from mypy_boto3_sqs.client import SQSClient
from dotenv import load_dotenv

from app.env import endpoint, aws_access_key_id, aws_secret_access_key

load_dotenv()


def create_sqs_client() -> SQSClient:
    return boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )
