import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
    const { 
        palette: { neutral },
    } = useTheme();
    return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
        <Box
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap="30px"
            columnGap="clamp(20px, 30px, 40px)"
        >
            <Box width="clamp(20%, 30%, 40%)">
                <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    mb="30px" 
                    color={shades.secondary[500]}
                >
                    ECOMMERCE
                </Typography>
                <div>
                    Suspendisse luctus, neque vel imperdiet bibendum, tellus nibh imperdiet nisi, 
                    quis vestibulum sapien justo ut risus. Donec at risus ac magna molestie vehicula 
                    vitae eget sem. Proin a velit metus. Donec congue euismod libero non rhoncus. 
                    Nullam tincidunt sapien a odio fermentum hendrerit ut placerat dui. 
                </div>
            </Box>

            <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
                A propos de nous
            </Typography>
            <Typography mb="30px">Carrières</Typography>
            <Typography mb="30px">Nos magasins</Typography>
            <Typography mb="30px">Conditions générales</Typography>
            <Typography mb="30px">Politique de confidentialité</Typography>
            </Box>

            <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
                Service Client 
            </Typography>
            <Typography mb="30px">Centre d'aide</Typography>
            <Typography mb="30px">Suivre votre commande</Typography>
            <Typography mb="30px">Achats en gros et corporatifs</Typography>
            <Typography mb="30px">Retours et remboursements</Typography>
            </Box>

            <Box width="clamp(20%, 25%, 30%)">
                <Typography variant="h4" fontWeight="bold" mb="30px">
                    Contactez-nous
                </Typography>
                <Typography mb="30px">
                    17 rue DevWeb, Gers, France
                </Typography>
                <Typography mb="30px">Email: testsite@gmail.com</Typography>
                <Typography mb="30px">(33)6-16-16-98-08</Typography>
            </Box>
        </Box>
    </Box>
    );  
};

export default Footer;