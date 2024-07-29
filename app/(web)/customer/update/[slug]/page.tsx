"use client"
import { Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, SelectChangeEvent, Select, Tabs, Tab, Box } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'

import { CustomerGroupInterface, CustomerInterface } from '@/interfaces/ICustomer'
import { UpdateCustomer, GetCustomerByID, ListCustomerGroups } from '@/services/Customer/CustomerServices'
import { useRouter } from 'next/navigation'
import Layout from '@/app/(web)/layout'
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function CustomerUpdate({ params: { slug } }: { params: { slug: string } }) {

    let router = useRouter()
    // List all Database
    // Get Customer by id
    const [customer, setCustomer] = React.useState<Partial<CustomerInterface>>({})
    const getCustomer = async (id: string | undefined) => {
        let res = await GetCustomerByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setCustomer(res)
            console.log("customer")
            console.log(customer)
        }
    }

    const [customerGroup, setCustomerGroup] = React.useState<CustomerGroupInterface[]>([]);
    const getCustomerGroup = async () => {
        try {
            const res = await ListCustomerGroups();
            if (res && res.Status !== "error") {
                setCustomerGroup(res)
            } else {
                console.log(res)
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดดึงข้อมูล Customer Group");
                setError(true);
            }
        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Group");
            setError(true);
        }
    }

    React.useEffect(() => {
        console.log("slug");
        console.log(slug);
        getCustomerGroup();
        getCustomer(slug);
    }, []);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(customer)
        try {
            customer.CustomerGroupId = convertType(customer.CustomerGroupId)
            let res = await UpdateCustomer(customer)
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }

            setTimeout(() => {
                router.push("/customer")
            }, 3000)


        } catch (error) {
            console.error("Error submitting customer data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };


    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CustomerUpdate;

        const { value } = event.target;

        setCustomer({ ...customer, [id]: value });
    };
    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof customer;
        setCustomer({
            ...customer,
            [name]: event.target.value,
        });
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
                main: "#0082EF",
            },
            secondary: {
                main: "#0082EF"
            },
            text: {
                primary: "#000000",
                secondary: "#000000"
            },
            background:{ default: "#f8f9fa" }
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

    const [tabValue, setTabValue] = React.useState(1);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Layout>
            <ThemeProvider theme={theme} >

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
                        title="Customer Management"
                    ></CardHeader>
                </div>
                <TabContext value={String(tabValue)}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Customer Profile" value="1" />
                            <Tab label="Address" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
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
                            <div style={{backgroundColor: "#f8f9fa" , height: `calc(130vh - 300px)`, width: "100%", marginTop: "10px" }}>
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
                                            <p style={{ color: "black" }}>Description</p>
                                            <OutlinedInput
                                                id="Description"
                                                type="string"
                                                size="medium"
                                                value={customer.Description || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
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
                                    <Grid item xs={5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Customer Group</p>
                                            <Select
                                                native
                                                value={customer.CustomerGroupId ?? 0}
                                                onChange={handleChangeNumber}
                                                inputProps={{
                                                    name: "CustomerGroupId",
                                                }}
                                            >
                                                <option value={0} key={0}>
                                                    กรุณา เลือก customer group
                                                </option>
                                                {customerGroup.map((item: CustomerGroupInterface) => (
                                                    <option value={item.Id}>{item.Name}</option>
                                                ))}
                                            </Select>
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
                                            UPdate
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>

            </ThemeProvider>
        </Layout>

    );
}


