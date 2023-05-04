# AWS LocalStack

## Introduction
In this code, we will easily set up an AWS local environment using LocalStack and start developing AWS applications locally. LocalStack provides a convenient way to test your AWS application locally, and even in your continuous integration processes. We will show you how to upload an image to the S3 (Simple Storage Service) through LocalStack.

## Prerequisites
- Docker installed
- AWS CLI installed

## Installation
1. Clone this repository
2. Navigate to the `aws-localstack` directory
3. Run the following command to start the LocalStack service:
    ```
    docker-compose up -d
    ```
4. Run the following command to configure your AWS access:
    ```
    aws configure --endpoint-url=http://localhost:4566
    ```
    Follow the prompts and enter the values as needed:
    ```
    AWS Access Key ID [None]: test
    AWS Secret Access Key [None]: test
    Default region name [None]: us-west-2
    Default output format [None]:
    ```
5. Create a new bucket (repository) in S3:
    ```
    node bucketOperations.js
    ```
    This will create a new bucket named "my-bucket" in your local environment.

## Usage
Now that the installation is complete, you can use the AWS S3 service in your local environment. 

To upload a file to S3, you can run the following command:
```
aws --endpoint-url=http://localhost:4566 s3 cp <file_path> s3://<bucket_name>/<object_name>
```

For example:
```
aws --endpoint-url=http://localhost:4566 s3 cp ~/Downloads/my_file.png s3://my-bucket/my_file.png
```

This will upload the file `my_file.png` to the S3 bucket named `my-bucket` in your local environment.

<!-- ```bash
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-bucket
``` -->
