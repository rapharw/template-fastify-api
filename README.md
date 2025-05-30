# Template Fastify Api

> This is a Node JS Application that provides the CRUD Operations exposed with an API, using the framework Fastify, Sequelize, Swagger and Security.

---

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [VSCode Extensions to perform better](#vScode-extensions-to-perform-better)
- [Postman](#postman)
- [Main Structure](#main-structure)
- [Setup and how to run locally](#setup-and-how-to-run-locally)
- [(Quickly) How it works](<#(quickly)-how-the-project-works>)
- [(TLDR) How it works](<#(tldr)-how-it-works>)
  - [Transaction Control](#transaction-control)
  - [Security](#security-with-helmet)
  - [OpenAPI (Swagger)](<#openapi-(swagger)>)
  - [Error Handler](#error-handler)

---

## General info

The motivation of this project is to serve as a support guide for building applications using the REST API. The development architecture standard adopted is the MVC model.

---

## Technologies

- Fastify
- Sequelize v6 (with cls-hooked for transaction control)
- Sequelize-Cli
- MSSQL (Tedious)
- OpenAPI/Swagger Spec (fastify-swagger)

---

## VSCode Extensions to perform better

ESLint

Prettier - Code formatter

OpenAPI (Swagger) Editor

Swagger Viewer

YAML

---

## Postman

Import this Collection on your Postman to start use de API Client.

https://www.getpostman.com/collections/7549e8645fb91026ba1e

![Postman](./screenshots/readme-postman.GIF)

---

## Main Structure

![Main Structure](./screenshots/readme-structure.GIF)

## Setup and how to run locally

### Clone the repository and run:

```cmd
npm install
```

### Set environment variables OR create a file .env

The values must have the below environment variables:

```
TITLE_APP=

LOGGER_LEVEL=

DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_POOL_MAX_CONNECTION=
DATABASE_POOL_MIN_CONNECTION=
DATABASE_POOL_IDLE=
DATABASE_ACQUIRE=
DATABASE_DIALECT=mssql
DATABASE_REQUEST_TIMEOUT=
DATABASE_ENCRYPT=true
```

> You can provide this environment variables via any other ways, like arguments via any Cloud Platform.

---

## Run with Sql Server locally via Docker

Execute the below command:

```
docker run -d -p 1433:1433 --name test-sqlserver -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Teste@123" -v mssql-local:/var/opt/mssql mcr.microsoft.com/mssql/server
```

Create the `.env` file on the root folder of the project. Configure like this:

```
TITLE_APP=Template Fastify Api

LOGGER_LEVEL=debug

DATABASE_HOST=0.0.0.0
DATABASE_NAME=
DATABASE_USER=sa
DATABASE_PASSWORD=Teste@123
DATABASE_POOL_MAX_CONNECTION=50
DATABASE_POOL_MIN_CONNECTION=10
DATABASE_POOL_IDLE=10000
DATABASE_ACQUIRE=30000
DATABASE_DIALECT=mssql
DATABASE_REQUEST_TIMEOUT=300000
DATABASE_ENCRYPT=true
```

### Once you have started the container with `MSSql`, you will be able to start your application

```
npm start
```

![Started](./screenshots/readme-started.GIF)

### After the application starts, assuming that you are on the localhost:3000, we can access this URL's:

`Status of app`: http://localhost:3000/

`Swagger Documentation`: http://localhost:3000/documentation

![Swagger](./screenshots/readme-swagger.GIF)

---

## (Quickly) How the project works

The application exposes REST services to perform CRUD operations. The Fastify is responsable to create and injects the data for reusability.

:orange_book: When Create a User, for example, the flow below is performed:

1. :green_book: The route receives the request. The controller only treats the received data, rtrieve the objects injected by the Fastify (like models, loggers, plugins), and delegates it to a Service Layer.

2. :ledger: :closed_book: The Service Layer will contain the business rules of the domain, knowing which models/repositories it will handle.

3. :notebook: The Repository Layer contains database access operations. It will contain the operation rule desired by the model.

![Diagram](./screenshots/readme-diagram.GIF)

---

## (TLDR) How it works

When we talk about Fastify, it is all about plugins! A plugin can be a small piece of your code, which becomes extensible and injectable throughout your application in a fast and modular way. And that is awesome! :metal:

[See more Fastify Plugins](https://www.fastify.io/docs/latest/Getting-Started/#your-first-plugin)

Fastify is used like Express, to serve our routes and register our middlewares.

You will see a file **index.js** in some folders (like models, services and repositories). This file is responsable to load the other files and tells to Fastify how to register on the context.

<br>

### Structure explained

<br>

![#Folder](./screenshots/readme-green-card.GIF) `Represent a Folder`

![#1589F0](./screenshots/readme-blue-card.GIF) `Represent a File`

<br>

### ![#1589F0](./screenshots/readme-blue-card.GIF) **_server.js_**

The **server.js** file contains the main config of project and the initial startup.

### ![#Folder](./screenshots/readme-green-card.GIF) **APP**

This folder contains de main structure of our application, with the routes, models, services and repositories.

### ![#1589F0](./screenshots/readme-blue-card.GIF) **_bootstrap.js_**

The **bootstrap.js** file have the responsability of load and register all of our plugins, routes, models and any kind of plugin that we need to use on the entire application.

### ![#Folder](./screenshots/readme-green-card.GIF) **ROUTES**

This folder contains the routes, controllers and filters.

> **When you create a folder with this files, automatically a route will be created.**

**Example of a route `users`:**

![Routes](./screenshots/readme-routes.GIF)

**The route `/users` will be created.**

![#1589F0](./screenshots/readme-blue-card.GIF) **_user-route.js_**

> The file defines the route, the HTTP Methods and the controller to each route that will be handled.

![#1589F0](./screenshots/readme-blue-card.GIF) **_user-filter.js_**

> The file only treats the request parameters and request body.

![#1589F0](./screenshots/readme-blue-card.GIF) **_user-controller.js_**

> The file defines the handler of a request. In here, you will be able to get the injected objects from Fastify.

![Controller](./screenshots/readme-controller-injected.GIF)

On the line 10, we just simply get the Fastify instance (like `app` from Express).

On the lines between 11 and 14, we get the injected plugins previously injected by the framework. For example, `fastify.models()` will return the models of sequelize.

### ![#Folder](./screenshots/readme-green-card.GIF) **SERVICES**

This layer is very important to adopt. In here, we will put all the business logic.

#### **Transaction control**

Also here, in the service layer, we can control our transactions (See `transaction control with cls-hooked`).

```javascript
async someOperation(id, data, entitySequelize) {
    try {
        return entitySequelize.transaction((tx) => {
            return Promise.all(
                [   this.someOperation(id),
                    this.anotherOperation(data)
                ]
            );
        });
    } catch (e) {
      throw e;
    }
  }
```

> **If the `someOperation()` method returns success on the operation and the `anotherOperation()` method returns an error, ALL transaction will be rolled back.**

### ![#Folder](./screenshots/readme-green-card.GIF) **REPOSITORIES**

This file contains only the operations of your specific model.

```javascript
 async findAll(filter) {
    return this._model.findAll();
  }
```

> The `this._model` reference is the model of Sequelize

### ![#Folder](./screenshots/readme-green-card.GIF) **MODELS**

This folder contains de Sequelize Models, that will be mapped in database.

![#1589F0](./screenshots/readme-blue-card.GIF) **_sequelize-instance.js_**

> This file create an instance of Sequelize config with the environment variables provided by **.env** OR another way.

![#1589F0](./screenshots/readme-blue-card.GIF) **_index.js_**

> This file will map all of our models/entities that exists on the folder **models**. Also the file create a connection with database, provided by **sequelize-instance.js**.

### ![#Folder](./screenshots/readme-green-card.GIF) **PLUGINS**

This folder contains all the plugins and other global instances that you want to use on the entire project.

#### **Security with Helmet**

> **SECURITY**: The file helmet-support.js contains the configuration for security headers for application.
> [See more](https://helmetjs.github.io/)

### ![#Folder](./screenshots/readme-green-card.GIF) **SWAGGER**

##### **OpenAPI (Swagger)**

This folder contains the API Documentation `api-spec.yaml`, and the `index.js`, which is responsable to create de Swagger UI of our API.

[To see more OpenAPI basic structure](https://swagger.io/docs/specification/basic-structure/)

### **Error Handler**

> **ERROR HANDLER**: The file error-handler-support.js contains the configuration for the Fastify knows to handle and Error from our app.

**_OBS:_**

Look at the below image and see how it works. If an instance error of **BusinessError** will throw, our handler will treat this message properly. Otherwise, an generic message will throw.

![Error Handler](./screenshots/readme-error-handler.GIF)

### ![#Folder](./screenshots/readme-green-card.GIF) **ERRORS** (Our Business Errors)

This folder contains our business errors.

> It its very important separate a dedicated class for each specific **error**.

![Business Error](./screenshots/readme-business-errors.GIF)

The **index.js** file load all the others filed to inject on the Fastify instance.

The **business-error.js** file represents our **BusinessError** class, which our error handler plugin (**error-handler-support.js**) will catch properly.

So, the others classes in this folder represents the specific error we want to catch.

## _For example_

On the **user-service.js**, we have this method:

![Errors Example 1](./screenshots/readme-errors-example-1.GIF)

If and error occurs, we throw a specific instance of **ListUsersNotFoundError**.

The ListUsersNotFoundError class contains only the information of the message that will be throw.

![Errors Example 2](./screenshots/readme-errors-example-2.GIF)

After then, our error handler will treat properly, asking if the **instanceof** of error is **BusinessError**.

And voilá!

![Errors Example 3](./screenshots/readme-errors-example-3.GIF)

## WHY ALL OF THIS "STUFF"?  `SECURITY

---
