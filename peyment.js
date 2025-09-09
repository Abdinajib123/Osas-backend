import express from "express";
import {
  MERCHANT_API_KEY,
  MERCHANT_API_USER_ID,
  MERCHANT_U_ID,
  waafiApi,
} from "../config/config.js";
import axios from "axios";

export const createPayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone) throw new Error("Merchant error Phone number is required");

    const peymentBody = {
      schemaVersion: "1.0",
      requestId: "10111331033",
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
          referenceId: "12334",
          invoiceId: "7896504",
          amount: amount,
          currency: "USD",
          description: "Test USD",
        },
      },
    };

    const { response } = await axios.post(waafiApi, peymentBody);
    if (response.responseMsg !== "RCS_SUCCESS") {
      let errorMessage = "";
      if (response.responseMsg == "RCS_NO_ROUTE_FOUND")
        errorMessage = "Phone Number Not Found";
      else if (response.responseMsg == "RCS_USER_REJECTED")
        errorMessage = "Customer rejected to authorize payment";
      else if (response.responseMsg == "Invalid_PIN")
        errorMessage = "Customer rejected to authorize payment";

      return {
        status: false,
        error: errorMessage !== "" ? errorMessage : response.responseMsg,
      };
    }
    return {
      status: true,
      message: "paid",
    };
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};