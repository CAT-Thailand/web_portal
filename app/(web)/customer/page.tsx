"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../layout";
import { CustomerInterface } from "@/interfaces/ICustomer";

import React from "react";

import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";
import { DeleteCustomerById, ListCustomers, getSearchCustomer } from "@/services/Customer/CustomerService";
import Link from "next/link";


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


const Customer = ({ children }: any) => {
    const classes = useStyles();
    const { settings, saveSettings } = useSettings()
    let theme = createTheme(themeOptions(settings, "dark"))
    //Customer State
    const [customer, setCustomer] = React.useState<CustomerInterface[]>([])
    const getCustomer = async () => {
        let res = await ListCustomers();
        if (res) {
            setCustomer(res)
            console.log(res)
            console.log(customer)
        }
    }
    React.useEffect(() => {
        getCustomer();
        console.log(customer)

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
        getCustomer();
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
            getCustomer()
        } else {
            let res = await getSearchCustomer(searchValue)
            if (res) {
                console.log(res)
            } else {
                console.log(res)
            }
            setCustomer(res);

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
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()} น`
    }


    return (

        <Layout>

            <div
                className="flex flex-row justify-between w-full"
                style={{ backgroundColor: "#f8f9fa" }}
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
                    title="Customer Admin Management"
                ></CardHeader>
            </div>
            <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, py: 2, flexGrow: 1 }}>
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
                            <Grid
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
                            </Grid>

                        </Grid>
                    </div>

                    <Divider sx={{ borderColor: "transparent" }} />

                    <div style={{ height: `calc(150vh - 300px)`, width: "100%", marginTop: "10px" }}>
                        <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="15%"> Name </TableCell>
                                        <TableCell align="center" width="12%"> ContactPerson </TableCell>
                                        {/* <TableCell align="center"> Phone </TableCell> */}
                                        {/* <TableCell align="center"> Email </TableCell> */}
                                        {/* <TableCell align="center"> LineID </TableCell> */}
                                        <TableCell align="center" width="28%"> MapURL </TableCell> {/* Adjusted width */}
                                        {/* <TableCell align="center" style={{ width: "50" }}> Address </TableCell> Adjusted width */}
                                        {/* <TableCell align="center"> Description </TableCell> */}
                                        <TableCell align="center" width="10%"> TagGroupCustomer </TableCell>
                                        <TableCell align="center" width="10%"> TaxNumber </TableCell>
                                        <TableCell align="center" width="5%"> contract </TableCell>
                                        <TableCell align="center" width="5%"> View </TableCell>
                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {customer.map((item: CustomerInterface) => (
                                        <TableRow
                                            key={item.Id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{item.CompanyName || "-"}</TableCell>
                                            <TableCell align="center">{item.ContactPerson || "-"}</TableCell>
                                            {/* <TableCell align="center">{item.ContactNumber || "-"}</TableCell> */}
                                            {/* <TableCell align="center">{item.ContactEmail || "-"}</TableCell>
                                            <TableCell align="center">{item.ContactLineID || "-"}</TableCell> */}
                                            <TableCell align="center">{item.GoogleMapURL ? (
                                                <a href={item.GoogleMapURL} target="_blank" rel="noopener noreferrer">
                                                    {item.GoogleMapURL}
                                                </a>
                                            ) : (
                                                "-"
                                            )}</TableCell>
                                            {/* <TableCell style={{ width: "400px" }} align="center">{item.Address || "-"}</TableCell> */}
                                            {/* <TableCell align="center">{item.Description || "-"}</TableCell> */}
                                            <TableCell align="center">{item.TagGroupCustomer || "-"}</TableCell>
                                            <TableCell align="center">{item.TaxNumber || "-"}</TableCell>
                                            <TableCell>
                                                {
                                                    <Link href={"/customer/contract/create/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 75, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            create-contact
                                                        </Button>
                                                    </Link>

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    <Link href={"/customer/update/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 75, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            View
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
                                                            maxWidth: 75, // Set the maximum width of the button
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
                                {`คุณต้องการลบข้อมูลของลูกค้า ${customer.filter((emp) => (emp.Id === deleteID)).at(0)?.CompanyName} จริงหรือไม่`}
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

export default Customer;