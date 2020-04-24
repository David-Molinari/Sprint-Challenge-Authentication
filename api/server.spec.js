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
  
    it("add the user to the db", async function () {
        const userName = "test";

        const existing = await db("users").where({ username: userName });
        expect(existing).toHaveLength(0);

        await request(server)
            .post("/api/auth/register")
            .send({ username: userName, password: "test" })
            .then(res => {
            expect(res.body.message).toBe("User created successfully");
            });
        await request(server)
            .post("/api/auth/register")
            .send({ username: "test2", password: "test2" })
            .then(res => {
            expect(res.body.message).toBe("User created successfully");
            });

        const inserted = await db("users"); //.where({ name: hobbitName });
        expect(inserted).toHaveLength(2);
    });
});

// describe("POST /api/auth/login", function () {

//     it("return 201 on success", function () {
//       return request(server)
//         .post("/api/auth/login")
//         .send({ username: "test", password: "test" })
//         .then(res => {
//           expect(res.status).toBe(201);
//         });
//     });

//     it('should return a message saying "User created successfully"', function () {
//         return request(server)
//           .post("/api/auth/login")
//           .send({ username: "test", password: "test" })
//           .then(res => {
//             expect(res.body.message).toBe("Welcome!");
//           });
//     });
  
    // it("add the user to the db", async function () {
    //     const userName = "test";

    //     const existing = await db("users").where({ username: userName });
    //     expect(existing).toHaveLength(0);

    //     await request(server)
    //         .post("/api/auth/register")
    //         .send({ username: userName, password: "test" })
    //         .then(res => {
    //         expect(res.body.message).toBe("User created successfully");
    //         });
    //     await request(server)
    //         .post("/api/auth/register")
    //         .send({ username: "test2", password: "test2" })
    //         .then(res => {
    //         expect(res.body.message).toBe("User created successfully");
    //         });

    //     const inserted = await db("users"); //.where({ name: hobbitName });
    //     expect(inserted).toHaveLength(2);
    // });
// });