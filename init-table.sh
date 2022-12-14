#!/bin/bash
#!/usr/bin/env bash

sleep 5s

mesibotVotesTableName='mesibot-votes'
existing_table=$(aws --endpoint-url=http://localstack-moontower:4566 dynamodb list-tables | grep $mesibotVotesTableName | sed 's/ //g')
if [ -z "$existing_table" ]; then
    aws --endpoint-url=http://localstack-mesibot:4566 dynamodb create-table \
        --table-name "$mesibotVotesTableName" \
        --attribute-definitions \
            AttributeName=playlistId,AttributeType=S \
            AttributeName=songId,AttributeType=S \
        --key-schema \
            AttributeName=playlistId,KeyType=HASH \
            AttributeName=songId,KeyType=RANGE \
        --provisioned-throughput \
            ReadCapacityUnits=5,WriteCapacityUnits=5
fi

echo Done creating dynamodb table
