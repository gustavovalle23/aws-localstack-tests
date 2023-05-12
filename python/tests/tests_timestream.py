from moto.timestreamwrite import mock_timestreamwrite

from app.timestream_example import create_timestream_write_client


@mock_timestreamwrite
def test_timestream_write_client_creation():
    timestream = create_timestream_write_client()
    assert timestream is not None
