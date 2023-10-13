import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 'react-datepicker/dist/react-datepicker.css';
import './CustomeDatePicker.css';
import { showSuccessNotification, showErrorNotification } from "../../SweetAlert/SweetAlert";
import { useFormik, Form, Field, ErrorMessage } from 'formik';
import { PrescriptionSchema } from "./PrescriptionSchemas";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const PrescriptionForm = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [PrescriptionTime, setPrescriptionTime] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            FetchPrescriptionData();
        }

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute (60,000 milliseconds)

        return () => {
            clearInterval(timer); // Clear the interval on component unmount
        };
    }, []);

    useEffect(() => {
        // Update prescriptionTime whenever currentTime changes
        setPrescriptionTime(
            currentTime.toLocaleDateString('en-US', {
                year: 'numeric',
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })
        );
    }, [currentTime]);



    //-- initial values for formik --//
    const initialValues = {
        customerInfo: {
            phoneNo: '',
            customerName: '',
            gstNumber: '',
            companyName: '',
            line1: '',
            line2: '',
            customerNotes: '',
        },
        paitentInfo: {
            paitentName: "",
            paitentPhoneNo: "",
            paitentEmail: "",
            paitentsBirthDate: "",
            paitentsAge: 0,
            gender: "",
        },
        prescriptionInfo: {
            cosmeticOption: "",
            doctorName: "",
            prescriptionTime: PrescriptionTime,
            LensType: "",
            cardDescription: "",
        },
        LenseNumbers: {
            DistanceVision: {
                right: {
                    RSPH: '',
                    RCYL: '',
                    RAXIS: '',
                    RPD: '',
                    RVA: '',
                },
                left: {
                    LSPH: '',
                    LCYL: '',
                    LAXIS: '',
                    LPD: '',
                    LVA: '',
                }
            },
            NearVision: {
                right: {
                    RSPH: '',
                    RCYL: '',
                    RAXIS: '',
                    RPD: '',
                    RVA: '',
                },
                left: {
                    LSPH: '',
                    LCYL: '',
                    LAXIS: '',
                    LPD: '',
                    LVA: '',
                }
            },
            Addition: {
                right: {
                    RSPH: '',
                },
                left: {
                    LSPH: '',
                }
            },
            IPD: {
                right: {
                    RSPH: '',
                }
            }
        },
        LenseUseType: '',
        prescriptionNotes: '',
    }


    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, resetForm, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: PrescriptionSchema,
        onSubmit: async (values) => {
            values.prescriptionInfo.prescriptionTime = PrescriptionTime;
            console.log(values);
            if (id) {
                try {
                    const response = await axios.put(`http://localhost:8000/prescription/${id}`, values);
                    if (response && response.status === 200) {
                        showSuccessNotification("Prescription Data Updated Successfully");
                        FetchPrescriptionData();
                    }
                    else {
                        console.log(response);
                        showErrorNotification("Somethign Went Wrong Please Try Again Later")
                    }
                }
                catch (error) {
                    showErrorNotification("Somethign Went Wrong Please Try Again Later");
                    console.log(error);
                }
            }
            if (!id) {
                setFieldValue("prescriptionInfo.cardDescription","my description");
                console.log(values);
                try {
                    const response = await axios.post(`http://localhost:8000/prescription`, values);
                    if (response.status === 201) {
                        showSuccessNotification("Prescription Addedd Successfully");
                        resetForm()
                    }
                    else {
                        console.log(response);
                        showErrorNotification("Something Went Wrong Please Try Again Later")
                    }
                }
                catch (error) {
                    console.log(error)
                    showErrorNotification("Something Went Wrong Please Try Again Later")
                }
            }
        },
    })

    const FetchPrescriptionData = async () => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:8000/prescription/${id}`);
                const data = response.data; // Assuming the fetched data is in the format you expect
                const parsedData = {};

                Object.keys(data[0]).forEach((key) => {
                    if (key === 'prescriptionInfo' && data[0][key].prescriptionTime) {
                        parsedData[key] = {
                            ...data[0][key],
                            prescriptionTime: data[0][key].prescriptionTime === '' ? '' : new Date(data[0][key].prescriptionTime)
                        };
                    } else {
                        parsedData[key] = data[0][key];
                    }
                });

                setValues(parsedData);
                console.log(parsedData);
            } catch (error) {
                console.log(error);
                showErrorNotification("Can't Fetch Prescriptions Data from Id or Invalid Id Please try again late");
                navigate("/displayPrescription");
            }
        }
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const CheckboxOptions = [
        { id: 1, label: 'Constant Use' },
        { id: 2, label: 'Reading Wear' },
        { id: 3, label: 'Distance Wear' },
        { id: 4, label: 'Single Vision' },
        { id: 5, label: 'Progressive' },
        { id: 6, label: 'Bifocal' },
        { id: 7, label: 'Trifocal' },
    ];

    const DistanceVisionInputFields = [
        {
            id: 'RSPH',
            name: 'LenseNumbers.DistanceVision.right.RSPH',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.right.RSPH
        },
        {
            id: 'RCYL',
            name: 'LenseNumbers.DistanceVision.right.RCYL',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.right.RCYL
        },
        {
            id: 'RAXIS',
            name: 'LenseNumbers.DistanceVision.right.RAXIS',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.right.RAXIS
        },
        {
            id: 'RPD',
            name: 'LenseNumbers.DistanceVision.right.RPD',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.right.RPD
        },
        {
            id: 'RVA',
            name: 'LenseNumbers.DistanceVision.right.RVA',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.right.RVA
        },
        {
            id: 'LSPH',
            name: 'LenseNumbers.DistanceVision.left.LSPH',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.left.LSPH
        },
        {
            id: 'LCYL',
            name: 'LenseNumbers.DistanceVision.left.LCYL',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.left.LCYL
        },
        {
            id: 'LAXIS',
            name: 'LenseNumbers.DistanceVision.left.LAXIS',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.left.LAXIS
        },
        {
            id: 'LPD',
            name: 'LenseNumbers.DistanceVision.left.LPD',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.left.LPD
        },
        {
            id: 'LVA',
            name: 'LenseNumbers.DistanceVision.left.LVA',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.DistanceVision.left.LVA
        },
        // Add more objects for the remaining input fields
    ];

    const NearVisionInputFields = [
        {
            id: 'RSPH',
            name: 'LenseNumbers.NearVision.right.RSPH',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.right.RSPH
        },
        {
            id: 'RCYL',
            name: 'LenseNumbers.NearVision.right.RCYL',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.right.RCYL
        },
        {
            id: 'RAXIS',
            name: 'LenseNumbers.NearVision.right.RAXIS',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.right.RAXIS
        },
        {
            id: 'RPD',
            name: 'LenseNumbers.NearVision.right.RPD',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.right.RPD
        },
        {
            id: 'RVA',
            name: 'LenseNumbers.NearVision.right.RVA',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.right.RVA
        },
        {
            id: 'LSPH',
            name: 'LenseNumbers.NearVision.left.LSPH',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.left.LSPH
        },
        {
            id: 'LCYL',
            name: 'LenseNumbers.NearVision.left.LCYL',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.left.LCYL
        },
        {
            id: 'LAXIS',
            name: 'LenseNumbers.NearVision.left.LAXIS',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.left.LAXIS
        },
        {
            id: 'LPD',
            name: 'LenseNumbers.NearVision.left.LPD',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.left.LPD
        },
        {
            id: 'LVA',
            name: 'LenseNumbers.NearVision.left.LVA',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.NearVision.left.LVA
        },
        // Add more objects for the remaining input fields
    ];

    const IPD = [
        {
            id: 'RSPH',
            name: 'LenseNumbers.IPD.right.RSPH',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.LenseNumbers.IPD.right.RSPH
        },
    ]

    const handleDateChange = (BirthDate) => {
        let today = new Date();
        let birthDate = new Date(BirthDate);  // create a date object directly from `dob1` argument
        let age_now = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        if (age_now) {
            setFieldValue("paitentInfo.paitentsAge", age_now) // Manually invoke handleChange with the field name
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <PersonalInfo>
                <InfoBox>
                    Doctor Details
                </InfoBox>
                <StaffInfo>
                    <div>
                        <label>Mobile No :</label>
                        <SmallInput type="tel" placeholder="Enter Your Phone Number" id="phoneNo" name="customerInfo.phoneNo" value={values.customerInfo.phoneNo} onChange={handleChange} onBlur={handleBlur} />
                        {errors.customerInfo && errors.customerInfo.phoneNo && touched.customerInfo && touched.customerInfo.phoneNo ? <p className="form-error">{errors.customerInfo.phoneNo}</p> : null}
                    </div>
                    <div>
                        <label>Full Name : </label>
                        <SmallInput type="text" placeholder="Enter Your Full Name" id="customerName" name="customerInfo.customerName" value={values.customerInfo.customerName} onChange={handleChange} onBlur={handleBlur} />
                        {errors.customerInfo && errors.customerInfo.customerName && touched.customerInfo && touched.customerInfo.customerName ? <p className="form-error">{errors.customerInfo.customerName}</p> : null}
                    </div>
                </StaffInfo>
                <CustomerInfo>
                    <InfoBox>
                        Customer Information
                    </InfoBox>
                    <CompanyInfo>
                        <div>
                            <label>GST No :</label>
                            <SmallInput type="text" placeholder="Enter GST Number" min={15} id="gstNumber" name="customerInfo.gstNumber" value={values.customerInfo.gstNumber} onChange={handleChange} onBlur={handleBlur} />
                            {errors.customerInfo && errors.customerInfo.gstNumber && touched.customerInfo && touched.customerInfo.gstNumber ? <p className="form-error">{errors.customerInfo.gstNumber}</p> : null}
                        </div>
                        <div>
                            <label>Company Name : </label>
                            <SmallInput type="text" placeholder="Enter Company Name" id="companyName" name="customerInfo.companyName" value={values.customerInfo.companyName} onChange={handleChange} onBlur={handleBlur} />
                            {errors.customerInfo && errors.customerInfo.companyName && touched.customerInfo && touched.customerInfo.companyName ? <p className="form-error">{errors.customerInfo.companyName}</p> : null}
                        </div>
                    </CompanyInfo>
                    <CompanyComments>
                        <div>
                            <label>Line 1 : </label>
                            <BigInput type="text" placeholder="Enter Line 1" id="line1" name="customerInfo.line1" value={values.customerInfo.line1} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div>
                            <label>Line 2 : </label>
                            <BigInput type="text" placeholder="Enter Line 2" id="line2" name="customerInfo.line2" value={values.customerInfo.line2} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div>
                            <label>Customer Notes : </label>
                            <NoteInput type="text" placeholder="Enter Customer's Note" id="customerNotes" value={values.customerInfo.customerNotes} onChange={handleChange} onBlur={handleBlur} name="customerInfo.customerNotes" />
                        </div>
                    </CompanyComments>
                </CustomerInfo>
                <InfoBox>
                    Paitent Information
                </InfoBox>
                <PersonalDetails>
                    <StaffInfo>
                        <div>
                            <label>Paitent Name :</label>
                            <SmallInput type="text" placeholder="Enter Paitent Name" id="paitentInfo.paitentName" name="paitentInfo.paitentName" value={values.paitentInfo.paitentName} onChange={handleChange} onBlur={handleBlur} />
                            {errors.paitentInfo && errors.paitentInfo.paitentName && touched.paitentInfo && touched.paitentInfo.paitentName ? <p className="form-error">{errors.paitentInfo.paitentName}</p> : null}
                        </div>
                        <div>
                            <label>Phone Number : </label>
                            <SmallInput type="tel" placeholder="Enter Your Phone Number" id="paitentPhoneNo" name="paitentInfo.paitentPhoneNo" value={values.paitentInfo.paitentPhoneNo} onChange={handleChange} onBlur={handleBlur} min={9} />
                            {errors.paitentInfo && errors.paitentInfo.paitentPhoneNo && touched.paitentInfo && touched.paitentInfo.paitentPhoneNo ? <p className="form-error">{errors.paitentInfo.paitentPhoneNo}</p> : null}
                        </div>
                    </StaffInfo>
                    <div style={{ textAlign: "center" }}>
                        <label>Paitent Email :</label>
                        <BigInput style={{ width: '780px' }} type="email" placeholder="Enter Paitent Email" id="paitentsEmail" name="paitentInfo.paitentEmail" value={values.paitentInfo.paitentEmail} onChange={handleChange} onBlur={handleBlur} />
                        {errors.paitentInfo && errors.paitentInfo.paitentEmail && touched.paitentInfo && touched.paitentInfo.paitentEmail ? <p className="form-error">{errors.paitentInfo.paitentEmail}</p> : null}
                    </div>
                    <StaffInfo>
                        <div>
                            <label>Patient Date Of Birth: </label>
                            <SmallInput
                                type="date"
                                id="paitentsBirthDate"
                                name="paitentInfo.paitentsBirthDate"
                                value={values.paitentInfo.paitentsBirthDate ? format(new Date(values.paitentInfo.paitentsBirthDate), 'yyyy-MM-dd') : ''}
                                style={{ width: '200px' }}
                                max={currentDate}
                                onChange={handleChange}
                                onBlur={e => handleDateChange(e.target.value)}
                            />
                            {errors.paitentInfo && errors.paitentInfo.paitentsBirthDate && touched.paitentInfo && touched.paitentInfo.paitentsBirthDate ? (
                                <p className="form-error">{errors.paitentInfo.paitentsBirthDate}</p>
                            ) : null}
                        </div>
                        <div>
                            <label>Paitent Age</label>
                            <SmallInput type="text" placeholder="paitentsAge" value={values.paitentInfo.paitentsAge} onBlur={handleBlur} onChange={handleChange} name="paitentInfo.paitentsAge" style={{ width: "200px" }} readOnly />
                        </div>
                    </StaffInfo>
                    <StaffInfo>
                        <div>
                            <RadioGroup>
                                <label>Gender:</label>
                                <RadioButton
                                    type="radio"
                                    id="male"
                                    name="paitentInfo.gender"
                                    value="male"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.paitentInfo?.gender === "male"} // Set the checked prop based on the value in `values`
                                />
                                <label htmlFor="male">Male</label>
                                <RadioButton
                                    type="radio"
                                    id="female"
                                    name="paitentInfo.gender"
                                    value="female"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.paitentInfo?.gender === "female"} // Set the checked prop based on the value in `values`
                                />
                                {errors.paitentInfo?.gender && touched.paitentInfo?.gender && (
                                    <p className="form-error">{errors.paitentInfo.gender}</p>
                                )}
                                <label htmlFor="female">Female</label>
                            </RadioGroup>
                        </div>
                        <div>
                            <RadioGroup>
                                <label>Prescription Type : </label>
                                <RadioButton
                                    type="radio"
                                    id="eyeliner"
                                    name="prescriptionInfo.cosmeticOption"
                                    value="Eyeware"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.prescriptionInfo?.cosmeticOption === "Eyeware"}
                                />
                                <Label htmlFor="Eye Wear">Eyeware</Label>
                                <RadioButton
                                    type="radio"
                                    id="contactLenses"
                                    name="prescriptionInfo.cosmeticOption"
                                    value="Contact Lenses"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.prescriptionInfo?.cosmeticOption === "Contact Lenses"}
                                />
                                <Label htmlFor="contactLenses">Contact Lenses</Label>
                                {errors.prescriptionInfo && errors.prescriptionInfo.cosmeticOption && touched.prescriptionInfo && touched.prescriptionInfo.cosmeticOption ? <p className="form-error">{errors.prescriptionInfo.cosmeticOption}</p> : null}
                            </RadioGroup>
                        </div>
                    </StaffInfo>
                    <CompanyComments>
                        <div>
                            <label>Card Description : </label>
                            <BigInput
                                type="text"
                                placeholder="Enter Card Description"
                                id="cardDescription"
                                name="prescriptionInfo.cardDescription"
                                value={values.prescriptionInfo.cardDescription || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.prescriptionInfo &&
                                errors.prescriptionInfo.cardDescription &&
                                touched.prescriptionInfo &&
                                touched.prescriptionInfo.cardDescription ? (
                                <p className="form-error">{errors.prescriptionInfo.cardDescription}</p>
                            ) : null}

                        </div>
                    </CompanyComments>
                </PersonalDetails>
            </PersonalInfo>
            <PersonalInfo>
                <InfoBox>
                    Prescription Information
                </InfoBox>
                <StaffInfo>
                    <div>
                        <label>Presc. Time: </label>
                        <SmallInput
                            id="prescriptionTime"
                            name="prescriptionInfo.prescriptionTime"
                            type="text"
                            value={PrescriptionTime}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled
                        />
                        {errors.prescriptionInfo && errors.prescriptionInfo.prescriptionTime && touched.prescriptionInfo && touched.prescriptionInfo.prescriptionTime ? (
                            <p className="form-error">{errors.prescriptionInfo.prescriptionTime}</p>
                        ) : null}
                    </div>
                    <div>
                        <label>Doctor Name : </label>
                        <SmallInput type="text" placeholder="Enter Doctor Name" onChange={handleChange}
                            onBlur={handleBlur} value={values.prescriptionInfo.doctorName} id="doctorName" name="prescriptionInfo.doctorName" />
                        {errors.prescriptionInfo && errors.prescriptionInfo.doctorName && touched.prescriptionInfo && touched.prescriptionInfo.doctorName ? <p className="form-error">{errors.prescriptionInfo.doctorName}</p> : null}
                    </div>
                </StaffInfo>
                <RadioGroup>
                    <LenceInfo>
                        <RadioGroup>
                            <Button type="button">
                                Eyeware Prescription
                                <RadioButton
                                    type="radio"
                                    id="eyeliner"
                                    name="prescriptionInfo.LensType"
                                    value="Eyeware Prescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.prescriptionInfo?.LensType === "Eyeware Prescription"}
                                />
                            </Button>
                            <Button type="button">
                                Contact Lens Prescription
                                <RadioButton
                                    type="radio"
                                    id="eyeliner"
                                    name="prescriptionInfo.LensType"
                                    value="Contact Lens Prescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.prescriptionInfo?.LensType === "Contact Lens Prescription"}
                                />
                            </Button>
                            <Button type="button">
                                Transpose Prescription
                                <RadioButton
                                    type="radio"
                                    id="eyeliner"
                                    name="prescriptionInfo.LensType"
                                    value="Transpose Prescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.prescriptionInfo?.LensType === "Transpose Prescription"}
                                />
                            </Button>
                            {errors.prescriptionInfo && errors.prescriptionInfo.LensType && touched.prescriptionInfo && touched.prescriptionInfo.LensType ? <p className="form-error">{errors.prescriptionInfo.LensType}</p> : null}
                        </RadioGroup>
                    </LenceInfo>
                </RadioGroup>
                <TableInput>
                    <table>
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
                                {DistanceVisionInputFields.map((input, index) => (
                                    <td key={index}>
                                        <input
                                            type="text"
                                            id={input.id}
                                            name={input.name}
                                            onBlur={input.onBlur}
                                            onChange={input.onChange}
                                            value={input.value}
                                            style={{backgroundColor:"#7c7c80"}}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Near Vision (NV)</td>
                                {NearVisionInputFields.map((input, index) => (
                                    <td key={index}>
                                        <input
                                            type="text"
                                            id={input.id}
                                            name={input.name}
                                            onBlur={input.onBlur}
                                            onChange={input.onChange}
                                            value={input.value}
                                            style={{backgroundColor:"#7c7c80"}}

                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Addition (AD)</td>
                                <td>
                                    <input type="text" style={{backgroundColor:"#7c7c80"}} id="LSPH" name="LenseNumbers.Addition.right.RSPH" onBlur={handleBlur} onChange={handleChange} value={values.LenseNumbers.Addition.right.RSPH} />
                                </td>
                                <td colSpan={4} style={{ borderColor: "white" }}>
                                </td>
                                <td>
                                    <input type="text" style={{backgroundColor:"#7c7c80"}} id="LSPH" name="LenseNumbers.Addition.left.LSPH" onBlur={handleBlur} onChange={handleChange} value={values.LenseNumbers.Addition.left.LSPH} />
                                </td>
                            </tr>
                            <tr>
                                <td>IPD (Total PD)</td>
                                {IPD.map((input, index) => (
                                    <td key={index}>
                                        <input
                                            type="text"
                                            id={input.id}
                                            name={input.name}
                                            onBlur={input.onBlur}
                                            onChange={input.onChange}
                                            value={input.value}
                                            style={{backgroundColor:"#7c7c80"}}
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </TableInput>
                <CheckBoxInputs>
                    <label>
                        Lens Type :
                    </label>
                    {CheckboxOptions.map((option) => (
                        <div key={option.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.label}
                                    checked={values.LenseUseType.includes(option.label)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="LenseUseType"
                                    name="LenseUseType"
                                />
                                {option.label}
                            </label>
                        </div>
                    ))}
                </CheckBoxInputs>
                {errors.LenseUseType && touched.LenseUseType && touched.LenseUseType ? <p className="form-error">{errors.LenseUseType}</p> : null}
                <CompanyComments>
                    <div>
                        <label>Prescription Note : </label>
                        <NoteInput type="text" name="prescriptionNotes" onChange={handleChange} onBlur={handleBlur} id="prescriptionNotes" value={values.prescriptionNotes} placeholder="Enter Customer's Note" />
                    </div>
                </CompanyComments>
                <SubmitButton>
                    <button type="submit">Submit</button>
                </SubmitButton>
            </PersonalInfo>
        </Container>
    )
}

const SubmitButton = styled.div`
    button{
        outline:none;
        border:none;
        padding:17px;
        background-color: blue;
        color:white;
        border-radius: 10px;
    } 
