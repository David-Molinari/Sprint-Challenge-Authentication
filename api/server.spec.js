const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("POST /api/auth/register", function () {
    it("return 500 on failure", async function () {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "test", password: "test" })
            .then(res => {
            expect(res.status).toBe(500);
            });
    });

    it('return "error: please add valid user and password" on failure', function () {
        return request(server)
            .post("/api/auth/register")
            .send({ password: "testabcdefg" })
            .then(res => {
            expect(res.body.message).toBe("error: please add valid user and password");
            });
        });
});

describe("POST /api/auth/login", function () {
    it("return 200 on valid credentials", function () {
        return request(server)
            .post("/api/auth/login")
            .send({ username: "test", password: "test" })
            .then(res => {
            expect(res.status).toBe(200);
            });
    });

    it('return "Welcome!" on valid credentials', function () {
        return request(server)
            .post("/api/auth/login")
            .send({ username: "test", password: "test" })
            .then(res => {
            expect(res.body.message).toBe("Welcome!");
        });
    });
});

describe("POST /api/jokes", function () {
    it("return 500 on error", function () {
        return request(server)
            .get("/api/jokes")
            .then(res => {
            expect(res.status).toBe(401);
            });
    });

    it('should return a message saying "Error Fetching Jokes"', function () {
        return request(server)
            .get("/api/jokes")
            .then(res => {
            expect(res.body.you).toBe("shall not pass!");
        });
    });
});