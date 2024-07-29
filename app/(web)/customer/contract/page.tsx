"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../../layout";
import { CustomerInterface } from "@/interfaces/ICustomer";

import React from "react";

import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";
import { DeleteCustomerById, ListCustomers, GetSearchCustomer } from "@/services/Customer/CustomerServices";
import Link from "next/link";

import { ContractInterface } from "@/interfaces/IContract";
import { ListContracts } from "@/services/Contract/ContractServices";


const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: 1200,
    },
    drawer: {
        width: 120,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        background:
            "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
    },
    toolbar: {
        minHeight: 64,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#eaecef",
        // padding: 8,
    },
    texticon: {
        color: "#fff",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "24px"
    },
    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "17%",
    },
});


const Contract = ({ children }: any) => {
    const classes = useStyles();
    const { settings, saveSettings } = useSettings()
    let theme = createTheme(themeOptions(settings, "dark"))
    //Customer State
    const [contract, setContract] = React.useState<ContractInterface[]>([])
    const getContract = async () => {
        let res = await ListContracts();
        if (res) {
            setContract(res)
            console.log(res)
            console.log(contract)
        }
    }
    React.useEffect(() => {
        getContract();
        // console.log(contract)

    }, [])
    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteCustomerById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getContract();
        setOpenDelete(false)

    }
    const [searchValue, setSearchValue] = React.useState<string>("")
    const handleInputChange = (
        event: React.ChangeEvent<{ value: any }>
    ) => {

        const { value } = event.target;
        setSearchValue(value);
    };

    const handleSearch = async () => {
        if (searchValue == "") {
            getContract()
        } else {
            let res = await GetSearchCustomer(searchValue)
            if (res) {
                console.log(res)
                setContract(res);
            } else {
                console.log(res)
            }

        }

    }

    const handleDialogDeleteOpen = (ID: string) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID("")
        }, 500)
    }

    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()}/${newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1}/${newDate.getFullYear() < 10 ? "000" + newDate.getFullYear() : newDate.getFullYear() < 100 ? "00" + newDate.getFullYear() : newDate.getFullYear() < 1000 ? "0" + newDate.getFullYear() : newDate.getFullYear()}`
    }


    return (

        <Layout >

            <div
                className="flex flex-row justify-between w-full"
                // style={{ backgroundColor: "#f8f9fa" }}
            >

                <CardHeader
                    sx={{
                        "& .MuiCardHeader-title": {
                            color: "#161616",
                            fontSize: "32px",
                            lineHeight: "48px",
                        },
                    }}
                    className="font-bold"
                    title="Contract Admin Management"
                ></CardHeader>
            </div>
            <CardContent  sx={{ p: 0, px: 2, py: 2, flexGrow: 1 }}>
                <div>
                    <div style={{ marginTop: "10px" }}>
                        <Grid container spacing={1} >
                            <Grid item xs={3} className="flex justify-center flex-col-reverse">
                                <TextField
                                    style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderRadius: "10px 0px 0px 10px",
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px 0px 0px 10px",
                                        },
                                    }}
                                    size="small"
                                    label="Search Name, Email"
                                    variant="outlined"
                                    value={searchValue || ""}
                                    onChange={handleInputChange}

                                />
                            </Grid>
                            <Grid className="flex justify-center flex-col-reverse" sx={{ paddingTop: "4px" }} xs={0.5}>
                                <Button
                                    variant="contained"
                                    onClick={() => { handleSearch() }}
                                    style={{
                                        borderRadius: "0px 10px 10px 0px",
                                        height: "100%",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    sx={{
                                        "&.MuiButton-root": {
                                            backgroundColor: "#0082EF",
                                        },
                                    }}
                                >
                                    <SearchIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={7}>

                            </Grid>
                            {/* <Grid
                                className="flex justify-center flex-col-reverse"
                                item
                                xs={1.5}
                                // sx={{ pr: 2 }}
                                style={{ alignItems: "end" }}
                            >

                                <Button
                                    variant="contained"
                                    href="/customer/createProfile"
                                    style={{ borderRadius: "24px" }}
                                >
                                    + Create
                                </Button>
                            </Grid> */}

                        </Grid>
                    </div>

                    <Divider sx={{ borderColor: "transparent" }} />

                    <div style={{ height: `calc(150vh - 300px)`, width: "100%", marginTop: "10px" }}>
                        <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="20%"> Company Name </TableCell>
                                        <TableCell align="center" width="10%"> ProjectName </TableCell> {/* Adjusted width */}
                                        <TableCell align="center" width="10%"> ContractStart </TableCell>
                                        <TableCell align="center" width="10%"> ContractStop </TableCell> {/* Adjusted width */}
                                        <TableCell align="center" width="10%"> VendorPO </TableCell>
                                        <TableCell align="center" width="10%"> CustomerPO </TableCell> {/* Adjusted width */}
                                        <TableCell align="center" width="5%"> IncidentPerYear </TableCell>
                                        <TableCell align="center" width="5%"> IncidentPerContract </TableCell>
                                        <TableCell align="center" width="10%"> Sla </TableCell>
                                        <TableCell align="center" width="5%"> View </TableCell>
                                        <TableCell align="center" width="5%"> Device </TableCell>
                                        <TableCell align="center" width="5%"> Ticket </TableCell>
                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {contract.map((item: ContractInterface) => (
                                        <TableRow
                                            key={item.Id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                        >


                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="left">{item.Customer?.CompanyName || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.ProjectName}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{convertDateFormat(item.ContractStart!) || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{convertDateFormat(item.ContractStop!) || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.VendorPO || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.CustomerPO || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.IncidentPerYear || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.IncidentPerContract || "-"}</TableCell>
                                            <TableCell onClick={() => window.location.href = `/customer/contract/update/${item.Id}`} align="center">{item.Sla?.Name || "-"}</TableCell>
                                            <TableCell>
                                                {
                                                    <Link href={"/customer/contract/update/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 60, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            view
                                                        </Button>
                                                    </Link>

                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    <Link href={"/customer/contract/device/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='primary'
                                                            sx={{
                                                                maxWidth: 60, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            device
                                                        </Button>
                                                    </Link>

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    <Link href={"/customer/contract/ticket/create/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='info'
                                                            sx={{
                                                                maxWidth: 60, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            ticket
                                                        </Button>
                                                    </Link>

                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {

                                                    <Button
                                                        variant='outlined'
                                                        color='error'
                                                        onClick={() => { handleDialogDeleteOpen(item.Id) }}
                                                        sx={{
                                                            maxWidth: 60, // Set the maximum width of the button
                                                            maxHeight: 60, // Set the maximum height of the button
                                                        }}

                                                    >
                                                        Delete
                                                    </Button>
                                                }

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                        </Box>
                        <Dialog
                            open={openDelete}
                            onClose={handleDialogDeleteclose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{
                                style: {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`คุณต้องการลบสัญญษโปรเจค ${contract.filter((emp) => (emp.Id === deleteID)).at(0)?.ProjectName} จริงหรือไม่`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                                <Button onClick={handleDelete} className="bg-red" autoFocus>
                                    ยืนยัน
                                </Button>
                            </DialogActions>

                        </Dialog>
                    </div>

                </div>
            </CardContent>

        </Layout>
    )

}

export default Contract;