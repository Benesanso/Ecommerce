'use strict';
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        // @ts-ignore
        const { products, userName, email } = ctx.request.body;

        try {
            // Récupération des informations sur les articles
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                    .service("api::item.item")
                    .findOne(product.id);
                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: item.name
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.count,
                    }
                })
            );

            // Création d'une session Stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                customer_email: email,
                mode: "paiement",
                success_url: "http://localhost:3000/checkout/success",
                cancel_url: "http://localhost:3000",
                line_items: lineItems
            });

            // Création de la commande
            await strapi
                    .service("api::order.order")
                    .create({
                        data: { userName, products, stripeSessionId: session.id },
                    });

            // returne à la session id
            return { id: session.id }        
        } catch (error){
            ctx.response.status = 500;
            return { error: { message: "Une erreur est survenue lors de la création de la session." } };
        }
    },
}));
