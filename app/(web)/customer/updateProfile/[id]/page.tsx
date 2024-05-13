"use client"
import {
    Alert, Box, Button, FormControl, Paper, Select, Snackbar, TextField, Typography, createTheme,
    OutlinedInput,
    ThemeProvider,
} from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'

import { CustomerInterface } from '@/interfaces/ICustomer'
import { UpdateCustomer, getCustomerByID } from '@/services/api/Customer/CustomerService'
import { useParams, useRouter } from 'next/navigation'
import { Router } from 'next/router'
//{params: {id},}:{params:{id: string}}
export default function CustomerUpdate({params: {id},}:{params:{id: string}}) {

    let router = useRouter()
    // List all Database
    // Get Customer by id
    const [customer, setCustomer] = React.useState<Partial<CustomerInterface>>({})
    const getCustomer = async (id: string | undefined) => {
        let res = await getCustomerByID(id)
        if (res) {
            setCustomer(res)
        }
    }


    React.useEffect(() => {
        getCustomer(id[0]);
    }, []);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(customer)

        let res = await UpdateCustomer(customer)
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
        // console.log(res)
        if (res.status) {
            setTimeout(() => {
                router.push("/customer")
            }, 3000)
        }
    }
    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CustomerUpdate;

        const { value } = event.target;

        setCustomer({ ...customer, [id]: value });
    };

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof customer;

        setCustomer({
            ...customer,
            [name]: event.target.value
        })
    }

    let theme = createTheme({ // button theme
        palette: {
            primary: {
                main: "#009688",
            },
            secondary: {
                main: "#009688"
            },
            text: {
                primary: "#008573",
                secondary: "#000000"
            }
        },
    });

    const handleClose = (
        event?: React.SyntheticEvent | Event,

        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        แก้ไขข้อมูลสำเร็จ
                    </Alert>
                </Snackbar>

                <Snackbar
                    id="error"
                    open={error}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>

                <div style={{ height: `calc(130vh - 300px)`, width: "100%", marginTop: "10px" }}>
                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Company Name</p>

                                <TextField
                                    id="CompanyName"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.CompanyName || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Contact Person</p>
                                <TextField
                                    id="ContactPerson"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.ContactPerson || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Phone</p>

                                <TextField
                                    id="ContactNumber"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.ContactNumber || ""}
                                    onChange={handleInputChange}

                                    style={{ color: "black" }}
                                    inputProps={{ maxLength: 10 }}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Email</p>
                                <TextField
                                    id="ContactEmail"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.ContactEmail || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>LineID</p>

                                <TextField
                                    id="ContactLineID"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.ContactLineID || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>GoogleMapURL</p>
                                <OutlinedInput
                                    id="GoogleMapURL"
                                    type="string"
                                    size="medium"
                                    value={customer.GoogleMapURL || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={10}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Address</p>

                                <TextField
                                    id="Address"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.Address || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                    multiline
                                    rows={3}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>TagGroupCustomer</p>

                                <TextField
                                    id="TagGroupCustomer"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.TagGroupCustomer || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <p style={{ color: "black" }}>Tax Number</p>

                                <TextField
                                    id="TaxNumber"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={customer.TaxNumber || ""}
                                    onChange={handleInputChange}
                                    style={{ color: "black" }}
                                    inputProps={{ maxLength: 13 }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                        <Grid item xs={4}>
                            <a href={"/customer"}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        "&.MuiButton-root": {
                                            backgroundColor: "#0082EF",
                                        },
                                    }}
                                >
                                    Back
                                </Button>
                            </a>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                style={{ float: "right" }}
                                onClick={submit}
                                variant="contained"
                                color="primary"
                                sx={{
                                    "&.MuiButton-root": {
                                        backgroundColor: "#0082EF",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ThemeProvider>
    );
}