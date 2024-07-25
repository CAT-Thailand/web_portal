"use client";

import Layout from "@/app/(web)/layout";
import { ContractCreateInterface } from "@/interfaces/IContract";
import { Alert, Button, CardHeader, createTheme, Divider, FormControl, Grid, SelectChangeEvent, Snackbar, TextField, ThemeProvider } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Device({ params: { slug } }: { params: { slug: string } }) {
    let theme = createTheme({ // button theme
        palette: {
            primary: {
                main: "#0082EF",
            },
            secondary: {
                main: "#0082EF"
            },
            text: {
                primary: "#000000",
                secondary: "#000000"
            }
        },
    });
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
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

    const [contract, setContract] = React.useState<Partial<ContractCreateInterface>>({
        Cost: 0.0,
        ServiceCatalogID: 0,
        SlaID: 0
    })
    const [contractStart, setContractStart] = React.useState<Dayjs>(dayjs())
    const [contractStop, setContractStop] = React.useState<Dayjs>(dayjs())
    const [noticeDate, setNoticeDate] = React.useState<Dayjs>(dayjs())

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Device;

        const { value } = event.target;

        setContract({ ...contract, [id]: value });
    };

    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof contract;
        setContract({
            ...contract,
            [name]: event.target.value,
        });
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>


            <Layout>
                <ThemeProvider theme={theme}>
                    <div className="flex flex-col w-full" >
                        <CardHeader
                            sx={{
                                "& .MuiCardHeader-title": {
                                    color: "#161616",
                                    fontSize: "32px",
                                    lineHeight: "48px",
                                },
                            }}
                            className="font-bold"
                            title={`Device management for contract `}
                        />
                        <Snackbar
                            id="success"
                            open={success}
                            autoHideDuration={4000}
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
                            autoHideDuration={4000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="error">
                                {message}
                            </Alert>
                        </Snackbar>
                        <div className="flex flex-col h-screen">
                            <div className=" justify-center ">
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "5%" }}>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Brand</p>

                                            <TextField
                                                id="CustomerPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={contract.CustomerPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Model</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Serial</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>



                                </Grid>
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "5%" }}>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>License</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>SKU</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Start</p>

                                            <DatePicker
                                                value={contractStop}
                                                views={["day", "month", "year"]}
                                                onChange={(newValue: any) => {
                                                    if (newValue !== null && newValue != undefined) {
                                                        setContractStop(newValue)
                                                    }
                                                }}
                                                format="DD/MM/YYYY"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Expire</p>

                                            <DatePicker
                                                value={contractStop}
                                                views={["day", "month", "year"]}
                                                onChange={(newValue: any) => {
                                                    if (newValue !== null && newValue != undefined) {
                                                        setContractStop(newValue)
                                                    }
                                                }}
                                                format="DD/MM/YYYY"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid className=" items-center" item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Project Name</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                disabled
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                                InputProps={{
                                                    style: {
                                                        backgroundColor: "#e8e8e8", // Dark background color
                                                        color: "#000000", // Light text color
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid className=" items-center" item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Customer Po</p>

                                            <TextField
                                                id="VendorPO"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                disabled
                                                value={contract.VendorPO || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                                InputProps={{
                                                    style: {
                                                        backgroundColor: "#e8e8e8", // Dark background color
                                                        color: "#000000", // Light text color
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>


                            </div>
                            <Divider sx={{ borderColor: "border-gray-600" }} />
                            <div className="flex-1 p-3 flex justify-center items-center">
                                <h2>2</h2>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </Layout>
        </LocalizationProvider>
    );
};
