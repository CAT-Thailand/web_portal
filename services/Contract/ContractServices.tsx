import { ContractCreateInterface, ContractInterface, ContractUpdateInterface } from "@/interfaces/IContract";
import axios from "axios";

export async function CreateContract(contract: Partial<ContractCreateInterface>) {
    try {
        const data = {

            customerID: contract.CustomerID,
            contractStart: contract.ContractStart,
            contractStop: contract.ContractStop,
            incidentPerYear: contract.IncidentPerYear,
            incidentPerContract: contract.IncidentPerContract,
            cost: contract.Cost,
            description: contract.Description,
            noticeDate1: contract.NoticeDate1,
            noticeDate2: contract.NoticeDate2,
            noticeDate3: contract.NoticeDate3,
            projectName: contract.ProjectName,
            customerPO: contract.CustomerPO,
            vendorPO: contract.VendorPO,
            scopeOfWorkURL:contract.ScopeOfWorkURL,
            serviceCatalogID: contract.ServiceCatalogID,
            slaID: contract.SlaID
        };

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/create`, data, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating contract:", error);
        return false;
    }
}

export async function ListContracts() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function getContractByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}

export async function UpdateContract(contract: Partial<ContractUpdateInterface>) {
    try {
        const data = {
            id: contract.Id,
            customerID: contract.CustomerID,
            contractStart: contract.ContractStart,
            contractStop: contract.ContractStop,
            incidentPerYear: contract.IncidentPerYear,
            incidentPerContract: contract.IncidentPerContract,
            cost: contract.Cost,
            description: contract.Description,
            noticeDate: contract.NoticeDate,
            projectName: contract.ProjectName,
            customerPO: contract.CustomerPO,
            vendorPO: contract.VendorPO,
            scopeOfWorkURL:contract.ScopeOfWorkURL,
            serviceCatalogID: contract.ServiceCatalogID,
            slaID: contract.SlaID
        };


        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/update`, data, reqOpt);

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

export async function DeleteContractById(id: string) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}