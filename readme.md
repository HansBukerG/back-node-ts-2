
# back-sl-challenge

This project is the back-end part of the SimplyLatam challenge, it's made in native Typescript and works in conjunction with a PostgreSQL database.


## Authors

- [@HansBukerG](https://www.github.com/HansBukerG)

- [@Linkedin](https://www.linkedin.com/in/hans-buker-guti%C3%A9rrez-653696136/)


## Deployment

To start this project, you can download a DockerHub image of this project. Here is the command to extract it.

command:

-> docker pull hansbukerg/back-sl-challenge

Before proceeding, you need to verify that ports 5432 and 8081 are not already in use within your Docker environment.

And make sure you have the docker-compose.yml file downloaded:

Now, to run this project, you need to open a terminal in the location of the docker-compose.yml file and run the following command:

command:

-> docker-compose up

## Environment Variables

This project has a .env file which contains important information related to connection routes and database connection:

PORT=

PG_DIALECT=

PG_HOST=

PG_PORT=

PG_DATABASE=

PG_USER=

PG_PASSWORD=

## API Reference

#### Create Company

```http
    POST /api_url/company/post
```

DTO required:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | The name of the company |
| `rut` | `string` | The RUT of the company |
| `address` | `string` | The address of the company |
| `phone` | `string` | The phone number of the company |

#### Get All Companies

```http
    GET /api_url/company/get
```
#### Get Company by ID

```http
    GET /api_url/company/get/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Required. ID of company to get |

#### Delete Company by ID

```http
  DELETE /api_url/company/delete/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required. ID of company to delete |

#### Create Employee

```http
  POST /api_url/employee/post
```
DTO required:

| Field | Type | Description |
|-------|------|-------------|
| `idCompany` | `string` | The ID of the company associated with the employee |
| `rutEmployee` | `string` | The RUT of the employee |
| `fullName` | `string` | The full name of the employee |
| `email` | `string` | The email of the employee |

#### Delete Employee by ID

```http
  DELETE /api_url/employee/delete/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required. ID of employee to delete |






## Links to the Project
 Live url:

  - [https://front-sl-challenge.fly.dev](https://front-sl-challenge.fly.dev)

Github Project:
 - [https://github.com/HansBukerG/front-sl-challenge](https://github.com/HansBukerG/front-sl-challenge)


 


