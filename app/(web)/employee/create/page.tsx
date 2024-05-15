"use client"
import React, { useEffect } from "react";


import Button from "@mui/material/Button";

import { FormControl, InputAdornment, OutlinedInput, IconButton, Container, Paper, Grid, Box, Typography, Divider, Snackbar, CardHeader, ThemeProvider, Select } from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
    createTheme,
    SelectChangeEvent,
} from "@mui/material";


import { EmployeeCreateInterface, EmployeeInterface } from "@/interfaces/IEmployee";
import { CreateEmployee, ListEmployees } from "@/services/Employee/EmployeeServices";
import { useRouter } from "next/navigation";
import Layout from "../../layout";
import { DevisionInterface } from "@/interfaces/IDevision";
import { RoleInterface } from "@/interfaces/IRole";
import { ListRoles } from "@/services/Role/RoleService";
import { ListDevisions } from "@/services/Devision/DevisionService";
import TextField from "@mui/material/TextField";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EmployeeCreate() {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [employee, setEmployee] = React.useState<Partial<EmployeeCreateInterface>>({});
    const [devision, setDevision] = React.useState<DevisionInterface[]>([]);
    const [supervisor, setSupervisor] = React.useState<EmployeeInterface[]>([]);
    const [role, setRole] = React.useState<RoleInterface[]>([])
    const [message, setAlertMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    //check max min lenght
    const [error, setError] = React.useState(false);

    //Employee Create
    const router = useRouter()
    //submit
    const submit = async () => {
        console.log("submit 1")
        try {
            console.log(employee);
            const res = await CreateEmployee(employee);
            console.log(res);

            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
                setTimeout(() => {
                    router.push("/employee");
                }, 3000);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }
        } catch (error) {
            console.error("Error submitting employee data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    };

    const getSupervisor = async () => {

        let res = await ListEmployees();
        console.log(res);
        if (res) {
            setSupervisor(res);
        }
    }
    // // get Role
    const getRole = async () => {
        let res = await ListRoles();
        console.log(res);
        if (res) {
            setRole(res);
        }
    }
    // get Department
    const getDevision = async () => {
        //let id =0;
        let res = await ListDevisions();
        console.log(res);
        if (res) {
            setDevision(res);
        }
    }


    React.useEffect(() => {
        getSupervisor();
        getDevision();
        getRole();
    }, []);

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
        const id = event.target.id as keyof typeof EmployeeCreate;

        const { value } = event.target;

        setEmployee({ ...employee, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof employee;
        setEmployee({
            ...employee,
            [name]: event.target.value,
        });
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
                primary: "#000000",
                secondary: "#000000"
            }
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            title="Create Employee Management"
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
                                        <p style={{ color: "black" }}>Name</p>

                                        <TextField
                                            id="Name"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Name || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}

                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Phone</p>
                                        <TextField
                                            id="Phone"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Phone || ""}
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
                                            id="LineID"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.LineID || ""}
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
                                            id="Email"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Email || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>ProbationDate</p>
                                        <DatePicker
                                            value={employee.ProbationDate}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null) {
                                                    setEmployee({
                                                        ...employee,
                                                        ProbationDate: newValue,
                                                    });
                                                }
                                            }}
                                            format="DDMMYYYY"
                                        />

                                        {/* 
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={employee.ProbationDate}
                                            onChange={(newValue: Date | null, context?: PickerChangeHandlerContext<DateValidationError>) => {
                                                if (newValue !== null) {
                                                    setEmployee({
                                                        ...employee,
                                                        ProbationDate: newValue,
                                                    });
                                                }
                                            }}
                                            renderInput={(params: string) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider> */}


                                        {/* <TextField
                                        id="ProbationDate"
                                        variant="outlined"
                                        type="string"
                                        size="medium"
                                        value={employee.ProbationDate || ""}
                                        onChange={handleInputChange}
                                        style={{ color: "black" }}
                                    /> */}

                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>TerminationDate</p>
                                        <OutlinedInput
                                            id="TerminationDate"
                                            type="string"
                                            size="medium"
                                            value={employee.TerminationDate || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p>Role</p>
                                        <Select
                                            native
                                            value={employee.RoleID}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "RoleID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของแลป
                                            </option>
                                            {role.map((item: RoleInterface) => (
                                                <option value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p>Devision</p>
                                        <Select
                                            native
                                            value={employee.DevisiontID}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "DevisiontID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของแลป
                                            </option>
                                            {devision.map((item: DevisionInterface) => (
                                                <option value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p>Supervisor</p>
                                        <Select
                                            native
                                            value={employee.SupervisorID}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "SupervisorID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของแลป
                                            </option>
                                            {supervisor.map((item: EmployeeInterface) => (
                                                <option value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={4}>
                                    <a href={"/employee"}>
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
        </LocalizationProvider>

    );
}
export default EmployeeCreate;