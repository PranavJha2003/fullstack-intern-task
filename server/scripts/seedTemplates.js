
require("dotenv").config();

const mongoose = require("mongoose");
const Template = require("../models/Template");

const templates = [
  {
    name: "SaaS Landing Page",
    category: "SaaS",
    description: "A modern landing page for SaaS products and startups.",
    image: "/images/template1-saas.svg",
  },
  {
    name: "Developer Portfolio",
    category: "Portfolio",
    description: "A clean portfolio to showcase your skills and projects.",
    image: "/images/template2-portfolio.svg",
  },
  {
    name: "E-commerce Store",
    category: "E-commerce",
    description: "A stylish online store for products and shopping.",
    image: "/images/template3-ecommerce.svg",
  },
  {
    name: "Restaurant Website",
    category: "Restaurant",
    description: "A beautiful website for menus, reservations and food.",
    image: "/images/template4-restaurant.svg",
  },
  {
    name: "Travel Website",
    category: "Travel",
    description: "Showcase destinations and travel experiences.",
    image: "/images/template5-travel.svg",
  },
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);


    await Template.deleteMany({});
    await Template.insertMany(templates);

    console.log("Successfully seeded five templates.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedTemplates();
