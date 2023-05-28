const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/api/buy-medicine/products/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/${query}`
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/buy-medicine/products/details", async (req, res) => {
  const { query } = req.query;

  try {
    console.log(query);
    const response = await axios.get(
      `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/detail/${query}`
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/alo/medicine/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://www.alodokter.com/api/aloshop/products?term=${query}`
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/hospital/location", async (req, res) => {
  try {
    const response = await axios.put(
      `https://magneto.api.halodoc.com/api/rumah-sakit/v1/hospitals/suggestions`,
      {
        city: req?.body?.city || null,
        district: req?.body?.district || null,
        region: req?.body?.region || null,
        search_text: req?.body?.search || null,
        per_page: 3,
        types: ["provider_locations", "departments", "procedures"]
      } 
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data.provider_locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/doctors/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://magneto.api.halodoc.com/api/v1/tanya-dokter/doctors/search?per_page=20&page_no=1&search_text=${query}`
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