`;
const CheckBoxInputs = styled.div`
    display:flex;
    justify-content: space-around;
    margin:30px;
    backgroundColor:#535354
`;

const LenceInfo = styled.div`
    margin:20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TableInput = styled.div`
    display: flex;
    justify-content: center;
    backgroundColor:#7c7c80;
    td,th{
        text-align: center;
        border: 1px solid pink;
        padding: 8px;
        input{
            width:50px;
        }
    }
`;
const Container = styled.form`
    display:flex;
    justify-content: center;
    flex-direction: column;
    label{
        display: inline;
    }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const PersonalInfo = styled.div`
    align-self: center;
    margin:auto;
    margin:30px 0px;
    padding:20px;
    width:70%;
    height: auto;
    border-radius: 10px;
    border:0.2px solid #fa9c1b;
`;

const StaffInfo = styled.div`
    margin-top: 20px;
    display:flex;
    justify-content: space-around;
    
`;

const SmallInput = styled.input`
background:#7c7c80;
    height: 15px;
    outline:none;
    border: none;
    border: 0.1px solid #1260cc;
    width:300px;
    padding:12px 20px;
    border-radius: 10px;
    margin:18px 5px;
    color:white;
`;

const CustomerInfo = styled.div`
    text-align: start;
`;
const InfoBox = styled.div`
    background-color: #020c24;
    width:200px;
    text-align: center;
    padding:5px;
    border-radius: 10px;
`;

const CompanyInfo = styled(StaffInfo)`

`;

const BigInput = styled(SmallInput)`
    width:85%;
`;

const CompanyComments = styled.div`
    margin-top:30px;
    text-align: center;
`

const NoteInput = styled(BigInput)`
    width:75%;
    height:100px;
`;

const PersonalDetails = styled.div`
    
`;

const Button = styled.button`
    order:none;
    padding:10px;
    border:none;
    width:auto;
    height:60px;
    background-color: pink;
    margin:0px 20px;
    border-radius: 10px;
`;

export default PrescriptionForm;