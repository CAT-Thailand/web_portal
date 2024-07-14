import { ContractCreateInterface } from "@/interfaces/IContract";
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
            noticeDate: contract.NoticeDate,
            projectName: contract.ProjectName,
            poNumber: contract.PoNumber,
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