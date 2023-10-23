import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from '../../state';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [ value, setValue] = useState("tous");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log("items", items);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            {method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getItems();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const topRatedItems = items.filter(
        (item) => item.attributes.category === "MIEUX NOTÉS"
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "NOUVEAUTÉS"
    );
    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "MEILLEURES VENTES"
    );

    return <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
            Nos Sélections <b>Produits</b>
        </Typography>
        <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"}}}
            sx={{
                m: "25px",
                "& .MuiTabs-flexContainer": {
                    flexwrap: "wrap"
                }
            }}
        >
            <Tab label="TOUS" value="tous" />
            <Tab label="NOUVEAUTÉS" value="nouveautés" />
            <Tab label="MEILLEURES VENTES" value="meilleuresVentes" />
            <Tab label="MIEUX NOTÉS" value="mieuxNotés" />
        </Tabs>
        <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
        >
            {value === "tous" && items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "nouveautés" && newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "meilleuresVentes" && bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "mieuxNotés" && topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </Box>
    </Box>;    
};

export default ShoppingList;