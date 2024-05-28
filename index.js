const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const payOS = require("./utils/payos");

const app = express();
const PORT = process.env.PORT || 3030;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));

app.post("/create-payment-link", async (req, res) => {
    const YOUR_DOMAIN =
        process.env.SERVER_URL || "https://enigma-dropshipping.up.railway.app";
    const body = {
        orderCode: req.body.orderCode,
        amount: req.body.amount,
        description: req.body.description,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.redirect(paymentLinkResponse.checkoutUrl);
        res.json({ paymentUrl: paymentLinkResponse.checkoutUrl });
    } catch (error) {
        console.error("Error creating payment link:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// get payment link information
app.get("/payment-link/:orderCode", async (req, res) => {
    try {
        const order = await payOS.getPaymentLinkInformation(
            req.params.orderCode
        );
        if (!order) {
            return res.json({
                error: -1,
                message: "failed",
                data: null,
            });
        }
        return res.json({
            error: 0,
            message: "ok",
            data: order,
        });
    } catch (error) {
        console.error("Error getting payment link information:", error);
        return res.json({
            error: -1,
            message: "failed",
            data: null,
        });
    }
});

app.post("/test", async (req, res) => {
    const YOUR_DOMAIN = "localhost:3030";
    const body = {
        orderCode: Number(new Date()),
        amount: 2000,
        description: "Test payment",
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.redirect(paymentLinkResponse.checkoutUrl);
    } catch (error) {
        console.error("Error creating payment link:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});
