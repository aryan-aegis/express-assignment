# express-assingment

## Project - TodoApp

### Key points
- In this project we will work feature wise. That means we pick one object like user, todo etc at a time. We work through it's feature. The steps would be:
  1) We create it's model.
  2) We build it's APIs.
  3) We test these APIs.

## FEATURE I - User
### Models
- User Model
```yaml
{ 
  id: {number, mandatory},
  username: {string, mandatory},
  email: {string, mandatory, unique},
  phone: {string, mandatory, unique},
}
```


## User APIs 
### POST /register
- Create a user document from request body. Request body must contain username, email and phone.
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be
  like below JSON object 
```yaml
{
    "status": true,
    "newUser": {
      "id": 1,
      "username": "Roman",
      "email": "roman@gmail.com",
      "phone": "9090909090"
    }
}
```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be like below JSON object (#error-response-structure)
```yaml
{
    "status": true,
    "message": "something went wrong",
}
```

## FEATURE II - Todo
### Models
- Todo Model
```yaml
{ 
  id: {number, unique},
  content: {string,},
  done: {boolean,},
  userId : {number, mandatory},
  isDeleted : {boolean}
}
```


## Todo API (_No authentication required_)
### POST / todos
- Create a todo document from request body.
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the todo document. The response should be a JSON object.
```yaml
{
    "newTodo": {
        "id": 3,
        "content": "Todo name",
        "done": false,
        "userId": 1
    },
    "message": "todo created"
}
```

  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like 
```yaml
{
    "message": "Not fullfilled",
    "error": {
        "clientVersion": "4.9.0"
    }
}
```


### GET / todo/all/:userid
- Fetch all todos based on current logged user's id.
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the todo documents. The response should be a array of JSON object.
```yaml
{
    "userDocs": [
        {
            "id": 1,
            "content": "Learn Elbow lever",
            "done": false,
            "userId": 1
        }
    ],
    "message": "get todo done"
}
```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.
```yaml
{
    "message": "Not fullfilled",
    "error": {
        "clientVersion": "4.9.0"
    }
}
```



### GET / todo/:id
- Returns todo details by todo id
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the todo documents. The response should be a JSON object
```yaml
{
    "uniqueToDo": {
        "id": 1,
        "content": "Learn Front lever",
        "done": true,
        "userId": 1,
        "isDeleted": false
    },
    "message": "get todo done with content "
}
```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.
```yaml
{
    "message": "Not fullfilled",
    "error": {
        "clientVersion": "4.9.0"
    }
}
```

### PATCH / todo/:todoid
- Updates a todo by changing at least one or all fields

- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated todo document. The response should be a JSON object like 
```yaml
{
    "patchedDoc": {
        "id": 2,
        "content": "New content if provided",
        "done": true,
        "userId": 1
    },
    "message": "todo patched"
}
```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like
```yaml
{
    "message": "Not fullfilled",
    "error": {
        "clientVersion": "4.9.0"
    }
}
```

### DELETE /todo/:todoid
- Deletes a todo by todo id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like 
```yaml
{
    "delDoc": {
        "id": 7,
        "content": "Drink water",
        "done": false,
        "userId": 1,
        "isDeleted": true,
    },
    "message": "todo deleted",
}
```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like 
```yaml
{
    "message": "Not fullfilled",
    "error": {
        "code": "P2025",
        "clientVersion": "4.9.0",
        "meta": {
            "cause": "Record to update not found."
        }
    }
}
```

## Testing 
- To test these api's a new collection was created in the Postman.
- Each api does have a new request in this collection
- Each request in the collection was named rightly. Eg Create user, Create todo, Get todo etc