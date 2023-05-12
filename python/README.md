poetry run python -m pytest tests/tests_s3.py -s
poetry run python -m pytest tests/tests_sqs.py -s
poetry run python -m pytest tests/tests_timestream.py -s

poetry run python -m pytest tests/* -s
