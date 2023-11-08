import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { shades } from "../../theme";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_oKhSR5nslBRnBZpjO6KuzZeX"
)

const initialValues = {
    adresseDeFacturation: {
        prénoms: "",
        nomDeFamille: "",
        pays: "",
        rue: "",
        lieuDit: "",
        ville: "",
        région: "",
        codePostal: "",
    },
    isSameAddress: true,
    adresseDeLivraison: {
        prénoms: "",
        nomDeFamille: "",
        pays: "",
        rue: "",
        lieuDit: "",
        ville: "",
        région: "",
        codePostal: "",
    },
    Email: "",
    NumeroDeTelephone: ""
}

const checkoutSchema = [
    yup.object().shape({
        adresseDeFacturation: yup.object().shape({
            prénoms: yup.string().required("required"),
            nomDeFamille: yup.string().required("required"),
            pays: yup.string().required("required"),
            rue: yup.string().required("required"),
            lieuDit: yup.string(),
            ville: yup.string().required("required"),
            région: yup.string().required("required"),
            codePostal: yup.string().required("required"),
        }),
        isSameAddress: yup.boolean(),
        adresseDeLivraison: yup.object().when('isSameAddress', {
            is: false,
            then: yup.object({
                prénoms:yup.string().required("required"),
                nomDeFamille:yup.string().required("required"),
                pays:yup.string().required("required"),
                rue:yup.string().required("required"),
                lieuDit: yup.string(),
                ville: yup.string().required("required"),
                région: yup.string().required("required"),
                codePostal: yup.string().required("required")
            })
        }),
    }),
    yup.object().shape({
        Email: yup.string().required("required"),
        NumeroDeTelephone: yup.string().required("required"),
    })
];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        console.log("Le formulaire a été soumis.");
        console.log("activeStep avant mise à jour : ", activeStep);
        setActiveStep(activeStep + 1);
        console.log("activeStep après mise à jour : ", activeStep);

        // copies the billing address on to shipping address
        if (isFirstStep && values.adresseDeLivraison.isSameAddress) {
            actions.setFieldValue("adresseDeLivraison", {
                ...values.adresseDeFacturation,
                isSameAddress: true,
            })
        }

        if (isSecondStep) {
            console.log("Condition isSecondStep est vraie.");
            makePayment(values);
        }

        actions.setTouched({});
    };

    async function makePayment(values) {
        console.log("La fonction makePayment a été appelée.");
        const stripe = await stripePromise;
        const requestBody = {
            userName: [values.adresseDeFacturation.prénoms, values.adresseDeFacturation.nomDeFamille].join(" "),
            email: values.Email,
            products: cart.map(({ id, count }) => ({
                id,
                count,
            }))
        };

        const response = await fetch("http://localhost:1337/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        });
        const session = await response.json();
        console.log(session.id)
        await stripe.redirectToCheckout({
            sessionId: session.id
        });
    };
    
    return <Box width="80%" m="100px auto">
        <Stepper activeStep={activeStep} sx={{ m:"20px 0"}}>
            <Step>
                <StepLabel>Facturation</StepLabel>
            </Step>
            <Step>
                <StepLabel>Paiement</StepLabel>
            </Step>
        </Stepper>
        <Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema[activeStep]}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>
                        {isFirstStep && (
                            <Shipping 
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        )}
                        {isSecondStep && (
                            <Payment
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        )}
                        <Box display="flex" justifyContent="space-between" gap="50px">
                            {isSecondStep && (
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: shades.primary[200],
                                        boxShadow: "none",
                                        color: "white",
                                        borderRadius: 0,
                                        padding: "15px 40px",
                                    }}
                                    onClick={() => setActiveStep(activeStep - 1)}
                                >Précédent</Button>
                            )}
                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: shades.primary[400],
                                        boxShadow: "none",
                                        color: "white",
                                        borderRadius: 0,
                                        padding: "15px 40px",
                                    }}
                                    onClick={() => {
                                        console.log("Bouton Suivant cliqué");
                                        if (isFirstStep) {
                                            // Si c'est la première étape, soumettez le formulaire.
                                            setActiveStep(activeStep + 1);
                                            handleSubmit();
                                        } else {
                                            // Sinon, appelez makePayment.
                                            makePayment(values);
                                        }
                                    }}
                                >
                                    {isFirstStep ? "Suivant" : "Passer la commande" }
                                </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    </Box>;
}

export default Checkout;