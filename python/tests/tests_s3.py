from moto.s3 import mock_s3

from app.s3_example import (
    list_s3_objects,
    create_s3_client,
    create_bucket_if_does_not_exists,
    put_object_s3,
)


@mock_s3
def test_s3_client_creation():
    s3 = create_s3_client()
    assert s3 is not None


@mock_s3
def test_s3_new_bucket_creation():
    s3 = create_s3_client()
    bucket_name = "test"

    create_bucket_if_does_not_exists(s3, bucket_name)


@mock_s3
def test_s3_bucket_creation_already_exist():
    s3 = create_s3_client()
    bucket_name = "test"

    new = create_bucket_if_does_not_exists(s3, bucket_name)
    already_exist = create_bucket_if_does_not_exists(s3, bucket_name)

    assert new == 201
    assert already_exist == 200


@mock_s3
def test_s3_empty_bucket():
    s3 = create_s3_client()
    bucket_name = "test"

    create_bucket_if_does_not_exists(s3, bucket_name)
    s3_objects = list_s3_objects(s3, bucket_name)
    assert s3_objects == []


@mock_s3
def test_s3_filled_bucket():
    s3 = create_s3_client()
    bucket_name = "test"

    create_bucket_if_does_not_exists(s3, bucket_name)
    s3_objects = list_s3_objects(s3, bucket_name)
    assert s3_objects == []

    put_object_s3(s3, bucket_name)
    s3_objects = list_s3_objects(s3, bucket_name)
    assert len(s3_objects) == 1

    s3_object = s3_objects[0]
    assert s3_object.get("Key") is not None
    assert s3_object.get("Size") is not None
