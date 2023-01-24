const request = require("supertest")
const baseURL = "http://localhost:5000"

describe("GET /todos", () => {
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