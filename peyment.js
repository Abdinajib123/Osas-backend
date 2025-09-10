import axios from "axios";

// Expect these env vars to be set
const {
  MERCHANT_API_KEY,
  MERCHANT_API_USER_ID,
  MERCHANT_U_ID,
  WAAFI_API_URL,
} = process.env;

export const processPayment = async (req, res) => {
  try {
    const { phone, amount, currency = "USD", description = "Payment" } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });
    if (!amount) return res.status(400).json({ error: "Amount is required" });
    if (!MERCHANT_API_KEY || !MERCHANT_API_USER_ID || !MERCHANT_U_ID || !WAAFI_API_URL) {
      return res.status(500).json({ error: "Payment configuration missing" });
    }

    const body = {
      schemaVersion: "1.0",
      requestId: String(Date.now()),
      timestamp: Date.now(),
      channelName: "WEB",
      serviceName: "API_PURCHASE",
      serviceParams: {
        merchantUid: MERCHANT_U_ID,
        apiUserId: MERCHANT_API_USER_ID,
        apiKey: MERCHANT_API_KEY,
        paymentMethod: "mwallet_account",
        payerInfo: {
          accountNo: phone,
        },
        transactionInfo: {
          referenceId: String(Date.now()),
          invoiceId: String(Math.floor(Math.random() * 1e9)),
          amount: Number(amount),
          currency,
          description,
        },
      },
    };

    const { data } = await axios.post(WAAFI_API_URL, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });

    if (!data || data.responseMsg !== "RCS_SUCCESS") {
      let errorMessage = data?.responseMsg || "Unknown payment error";
      if (errorMessage === "RCS_NO_ROUTE_FOUND") errorMessage = "Phone number not found";
      if (errorMessage === "RCS_USER_REJECTED") errorMessage = "Customer rejected payment";
      if (errorMessage === "Invalid_PIN") errorMessage = "Invalid PIN";
      return res.status(400).json({ status: false, error: errorMessage, raw: data });
    }

    return res.status(200).json({ status: true, message: "paid", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};