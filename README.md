# SquirrelFcmRelay
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

## Development
- `npm i`
- Create a `.env` file and insert the credentials there (format: `key=value`)
- `npm start`