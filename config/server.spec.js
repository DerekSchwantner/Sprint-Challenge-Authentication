const request = require("supertest"); // << install this as -D

const server = require("../api/server"); // << the System Under Test (SUT)

describe("server", () => {
  it("db environment set to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  //   describe("GET /api/jokes", () => {
  //     it("should return 200 OK", () => {
  //       return request(server)
  //         .get("/api/jokes")
  //         .set(
  //           "Authorization",
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6ImJvYiIsImlhdCI6MTU2NDE1Mzg2NiwiZXhwIjoxNTY0MjQwMjY2fQ.cWwWsrFUKH8toFySotc4NZ2UuBt1o6S8I7aUcNROW1g"
  //         )
  //         .then(res => {
  //           expect(res.status).toBe(200);
  //         });
  //     });
  //     it("should return data in JSON", () => {
  //       return request(server)
  //         .get("/api/jokes")
  //         .then(res => {
  //           expect(res.type).toMatch(/json/);
  //           expect(res.type).toBe("application/json");
  //         });
  //     });
  //
  //       describe("register", () => {
  //         it("should return 201 Created", () => {
  //           // rest client and make a get to '/', look at the status code
  //           return request(server)
  //             .get("/api/jokes")

  //             .then(res => {
  //               expect(res.status).toBe(200);
  //             });
  //         });
  //     it("should return data in JSON", () => {
  //       return request(server)
  //         .get("/api/jokes")
  //         .then(res => {
  //           expect(res.type).toMatch(/json/);
  //           expect(res.type).toBe("application/json");
  //         });
  //     });
  //   });

  describe("login", () => {
    it("should return 200 OK", () => {
      // rest client and make a get to '/', look at the status code
      return request(server)
        .post("/api/login")
        .send({
          username: "bob",
          password: "pw"
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return data in JSON", () => {
      return request(server)
        .post("/api/login")
        .send({
          username: "bob",
          password: "pw"
        })
        .then(res => {
          expect(res.type).toMatch(/json/);
          expect(res.type).toBe("application/json");
        });
    });
  });
});
