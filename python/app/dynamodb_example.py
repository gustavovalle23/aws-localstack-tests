import boto3
from dotenv import load_dotenv
from mypy_boto3_dynamodb.client import DynamoDBClient

from app.env import (
    endpoint,
    aws_access_key_id,
    dynamodb_user_table,
    aws_secret_access_key,
)

load_dotenv()


def create_dynamodb_client() -> DynamoDBClient:
    boto3.client(
        "dynamodb",
        endpoint_url=endpoint,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )


def create_item(dynamodb: DynamoDBClient, item):
    dynamodb.put_item(TableName=dynamodb_user_table, Item=item)
