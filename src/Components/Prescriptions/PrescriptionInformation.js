import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import 'jspdf-autotable';
import ReactToPrint from 'react-to-print';
import html2pdf from "html2pdf.js";
import './PrintPrescription.css';
import { useSelector } from 'react-redux';

const PrescriptionDocuments = () => {

    const printableComponentRef = useRef(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const [prescriptionDetails, setPrescriptionDetails] = useState([]);

    const fetchPrescriptionDetails = async () => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:8000/prescription/${id}`);
                if (response) {
                    setPrescriptionDetails(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchPrescriptionDetails();
    }, [])

    const handleUpdateOption = () => {
        if (id) {
            navigate(`/addPrescription/${id}`);
        }
    }

    const formatDate = (timeString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        };
        return new Date(timeString).toLocaleString(undefined, options);
    };

    const generatePDF = () => {
        // Get the HTML content of the table
        const element = document.querySelector("#printable-component");

        // Hide the header in the webpage
        const headerElement = document.querySelector("#Header");
        headerElement.classList.add("hide-header");

        // Generate the PDF using html2pdf library
        const opt = {
            margin: [6, 10, 10, 6], // Set margins (top, left, bottom, right)
            filename: "document.pdf",
            image: { type: "jpeg", quality: 0.98 }, // Image options
            html2canvas: { scale: 2 }, // Scale factor for html2canvas
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // PDF options
            css: "./PrintPrescription.css", // Pass the imported CSS file
        };
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                // Show the header again after generating the PDF
                headerElement.classList.remove("hide-header");
            });
    };

    if (id) {
        return (
            <>
                <Options>
                    <Button onClick={handleUpdateOption}
                    >Update Prescription</Button>
                    <ReactToPrint
                        trigger={() => (
                            <Button style={{ backgroundColor: "pink" }}>Print Prescription</Button>
                        )}
                        header={() => { return <h3>Eye Care</h3> }}
                        content={() => printableComponentRef.current}
                        contentStyle={{
                            margin: "20px", // Add equal margins to all sides
                            // or specify different margins for each side
                            marginTop: "20px",
                            marginBottom: "20px",
                            marginLeft: "30px",
                            marginRight: "30px",
                            backgroundColor: "red",
                        }}
                    />
                    <Button style={{ backgroundColor: "lightgray" }} onClick={generatePDF}>Generate Pdf</Button>
                </Options>
                <Box>
                    <PaitentInfo>
                        <div id="printable-component" className="printable-component" style={{ margin: "20px" }} ref={printableComponentRef}>
                            <div id="Header" className="Header">
                                <div style={{ width: "700px" }}>
                                    <h3>EyeCare</h3>
                                </div>
                                <div style={{ width: "auto", fontSize: "15px" }}>
                                    106,1ST FLOOR, HAVELI COMPLEX, SECTOR-11, Gandhinagar - 382011, Gujarat, India
                                    <br />
                                    mobile no : 7777872872/ 9316910106
                                    <br />
                                    Email id : eyecarenxg@gmail.com
                                    <br />
                                    Gst no : 24AOQPG5457D1ZX
                                </div>
                            </div>
                            <InfoBox>
                                Paitent Details
                            </InfoBox>
                            {
                                prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                    <div key={`${values.id}-${index}`}>
                                        {Object.entries(values.paitentInfo).map(([key, value]) => {
                                            if (value !== "" && value !== null && value !== undefined) {
                                                if (key === "paitentsBirthDate") {
                                                    value = formatDate(value);
                                                }
                                                return (
                                                    <React.Fragment key={key}>
                                                        <Details>
                                                            <div>{key}</div>
                                                            <div>{value}</div>
                                                        </Details>
                                                        <hr />
                                                    </React.Fragment>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )) : "No data available"
                            }
                            <div id="PrintHeader" className="PrintHeader">
                                <InfoBox>
                                    Lens Numbers Details
                                </InfoBox>
                                <table style={{ textAlign: "center", margin: "3rem 0rem" }}>
                                    <thead>
                                        <tr>
                                            <td rowSpan={2}>Informations</td>
                                            <td colSpan={5}>Right Eye</td>
                                            <td colSpan={5}>Leftt Eye</td>
                                        </tr>
                                        <tr>
                                            <td>R-SPH</td>
                                            <td>R-CYL</td>
                                            <td>R-AXIS</td>
                                            <td>R-PD</td>
                                            <td>R-VA</td>
                                            <td>L-SPH</td>
                                            <td>L-CYL</td>
                                            <td>L-AXIS</td>
                                            <td>L-PD</td>
                                            <td>L-VA</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Distance Vision (DV)</td>
                                            {
                                                prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                    <React.Fragment key={`${values.id}-${index}`}>
                                                        {
                                                            values && values.LenseNumbers &&
                                                            Object.entries(values.LenseNumbers.DistanceVision.right).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment key={key}>
                                                                        <td>{value}</td>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )) : <td>Problem while getting data Please try again later</td>
                                            }{
                                                prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                    <React.Fragment key={`${values.id}-${index}`}>
                                                        {
                                                            values && values.LenseNumbers &&
                                                            Object.entries(values.LenseNumbers.DistanceVision.left).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment key={key}>
                                                                        <td>{value}</td>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )) : <td>Problem while getting data Please try again later</td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Near Vision (NV)</td>
                                            {
                                                prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                    <React.Fragment key={`${values.id}-${index}`}>
                                                        {
                                                            values && values.LenseNumbers &&
                                                            Object.entries(values.LenseNumbers.NearVision.right).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment key={key}>
                                                                        <td>{value}</td>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )) : <td>Problem while getting data Please try again later</td>
                                            }
                                            {
                                                prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                    <React.Fragment key={`${values.id}-${index}`}>
                                                        {
                                                            values && values.LenseNumbers &&
                                                            Object.entries(values.LenseNumbers.NearVision.left).map(([key, value]) => {
                                                                return (
                                                                    <React.Fragment key={key}>
                                                                        <td>{value}</td>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )) : <td>Problem while getting data Please try again later</td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Addition (AD)</td>
                                            {prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                <React.Fragment key={`${values.id}-${index}`}>
                                                    {
                                                        values && values.LenseNumbers &&
                                                        Object.entries(values.LenseNumbers.Addition.right).map(([key, value]) => {
                                                            return (
                                                                <React.Fragment key={key}>
                                                                    <td>{value}</td>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    }
                                                </React.Fragment>
                                            )) : <td>Problem while getting data Please try again later</td>}
                                            <td colSpan={4} style={{ borderColor: "white" }}>
                                            </td>
                                            {prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                <React.Fragment key={`${values.id}-${index}`}>
                                                    {
                                                        values && values.LenseNumbers &&
                                                        Object.entries(values.LenseNumbers.Addition.left).map(([key, value]) => {
                                                            return (
                                                                <React.Fragment key={key}>
                                                                    <td>{value}</td>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    }
                                                </React.Fragment>
                                            )) : <td>Problem while getting data Please try again later</td>}
                                        </tr>
                                        <tr>
                                            <td>IPD (Total PD)</td>
                                            {prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                                <React.Fragment key={`${values.id}-${index}`}>
                                                    {
                                                        values && values.LenseNumbers &&
                                                        Object.entries(values.LenseNumbers.IPD.right).map(([key, value]) => {
                                                            return (
                                                                <React.Fragment key={key}>
                                                                    <td>{value}</td>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    }
                                                </React.Fragment>
                                            )) : <td>Problem while getting data Please try again later</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <InfoBox>
                            Prescription Details
                        </InfoBox>
                        {
                            prescriptionDetails ? prescriptionDetails.map((values, index) => (
                                <div key={`${values.id}-${index}`}>
                                    {Object.entries(values.prescriptionInfo).map(([key, value]) => {
                                        if (value !== "" && value !== null && value !== undefined) {
                                            return (
                                                <React.Fragment key={key}>
                                                    <Details>
                                                        <div>{key}</div>
                                                        <div>{value}</div>
                                                    </Details>
                                                    <hr />
                                                </React.Fragment>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )) : "No data available"
                        }
                        <InfoBox>
                            Customer Details
                        </InfoBox>
                        {
                            prescriptionDetails ? (
                                prescriptionDetails.map((values, index) => (
                                    <div key={`${values.id}-${index}`}>
                                        {Object.entries(values.customerInfo).map(([key, value]) => {
                                            if (value !== "" && value !== null && value !== undefined) {
                                                return (
                                                    <React.Fragment key={key}>
                                                        <Details>
                                                            <div>{key}</div>
                                                            <div>{value}</div>
                                                        </Details>
                                                        <hr />
                                                    </React.Fragment>
                                                );
                                            }
                                            return null; // Return null for empty or blank values
                                        })}
                                    </div>
                                ))
                            ) : (
                                "No data available"
                            )
                        }
                    </PaitentInfo>
                </Box>
            </>
        )
    }
    else {
        return (
            <>
                <h4 style={{ color: "red" }}>There is not id to Fetch Prescription</h4>
            </>
        )
    }
};

const Box = styled.div`
    width:60%;
    border:1px solid pink;
    height:auto;
    margin:3rem auto;
    padding:1rem 2rem;
`;

const Options = styled.div`
    display:flex;
    justify-content:center;
    justify-content: space-evenly;
`;
const Button = styled.button`
    border:none;
    padding:1rem;
    background-color: lightblue;
    border-radius:10px;
`;

const InfoBox = styled.div`
    text-align: center;
    background-color: #ff9d5c;
    width:200px;
    padding:5px;
    border-radius: 10px;
    height:auto;
    margin:2rem 0rem;
`;

const PaitentInfo = styled.div`
    table{
        text-align: center;
        margin:3rem 0rem;
    }
    td,th{
        border: 1px solid pink;
        padding: 8px;
        input{
            width:40px;
        }
    }
`;

const Details = styled.div`
    margin:1rem;
    display:flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 18px;
`;

export default PrescriptionDocuments;
