const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const payOS = require("./utils/payos");

const app = express();
const PORT = process.env.PORT || 3030;

dotenv.config(); // Load environment variables

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));

app.post("/create-payment-link", async (req, res) => {
    const YOUR_DOMAIN = "https://enigma-dropshipping.up.railway.app";
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: req.body.amount,
        description: req.body.description,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.json({ paymentUrl: paymentLinkResponse.checkoutUrl }); // Use res.json for a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" }); // Send a 500 error response with an error message
    }
});

app.post("/create-payment-link-test", async (req, res) => {
    const YOUR_DOMAIN = "https://enigma-dropshipping.up.railway.app";
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: 2000,
        description: "Test payment link from PayOS",
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.json({ paymentUrl: paymentLinkResponse.checkoutUrl }); // Use res.json for a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" }); // Send a 500 error response with an error message
    }
});

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});
