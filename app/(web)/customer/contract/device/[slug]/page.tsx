"use client";

import Layout from "@/app/(web)/layout";
import { ContractCreateInterface, CreateDeviceInterface, DeviceInterface } from "@/interfaces/IContract";
import { Alert, Button, CardHeader, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, SelectChangeEvent, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CreateDevice, DeleteDeviceById, getContractByID, ListDeviceByContractId, UpdateDevice } from "@/services/Contract/ContractServices";

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
    const [createDevice, setCreateDevice] = React.useState<Partial<CreateDeviceInterface>>({})
    const [listDevices, setListDevices] = React.useState<Partial<DeviceInterface>[]>([])
    const [startLisenceDate, setStartLisenceDate] = React.useState<Dayjs>(dayjs())
    const [expiredLisenceDate, setExpiredLisenceDate] = React.useState<Dayjs>(dayjs())
    const [updateState, setUpdateState] = React.useState<boolean>(false)


    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Device;

        const { value } = event.target;

        setCreateDevice({ ...createDevice, [id]: value });
    };

    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof contract;
        setCreateDevice({
            ...createDevice,
            [name]: event.target.value,
        });
    };

    const getDeviceByContractId = async (id: string) => {
        let res = await ListDeviceByContractId(id);
        if (res && res.Status !== "error") {
            console.log(res)
            setListDevices(res)
        }
    }
    React.useEffect(() => {
        getDeviceByContractId(slug);
        getContract(slug);
        // console.log(customer)

    }, [])
    const getContract = async (id: string | undefined) => {
        let res = await getContractByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setContract(res)
            console.log("contract")
            console.log(contract)
        }
    }
    const handleDiscard = () => {
        setCreateDevice({});
        setStartLisenceDate(dayjs());
        setExpiredLisenceDate(dayjs());
    }

    const handleUpdate = (device: DeviceInterface) => {
        setUpdateState(true)
        setCreateDevice({
            ...createDevice,
            Id: device.Id,
            Brand: device.Brand,
            Model: device.Model,
            Serial: device.Serial,
            License: device.License,
            Sku: device.Sku,
        });
        setStartLisenceDate(dayjs(device.StartLicenseDate));
        setExpiredLisenceDate(dayjs(device.ExpiredLicenseDate));
    }
    const submit = async () => {
        console.log(createDevice)
        try {
            createDevice.ExpiredLicenseDate = expiredLisenceDate.format("YYYY-MM-DD").toString()
            createDevice.StartLicenseDate = startLisenceDate.format("YYYY-MM-DD").toString()
            createDevice.ContractID = slug

            if (updateState) {
                let res = await UpdateDevice(createDevice)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                    setUpdateState(false)
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }
                setUpdateState(false)

            } else {
                let res = await CreateDevice(createDevice)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }

            }
            getDeviceByContractId(slug);


            // setTimeout(() => {
            //     router.push("/contract")
            // }, 3000)


        } catch (error) {
            console.error("Error submitting contract data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }
    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()}/${newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1}/${newDate.getFullYear() < 10 ? "000" + newDate.getFullYear() : newDate.getFullYear() < 100 ? "00" + newDate.getFullYear() : newDate.getFullYear() < 1000 ? "0" + newDate.getFullYear() : newDate.getFullYear()}`
    }
    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteDeviceById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getDeviceByContractId(slug);
        setOpenDelete(false)

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
                                                id="Brand"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={createDevice.Brand || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Model</p>

                                            <TextField
                                                id="Model"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={createDevice.Model || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Serial</p>

                                            <TextField
                                                id="Serial"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={createDevice.Serial || ""}
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
                                                id="License"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={createDevice.License || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>SKU</p>

                                            <TextField
                                                id="Sku"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={createDevice.Sku || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Start Lisence Date</p>

                                            <DatePicker
                                                value={startLisenceDate}
                                                views={["day", "month", "year"]}
                                                onChange={(newValue: any) => {
                                                    if (newValue !== null && newValue != undefined) {
                                                        setStartLisenceDate(newValue)
                                                    }
                                                }}
                                                format="DD/MM/YYYY"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3.5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Expire Lisence Date</p>

                                            <DatePicker
                                                value={expiredLisenceDate}
                                                views={["day", "month", "year"]}
                                                onChange={(newValue: any) => {
                                                    if (newValue !== null && newValue != undefined) {
                                                        setExpiredLisenceDate(newValue)
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
                                                value={contract.ProjectName || ""}
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
                                                value={contract.CustomerPO || ""}
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
                                <div style={{ marginLeft: "6.5%" }} className="flex justify-between px-5 py-3">
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        onClick={handleDiscard}
                                        sx={{
                                            maxWidth: 75, // Set the maximum width of the button
                                            maxHeight: 60, // Set the maximum height of the button
                                        }}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        style={{ marginRight: "6.5%" }}
                                        variant="outlined"
                                        color="info"
                                        onClick={submit}
                                        sx={{
                                            maxWidth: 75, // Set the maximum width of the button
                                            maxHeight: 60, // Set the maximum height of the button
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                            <Divider sx={{ borderColor: "border-gray-600" }} />
                            <div className="flex-1 p-3 justify-center">
                                <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" width="12%"> Brand </TableCell>
                                                <TableCell align="center" width="10%"> Model </TableCell>
                                                <TableCell align="center" width="5%"> Serial </TableCell>
                                                <TableCell align="center" width="10%"> License </TableCell>
                                                <TableCell align="center" width="5%"> Sku </TableCell>
                                                <TableCell align="center" width="12%"> Start License Date </TableCell>
                                                <TableCell align="center" width="10%"> Expired License Date </TableCell>
                                                <TableCell align="center" width="10%"> Customer Po </TableCell>
                                                <TableCell align="center" width="5%"> Edit </TableCell>
                                                <TableCell align="center" width="5%"> Delete </TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {listDevices.map((item: DeviceInterface) => (
                                                <TableRow
                                                    key={item.Id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{item.Brand}</TableCell>
                                                    <TableCell align="center">{item.Model}</TableCell>
                                                    <TableCell align="center">{item.Serial}</TableCell>
                                                    <TableCell align="center">{item.License}</TableCell>
                                                    <TableCell align="center">{item.Sku}</TableCell>
                                                    <TableCell align="center">{convertDateFormat(item.StartLicenseDate!)}</TableCell>
                                                    <TableCell align="center">{convertDateFormat(item.ExpiredLicenseDate!)}</TableCell>
                                                    <TableCell align="center">{item.Contract?.CustomerPO}</TableCell>
                                                    <TableCell>
                                                        {
                                                            <Button
                                                                variant='outlined'
                                                                color='warning'
                                                                sx={{
                                                                    maxWidth: 75, // Set the maximum width of the button
                                                                    maxHeight: 60, // Set the maximum height of the button
                                                                }}
                                                                onClick={() => handleUpdate(item)}
                                                            >
                                                                Update
                                                            </Button>
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {

                                                            <Button
                                                                variant='outlined'
                                                                color='error'
                                                                onClick={() => { handleDialogDeleteOpen(item.Id!) }}
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
                                        {`คุณต้องการลบข้อมูลอุปกรณ์ serail: ${listDevices.filter((emp) => (emp.Id === deleteID)).at(0)?.Serial} จริงหรือไม่`}
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
                    </div>
                </ThemeProvider>
            </Layout>
        </LocalizationProvider >
    );
};
