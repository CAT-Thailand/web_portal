"use client"
import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { FormControl, InputAdornment, OutlinedInput, IconButton, Container, Paper, Grid, Box, Typography, Divider, Snackbar, CardHeader, ThemeProvider } from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
    createTheme,
    SelectChangeEvent,
} from "@mui/material";

import { CustomerCreateInterface } from "@/interfaces/ICustomer";
import { CreateCustomer } from "@/services/api/Customer/CustomerService";
import { useRouter } from "next/navigation";
import Layout from "../../layout";
function CustomerCreate() {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [customer, setCustomer] = React.useState<Partial<CustomerCreateInterface>>({});
    const [message, setAlertMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    //check max min lenght
    const [error, setError] = React.useState(false);

    //Customer Create
    const router = useRouter()
    //submit
    const submit = async () => {
        console.log("submit 1")
        try {
            console.log(customer);
            const res = await CreateCustomer(customer);
            console.log(res);
    
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
                setTimeout(() => {
                    router.push("/customer");
                }, 3000);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }
        } catch (error) {
            console.error("Error submitting customer data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    };

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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CustomerCreate;

        const { value } = event.target;

        setCustomer({ ...customer, [id]: value });
    };
    let theme = createTheme({ // button theme
        palette: {
            primary: {
                main: "#0082EF",
            },
            secondary: {
                main: "#0082EF"
            },
            text: {
                primary: "##000000",
                secondary: "#000000"
            }
        },
    });

    return (
        <Layout>
            <ThemeProvider theme={theme}>

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
                        title="Create Customer Management"
                    ></CardHeader>
                </div>

                <Container maxWidth="lg" >
                    <Snackbar
                        id="success"
                        open={success}
                        autoHideDuration={8000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="success">
                            บันทึกข้อมูลสำเร็จ
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        id="error"
                        open={error}
                        autoHideDuration={8000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                            {/* บันทึกข้อมูลไม่สำเร็จ */}
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
        </Layout>

    );
}
export default CustomerCreate;