import * as Yup from 'yup';

const phoneRegExp = /^[7-9]\d{9}$/
const gstRegExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; 

export const PrescriptionSchema = Yup.object({

    customerInfo:Yup.object().shape({
        phoneNo: Yup.string().min(10,"Phone number must contains 10 numbers").max(12,"Phone number must contains less then 12 numbers").matches(phoneRegExp, 'Phone number is not valid').required("Please Enter Phone Number"),
        customerName: Yup.string().min(3).max(25).required("Please Enter Customer Name"),
        gstNumber: Yup.string()
            .matches(gstRegExp, 'Invalid GST number'),
        companyName: Yup.string().min(3).max(25),
        line1:Yup.string(),
        line2:Yup.string(),
        customerNotes:Yup.string(),
    }),
    paitentInfo: Yup.object().shape({
        paitentName: Yup.string().min(3, "Paitent's name must be at least 3 characters").max(25),
        paitentPhoneNo: Yup.string().min(10, "Phone number must contain 10 numbers").max(12, "Phone number must contain less than 10 numbers").matches(phoneRegExp, 'Paitent Phone number is not valid'),
        paitentEmail: Yup.string().email("Email must be a valid Email"),
        paitentsBirthDate: Yup.date().nullable(),
        paitentsAge: Yup.number().nullable(),
        gender: Yup.string().oneOf(['male', 'female']),
      }),
      prescriptionInfo: Yup.object().shape({
        cosmeticOption: Yup.string().oneOf(['Eyeware', 'Contact Lenses']),
        doctorName: Yup.string().min(3).max(25),
        prescriptionTime: Yup.string().nullable(),
        LensType: Yup.string().oneOf(['Eyeware Prescription', 'Contact Lens Prescription', 'Transpose Prescription']),
        cardDescription: Yup.string(),
      }),
    LenseNumbers: Yup.object().test(
        'atLeastOneInputRequired',
        'At least one input field is required',
        (value) => {
            const hasInput = Object.values(value).some((subObject) => {
                return Object.values(subObject).some((subValue) => {
                    return Object.values(subValue).some((inputValue) => inputValue !== '');
                });
            });
            return hasInput;
        }
    ),
    LenseUseType:Yup.array().min(1, 'Please select at least one hobby'),
    prescriptionNotes:Yup.string(),
})