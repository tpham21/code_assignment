Client: Angularjs version 1
Server: Nodejs

To start the project, you need to have all dependencies installed.
Go to *client* folder
Do **npm install** and **bower install**
Go to *server* folder
Do **npm install**

## How to Run
  Go to *client* folder and type **npm start**
  Go to *server* folder and type **npm start**


# Assigntment:

1. User Interface:
    * Users should be authenticated using an OAuth2 mechanism (**Not implemented**)
    * Create a user interface for the creation, read, update and deletion of a JSON document. The schema for the JSON document is provided at the end of this
document.
      * When creating a new document, the user is able to select a file storage
location or storage in a DB
      * Validation of input conforming to the schema below.
    * You may use any JS framework you desire (Angular, React, Vue, etc)

2. Microservice To Support Crud Operations (**Not sure about the Microservice pattern/ What does this service do**)
    * Service must be written in Node
    * Service should validate identity and authorization of caller.
    * Service should determine location of operation (DB, file system, based on entity being edited or created)
  
  ## Explain what I have done for Microservice
  I was not sure what does the service is required to do, so I was trying to make it like a central service, so other services can connect and talk to.
 
 *Create new Service:*
  ```javascript
  {
      "url":".../microservice/v1.0/services"
      "method":"POST",
      "body":
      {
        "name": (service name)
        "endpoint": (service Url)
      }
  }
  ```
  The response will contain *serviceToken*, which will be used for validation
  
  *Get service:*
   ```javascript
  {
      "url":".../microservice/v1.0/entityId"
      "method":"GET",
      "headers":
      {
        "service_token": (serviceToken/accessToken)
      }
  }
  ```
  
   *Update service:*
   ```javascript
  {
      "url":".../microservice/v1.0/entityId"
      "method":"PUT",
      "headers":
      {
        "service_token": (serviceToken/accessToken)
      },
      "body":
      {
        "name": (service name)
        "endpoint": (service Url)
      }
  }
  ```
  
  *Delete service:*
   ```javascript
  {
      "url":".../microservice/v1.0/entityId"
      "method":"DELETE",
      "headers":
      {
        "service_token": (serviceToken/accessToken)
      }
  }
  ```
  
