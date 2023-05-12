import boto3
from mypy_boto3_timestream_write import TimestreamWriteClient
from dotenv import load_dotenv

from app.env import endpoint, aws_access_key_id, aws_secret_access_key

load_dotenv()


def create_timestream_write_client() -> TimestreamWriteClient:
    return boto3.client(
        "timestream-write",
        endpoint_url=endpoint,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )


if __name__ == "__main__":
    timestream = create_timestream_write_client()
