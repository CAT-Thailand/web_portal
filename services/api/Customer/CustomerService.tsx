import { CustomerCreateInterface, CustomerInterface } from "@/interfaces/ICustomer";
import axios from "axios";

export async function ListCustomers() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/customer/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function getCustomerByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/customer/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}
export async function DeleteCustomerById(id: string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.post(`/customers/list`, reqOpt)
    if (res.data) {
        return res.data
    } else {
        return false
    }

}

export async function CreateCustomer(customer: Partial<CustomerCreateInterface>) {
    try {
        const data = {
            companyName: customer.CompanyName,
            ContactPerson: customer.ContactPerson,
            ContactNumber: customer.ContactNumber,
            ContactEmail: customer.ContactEmail,
            ContactLineID: customer.ContactLineID,
            GoogleMapURL: customer.GoogleMapURL,
            Address: customer.Address,
            Description: customer.Description,
            TagGroupCustomer: customer.TagGroupCustomer,
            TaxNumber: customer.TaxNumber,
        };

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/customer/create`, data, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}

export async function UpdateCustomer(customer: Partial<CustomerInterface>) {
    try {
        const data = {
            id: customer.Id,
            companyName: customer.CompanyName,
            contactPerson: customer.ContactPerson,
            contactNumber: customer.ContactNumber,
            contactEmail: customer.ContactEmail,
            contactLineID: customer.ContactLineID,
            googleMapURL: customer.GoogleMapURL,
            address: customer.Address,
            description: customer.Description,
            tagGroupCustomer: customer.TagGroupCustomer,
            taxNumber: customer.TaxNumber,
        };

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/customer/update`, data, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}