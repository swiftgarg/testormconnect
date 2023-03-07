import express from "express";
import { AppDataSource } from "./data-source";
import { Tax } from "./entity/Tax";

const app = express();

app.use(express.json());

app.post("/calculateTax", async (req, res) => {

  try {
    const { income, name } = req.body;

    console.log(`Calculating tax for ${name} with income ${income}...`);

    // Calculate the tax based on the tax brackets
    const taxBrackets = [
      { maxIncome: 18200, taxRate: 0, constantTax: 0 },
      { maxIncome: 45000, taxRate: 0.19, constantTax: 0 },
      { maxIncome: 120000, taxRate: 0.325, constantTax: 5092 },
      { maxIncome: 180000, taxRate: 0.37, constantTax: 29467 },
      { maxIncome: Infinity, taxRate: 0.45, constantTax: 51667 }
    ];

    const bracket = taxBrackets.find(bracket => income <= bracket.maxIncome);
    const previousBracketMaxIncome = bracket ? taxBrackets[taxBrackets.indexOf(bracket) - 1].maxIncome : 0;
    const taxableIncome = income - previousBracketMaxIncome;
    const taxAmount = taxableIncome * bracket.taxRate + bracket.constantTax;

    console.log(`Tax amount for ${name} with income ${income} is ${taxAmount}`);

    // Save the tax record to the database
    const taxRecord = new Tax();
    taxRecord.income = income;
    taxRecord.taxAmount = taxAmount;
    taxRecord.name = name;
    await AppDataSource.manager.save(taxRecord);

    res.send({ id: taxRecord.id, name, income, taxAmount });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while calculating tax.");
  }
});

app.listen(3000, async () => {
  await AppDataSource.initialize();
  console.log("Server running on port 3000");
});
