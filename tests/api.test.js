const request = require("supertest")

const { app } = require("../index.js")
const { getAllEmployees, getAllEmployeeById } = require("../controllers/index.js")
const http = require("http")

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllEmployees: jest.fn()
}))

let server

beforeAll(async () => {
    server = http.createServer(app)
    server.listen(3001)
})

afterAll(async () => {
    server.close()
})

describe("controller function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should return all employees", () => {
        let mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ]
        getAllEmployees.mockReturnValue(mockEmployees)
        let result = getAllEmployees()
        expect(result).toEqual(mockEmployees)
        expect(result.length).toEqual(3)
    })
})
describe("API endpoints test", () => {
    it("GET /employees should retrive all employees", async () => {
        const mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ]
        let res = await request(server).get("/employees")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            employees: [{
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },]
        })
        expect(res.body.employees.length).toEqual(3)
    }),
    it("GET /employee/:id should retrive the perticular employee", async () => {
        let mockEmployee = {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            }
        let res = await request(server).get("/employee/1")
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({
            employee: {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            }
        })
    })
})