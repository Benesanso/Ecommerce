import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue, 
}) => {
    return (
        <Box m="30px auto">
            {/* FACTURATION FORM */}
            <Box>
                <Typography sx={{ mb: "15px" }} fontSize="18px">
                    INFORMATIONS DE FACTURATION
                </Typography>
                <AddressForm 
                    types="adresseDeFacturation"
                    values={values.adresseDeFacturation}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>

            <Box mb="20px">
                <FormControlLabel
                    label="Adresse de livraison"
                    control={
                        <Checkbox 
                            defaultChecked
                            value={values.adresseDeLivraison.isSameAddress}
                            onChange={() =>
                            setFieldValue(
                                "adresseDeLivraison.isSameAddress",
                                !values.adresseDeLivraison.isSameAddress
                            )
                            }
                        />
                    }
                />
            </Box>

            {/* FORMULAIRE D'EXPEDITION */}
            {!values.adresseDeLivraison.isSameAddress && (
                <Box>
                    <Typography sx={{ mb: "15px" }} fontSize="18px">
                        INFORMATIONS DE LIVRAISON
                    </Typography>
                    <AddressForm 
                        types="adresseDeLivraison"
                        values={values.adresseDeLivraison}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Shipping;
