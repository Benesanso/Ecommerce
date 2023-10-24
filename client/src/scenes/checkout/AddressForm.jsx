import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // these functions allow for better code readability
    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    const formattedHelper = (field) => 
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));
    
    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}
        >
            <TextField 
                fullWidth
                type="text"
                label="Prénoms"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prénoms}
                name={formattedName("prénoms")}
                error={formattedError("prénoms")}
                helperText={formattedHelper("prénoms")}
                sx={{ gridColumn: "span 2"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Nom de famille"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nomDeFamille}
                name={formattedName("nomDeFamille")}
                error={formattedError("nomDeFamille")}
                helperText={formattedHelper("nomDeFamille")}
                sx={{ gridColumn: "span 2"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Pays"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pays}
                name={formattedName("pays")}
                error={formattedError("pays")}
                helperText={formattedHelper("pays")}
                sx={{ gridColumn: "span 4"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rue}
                name={formattedName("rue")}
                error={formattedError("rue")}
                helperText={formattedHelper("rue")}
                sx={{ gridColumn: "span 2"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Lieu Dit (optionnel)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lieuDit}
                name={formattedName("lieuDit")}
                error={formattedError("lieuDit")}
                helperText={formattedHelper("lieuDit")}
                sx={{ gridColumn: "span 2"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Ville"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ville}
                name={formattedName("ville")}
                error={formattedError("ville")}
                helperText={formattedHelper("ville")}
                sx={{ gridColumn: "span 2"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Région"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.region}
                name={formattedName("region")}
                error={formattedError("region")}
                helperText={formattedHelper("region")}
                sx={{ gridColumn: "1fr"}}
            />
            <TextField 
                fullWidth
                type="text"
                label="Code Postal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.codePostal}
                name={formattedName("codePostal")}
                error={formattedError("codePostal")}
                helperText={formattedHelper("codePostal")}
                sx={{ gridColumn: "1fr"}}
            />
        </Box>
    )
};

export default AddressForm; 