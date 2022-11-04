FROM python:3.7-buster

RUN apt-get update -y && \
    apt-get install -y git curl bash libffi-dev make zip
RUN pip install --upgrade boto3 awscli

ADD init-table.sh .

RUN ["chmod", "+x", "init-table.sh"]
