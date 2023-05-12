from moto.sqs import mock_sqs
import json

from app.sqs_example import (
    create_sqs_client,
    create_queue_if_does_not_exists,
    send_queue_message,
    receive_queue_messages,
)


@mock_sqs
def test_sqs_client_creation():
    sqs = create_sqs_client()
    sqs is not None


@mock_sqs
def test_sqs_empty_queue_list():
    sqs = create_sqs_client()
    assert sqs.list_queues().get("QueueUrls") is None


@mock_sqs
def test_sqs_create_new_queue():
    sqs = create_sqs_client()
    response = create_queue_if_does_not_exists(sqs, "test_queue")
    assert type(response.get("QueueUrl")) is str
    assert sqs.list_queues().get("QueueUrls") is not None
    assert len(sqs.list_queues().get("QueueUrls")) == 1


@mock_sqs
def test_sqs_send_one_message_to_queue():
    sqs = create_sqs_client()
    queue_url = create_queue_if_does_not_exists(sqs, "test_queue").get("QueueUrl")
    response = send_queue_message(sqs, queue_url, json.dumps({"msg": "Hello World"}))
    assert response.get("MessageId") is not None


@mock_sqs
def test_sqs_receive_empty_messages():
    sqs = create_sqs_client()
    queue_url = create_queue_if_does_not_exists(sqs, "test_queue").get("QueueUrl")
    messages = receive_queue_messages(sqs, queue_url)
    assert messages.get("Messages") is None


@mock_sqs
def test_sqs_receive_messages():
    sqs = create_sqs_client()
    queue_url = create_queue_if_does_not_exists(sqs, "test_queue").get("QueueUrl")
    send_queue_message(sqs, queue_url, json.dumps({"msg": "Hello World"}))
    messages = receive_queue_messages(sqs, queue_url)
    assert messages.get("Messages") is not None
    assert len(messages.get("Messages")) == 1
    message = messages.get("Messages")[0].get("Body")
    assert json.loads(message) == {"msg": "Hello World"}
