import { EmployeeCreateInterface, EmployeeInterface } from "@/interfaces/IEmployee";
import axios from "axios";

export async function ListEmployees() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/employee/list`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data.Data
        } else{
            return false
        }
    })
    return res
}

export async function DeleteEmployeeById(id: string) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.post(`/api/employees/list`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export async function CreateEmployee(employee: Partial<EmployeeCreateInterface>) {
    try {
        const data = {
            name: employee.Name,
            phone: employee.Phone,
            lineID: employee.LineID,
            email: employee.Email,
            password: employee.Phone,
            startDate: employee.StartDate,
            probationDate: employee.ProbationDate,
            terminationDate: employee.TerminationDate,
        };

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/employee/create`, data, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating employee:", error);
        return false;
    }
}

export async function getEmployeeByEmail(email: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/employee/${email}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }
}

export async function Updateemployee(employee: Partial<EmployeeInterface>) {
    try {
        const data = {
            id: employee.Id,
            name: employee.Name,
            phone: employee.Phone,
            lineID: employee.LineID,
            email: employee.Email,
            password: employee.Phone,
            startDate: employee.StartDate,
            probationDate: employee.ProbationDate,
            terminationDate: employee.TerminationDate,
        };

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/employee/update`, data, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating employee:", error);
        return false;
    }
}