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
  email: {string, mandatory},
  phone: {string, mandatory},
}
```


## User APIs 
### POST /register
- Create a user document from request body. Request body must contain username, email and phone.
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
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
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "something went wrong",
}
```

Note: [Bcrypt](https://www.npmjs.com/package/bcrypt)
Send [form-data](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## FEATTURE II - Todo
### Models
- Todo Model
```yaml
{ 
  id: {number, unique},
  content: {string,},
  done: {boolean,},
  userId : {number, mandatory},
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
        "content": "Learn Elbow lever",
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


### GET / todos
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
- Returns product details by product id
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the product documents. The response should be a JSON object
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### PATCH / todo
- Updates a todo by changing at least one or all fields

- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated product document. The response should be a JSON object like 
```yaml
{
    "patchedDoc": {
        "id": 2,
        "content": "fix do 200 push-ups",
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
```yaml

```

### DELETE /todo/:id
- Deletes a product by product id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like 
```yaml

```
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like 
```yaml

```

## Testing 
- To test these apis create a new collection was created in the Postman.
- Each api should have a new request in this collection
- Each request in the collection was named rightly. Eg Create user, Create product, Get products etc