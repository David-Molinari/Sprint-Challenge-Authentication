const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("POST /api/auth/register", function () {
    beforeEach(async () => {
        await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it("return 201 on success", function () {
    return request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "test" })
        .then(res => {
        expect(res.status).toBe(201);
        });
    });

    it('should return a message saying "User created successfully"', function () {
        return request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "test" })
        .then(res => {
            expect(res.body.message).toBe("User created successfully");
        });
    });
});

describe("POST /api/auth/login", function () {
    it("return 500 on no credentials", function () {
        return request(server)
            .post("/api/auth/login")
            .send({})
            .then(res => {
            expect(res.status).toBe(500);
            });
    });

    it('should return a message saying "invalid credentials"', function () {
        return request(server)
            .post("/api/auth/login")
            .send({})
            .then(res => {
            expect(res.body.message).toBe("invalid credentials");
        });
    });
});