"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import Layout from "../layout";


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        backgroundColor: "#f8f9fa",
    },
});

const Employee = ({ children }: any) => {
    const classes = useStyles();
    const router = useRouter();

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
                    title="Employee Admin Management"
                ></CardHeader>
            </div>
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
                    //   value={searchValue}
                    //   onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Grid>
                <Grid className="flex justify-center flex-col-reverse" sx={{ paddingTop: "4px" }} xs={0.5}>
                    <Button
                        variant="contained"
                        //   onClick={handleSearch}
                        style={{
                            borderRadius: "0px 10px 10px 0px",
                            height: "100%",
                            width:"100%",
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
                    style={{ alignItems: "end"}}
                >

                    <Button
                        variant="contained"
                        href="/employee/create"
                        style={{ borderRadius: "24px" }}
                    >
                        + Create
                    </Button>
                </Grid>

            </Grid>

            <Divider sx={{ borderColor: "transparent" }} />
            <Container maxWidth="xl" style={{ background: "white" }}>
                {/* <Box sx={{ bgcolor: '#f8f9fa', height: '100vh' }} /> */}


            </Container>
            
        </Layout>
    )

}

export default Employee;