import boto3
from mypy_boto3_sqs.client import SQSClient
from mypy_boto3_sqs.type_defs import SendMessageResultTypeDef
from dotenv import load_dotenv
from typing import Any

from app.env import endpoint, aws_access_key_id, aws_secret_access_key

load_dotenv()


def create_sqs_client() -> SQSClient:
    return boto3.client(
        "sqs",
        endpoint_url=endpoint,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )


def create_queue_if_does_not_exists(sqs: SQSClient, queue_name: str):
    response = sqs.create_queue(QueueName=queue_name)
    return response


def send_queue_message(
    sqs: SQSClient, queue_url: str, message_body: str
) -> SendMessageResultTypeDef:
    return sqs.send_message(QueueUrl=queue_url, MessageBody=message_body)


def receive_queue_messages(sqs: SQSClient, queue_url: str):
    return sqs.receive_message(QueueUrl=queue_url)
