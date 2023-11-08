import { Box, Alert, AlertTitle } from '@mui/material';

const Confirmation = () => {
    return (
        <Box m="90px auto" width="80%" height="50vh">
                <Alert severity='success'>
                <AlertTitle>Succès</AlertTitle>
                Vous avez passé commande avec succès - {" "}
                <strong>Félicitations pour votre achat</strong>
                </Alert>
        </Box>
    );
};

export default Confirmation;