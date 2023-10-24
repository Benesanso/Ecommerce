import { Box, Typography, TextField } from "@mui/material";

const Payment = (values, touched, errors, handleBlur, handleChange,) => {
    return (
        <Box m="30px 0">
            {/* CONTACT INFO */}
            <Box>
                <Typography sx={{ mb: "15px"}} fontSize="18px">
                    Contact Info
                </Typography>
                <TextField 
                    fullWidth
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                />
                <TextField 
                    fullWidth
                    type="text"
                    label="Numero De Téléphone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numeroDeTelephone}
                    name="numeroDeTelephone"
                    error={!!touched.numeroDeTelephone && !!errors.numeroDeTelephone}
                    helperText={touched.numeroDeTelephone && errors.numeroDeTelephone}
                    sx={{ gridColumn: "span 4" }}
                />
            </Box>
        </Box>
    )
}

export default Payment;