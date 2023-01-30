// import {createUser, getUser, updateUser} from './userController.js'
import  jwt  from 'jsonwebtoken';
import {validateEmail,validateNumber} from '../src/validation/userValidation.js'
const request = require("supertest")
const baseUrl = "http://localhost:5000"
import dotenv from "dotenv"
dotenv.config()

describe('Valid User ', () => {

    jest.setTimeout(30000);

    let user ={
        username:"randy12",
        email:"randy@gmail.com",
        phone:"9182312310",
        password:"asasfasfasf"
    }
    let response = null
    let token = null
    //create dummy user
    beforeAll(async ()=>{

        response = await request(baseUrl).post('/user').send(user)
        // console.log(response.body, process.env.SECRET_KEY)
         token =  jwt.sign(
            response.body.newUser.id.toString(),
            process.env.SECRET_KEY
        )

    })

    //user validation
    it("is receiving a valid email from user", ()=> {
        expect (validateEmail(user.email)).toBe(true)
    })
    it("is receiving a valid phone from user", ()=> {
        expect (validateNumber(user.phone)).toBe(true)
    })

    //create API
    describe("create api", ()=> {
        it("is returning correct status codes", ()=>{
            expect(response.statusCode).toBe(201);
             expect(response.error).toBe(false);
        })
    })

    //get API
    describe("get api", ()=> {

        let getResponse = null
        
        beforeAll(async ()=>{
            getResponse  = await request(baseUrl).get(`/user/${response.body.newUser.id}`)
            .set({'x-api-key':token})
        })

        it("is returning correct status codes", ()=>{
            expect(getResponse.statusCode).toBe(200);
            expect(getResponse.error).toBe(false);
        })
    })

    //update api
    describe("update api", ()=> {

        let updateResponse = null
        let user ={
            username:"randy_orton",
            email:"randy@gmail.com",
            phone:"9182312319",
            password:"asasfasfasf"
        }
        
        beforeAll(async ()=>{
            updateResponse  = await request(baseUrl).patch(`/user/${response.body.newUser.id}`).send(user)
            .set({'x-api-key':token})
            // console.log(updateResponse)
        })

        it("is updating the values", ()=>{
            expect(updateResponse.body.user.username).toBe("randy_orton");
            expect(updateResponse.body.user.phone).toBe("9182312319");
        })

        it("is returning correct status codes", ()=>{
            expect(updateResponse.statusCode).toBe(200);
            expect(updateResponse.error).toBe(false);
        })
    })

    //delete dummy user
    afterAll(async ()=>{

        // console.log(response.body.newUser)
        await request(baseUrl).delete(`/user/${response.body.newUser.id}`)            
        .set({'x-api-key':token})

    })
})


describe('InValid User ', () => {

    let user ={
        username:"randy12",
        email:"randygmail.com",
        phone:"918231231"
    }
    let response = null


    //user validation
    it("is receiving a valid email from user", ()=> {
        expect (validateEmail(user.email)).toBe(false)
    })
    it("is receiving a valid phone from user", ()=> {
        expect (validateNumber(user.phone)).toBe(false)
    })

    //create API
    describe("create api", ()=> {
        let response = null
        beforeAll(async ()=>{

            response = await request(baseUrl).post('/user').send(user)
    
        })

        it("is returning correct status codes", ()=>{
            expect(response.statusCode).toBe(400);
             expect(typeof response.error).toBe("object");
        })
    })

    //get API
    describe("get api", ()=> {

        let getResponse = null
        
        beforeAll(async ()=>{
            getResponse  = await request(baseUrl).get(`/user/99999`)
        })

        it("is returning correct status codes", ()=>{
            expect(getResponse.statusCode).toBe(404);
            expect(typeof getResponse.error).toBe("object");
        })
    })

    //update api
    describe("update api", ()=> {

        let updateResponse = null
        let user ={
            username:"randy_orton",
            email:"randy@gmail.com",
            phone:"918231231"
        }
        
        beforeAll(async ()=>{
            updateResponse  = await request(baseUrl).patch('/user/:1').send(user)
        })


        it("is returning correct status codes", ()=>{
            expect(updateResponse.statusCode).toBe(400);
            expect(typeof updateResponse.error).toBe("object");
        })

        
    })    
})

describe('Authentication ', () => {

    jest.setTimeout(30000);

    let user ={
        username:"randy1233",
        email:"randy@gmail.com",
        phone:"9182312310",
        password:"asasfasfasf"
    }
    let response = null
    let token = null
    let token_correct = null 
    //create dummy user
    beforeAll(async ()=>{

        response = await request(baseUrl).post('/user').send(user)
         token =  jwt.sign(
            "200000",
            process.env.SECRET_KEY
        )
        token_correct = jwt.sign(response.body.newUser.id.toString(),
        process.env.SECRET_KEY)
    })

    describe("update api", () => {

        describe("authorization", () => {
            
            let updateResponse = null

            beforeAll(async () => {
                updateResponse  = await request(baseUrl).patch(`/user/${response.body.newUser.id}`).send(user)
                .set({'x-api-key':token})
            })

            it("is returning correct status codes", ()=>{
                expect(updateResponse.statusCode).toBe(403);
                expect(typeof updateResponse.error).toBe("object");
            })
    
        })
        describe("authentication", () => {
            
            let updateResponse = null

            beforeAll(async () => {
                updateResponse  = await request(baseUrl).patch(`/user/${response.body.newUser.id}`).send(user)
                .set({'x-api-key':"124124"})
            })

            it("is returning correct status codes", ()=>{
                expect(updateResponse.statusCode).toBe(401);
                expect(typeof updateResponse.error).toBe("object");
            })
    
        })
    })
    describe("get api", () => {
        describe("authentication", () => {
            
            let updateResponse = null

            beforeAll(async () => {
                updateResponse  = await request(baseUrl).get(`/user/${response.body.newUser.id}`)
                .set({'x-api-key':"124124"})
            })

            it("is returning correct status codes", ()=>{
                expect(updateResponse.statusCode).toBe(401);
                expect(typeof updateResponse.error).toBe("object");
            })
    
        })
    })

    afterAll(async ()=> {
        // console.log(token)
        await request(baseUrl).delete(`/user/${response.body.newUser.id}`)
        .set({'x-api-key':token_correct})
    })
    
})