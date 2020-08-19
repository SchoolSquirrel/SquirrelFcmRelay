# SquirrelFcmRelay
[![Available on Docker Hub](https://img.shields.io/badge/available_on-Docker_Hub-blue?logo=docker)](https://hub.docker.com/repository/docker/schoolsquirrel/squirrelfcmrelay)
[![Deploy](https://github.com/SchoolSquirrel/squirrelfcmrelay/workflows/Deploy/badge.svg)](https://github.com/SchoolSquirrel/SquirrelFcmRelay/actions)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE.md)
[![GitHub last commit](https://img.shields.io/github/last-commit/SchoolSquirrel/SquirrelFcmRelay?color=brightgreen)](https://github.com/SchoolSquirrel/SquirrelFcmRelay/commits)
[![Maintenance](https://img.shields.io/maintenance/yes/2020)](https://github.com/SchoolSquirrel/SquirrelFcmRelay/commits)

A FCM relay server for SchoolSquirrel.

## Usage
Run the docker container and specify the following environment variables:
- `type`
- `project_id`
- `private_key_id`
- `private_key`
- `client_email`
- `client_id`
- `auth_uri`
- `token_uri`
- `auth_provider_x509_cert_url`
- `client_x509_cert_url`

You can get those from the Firebase Console.

To send a notification, just make a post request to `http(s)://serverurl.tld` with the payload in the request body.

## Payload
You can only send notifications to specific devices using their `token`. Sending to `condition`s or `topic`s is disabled for security reasons.

In addition, only the `notification` and `data` properties are allowed. 


## Development
- `npm i`
- Create a `.env` file and insert the credentials there (format: `key=value`)
- `npm start`