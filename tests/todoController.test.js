const request = require("supertest")
const baseURL = "http://localhost:5000"

describe("CREATE /todos", () => {
    const newTodo = {
    userId: 1,
    content: "Drink water",
    done: false
    }
    let createdToDoMain = null;
    it("Message should match", async () => {
        createdToDoMain = await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text);
        expect(createdToDoMain.message).toBe("todo created");
    });
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${createdToDoMain.newTodo.id}`);
    })
});

describe("DELETE /todos", () => {
    const newTodo = {
    userId: 1,
    content: "Drink water",
    done: false
    }    
    let createdToDo = null;
    beforeAll(async () => {
        createdToDo =  await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text).newTodo;
    })
    it("Message should match", async () => {
        let deletedToDo = await JSON.parse((await request(baseURL).delete(`/todo/${createdToDo.id}`)).text);
        expect(deletedToDo.message).toBe("todo deleted");
    });
});

describe("GETSINGLETODO /todos", () => {
    const newTodo = {
    userId: 1,
    content: "Drink water",
    done: false
    }
    let createdToDo = null;
    beforeAll(async () => {
        createdToDo =  await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text).newTodo;
    })
    it("should return 200", async () => {
        const response = await request(baseURL).get(`/todo/${createdToDo.id}`);
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${createdToDo.id}`);
    })
});

describe("PATCH /todos", () => {
    const newTodo = {
    userId: 1,
    content: "Drink water",
    done: false
    }
    const updateToDo = {
        userId: 1,
        content: "Drink water",
        done: true
    }
    let createdToDo = null;
    beforeAll(async () => {
        createdToDo =  await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text).newTodo;
    })
    it("should return 200", async () => {
        const response =  await request(baseURL).patch(`/todo/${createdToDo.id}`).send(updateToDo);
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${createdToDo.id}`);
    })
});

describe("GETALLTODO /todos", () => {
    jest.setTimeout(30000)
    const newTodo = {
    userId: 1,
    content: "Drink water",
    done: false
    }
    const newTodoagain = {
        userId: 1,
        content: "Drink water again",
        done: false
    }
    let createdToDo = null;
    let createdToDoagain = null;
    beforeAll(async () => {
        createdToDo =  await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text).newTodo;
        createdToDoagain =  await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text).newTodo;
    })
    it("should return 200", async () => {
        const resultGetAll = (await request(baseURL).get(`/todo/all/1`))
        const response = await JSON.parse(resultGetAll.text).userDocs;
        const length = await response.length;
        expect(length).toBeGreaterThan(1);
        expect(resultGetAll.status).toBe(200);
    });
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${createdToDo.id}`);
        await request(baseURL).delete(`/todo/${createdToDoagain.id}`);
    })
})

describe("Invalid CREATE /todos", () => {
    const newTodo = {
        userId: 0,
        content: "Drink water",
        done: false
    }
    let createdToDoMain = null;
    it("Message should match", async () => {
        createdToDoMain = await JSON.parse((await request(baseURL).post("/todo").send(newTodo)).text);
        expect(createdToDoMain).toBe(null);
        expect(createdToDoMain.message).toBe("Not fullfilled");
        expect(createdToDoMain.error).toBe("User does not exist");
    });
});

describe("Invalid DELETE /todos", () => {
    const newTodo = {
    userId: 1,
    content: "I don't exist",
    done: false
    }
    let createdToDoMain = null;
    it("Message should match", async () => {
        createdToDoMain = await JSON.parse((await request(baseURL).delete("/todo/0")).text);
        expect(createdToDoMain.message).toBe("Not fullfilled");
        expect(createdToDoMain.error.meta.cause).toBe("Record to update not found.");
    });
});

describe("Invalid PATCH /todos", () => {
    const updateToDo = {
        userId: 1,
        content: "Drink water",
        done: true
    }
    it("Should return error", async () => {
        const response =  await JSON.parse((await request(baseURL).patch(`/todo/0`).send(updateToDo)).text);
        expect(response.message).toBe("Not fullfilled");
        expect(response.error.meta.cause).toBe("Record to update not found.");
    });
});