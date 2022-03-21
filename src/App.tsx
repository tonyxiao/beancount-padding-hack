import React from "react";
import "./App.css";

/*
Input: 

main.bean	32	Balance failed for Assets:Inventory:Fresh: expected 0.1 EDAMAME_KG != accumulated 1.0 EDAMAME_KG (0.9 too much)
main.bean	33	Balance failed for Assets:Inventory:Fresh: expected 0.7 MUSHROOM_OYSTER_KG != accumulated 1.0 MUSHROOM_OYSTER_KG (0.3 too much)
  
Expect output:

Assets:Inventory:Fresh  -0.9 EDAMAME_KG {}
Assets:Inventory:Fresh: expected 0.7 MUSHROOM_OYSTER_KG != accumulated 1.0 MUSHROOM_OYSTER_KG (0.3 too much)

Produced using: https://regexr.com/
*/
function assertionErrorToPaddingTransaction(errStr: string) {
  const inventoryPostings = errStr
    .split("\n")
    .filter((l) => !!l.trim())
    .map((line) => {
      const match = line.match(
        // eslint-disable-next-line no-useless-escape
        /Balance failed for (.*?): expected .*?(\w+) \(([\.\d]+) too (much|little)/
      );
      if (!match) {
        return `; Error converting line: ${line}`;
      }
      const [accountName, commodity, quantity, muchOrLittle] = match.slice(1);
      const sign = muchOrLittle === "much" ? "-" : "";

      const out = `  ${accountName}  ${sign}${quantity} ${commodity} {}`;

      console.log(out);
      return out;
    })

    .join("\n");

  return [
    `${new Date().toISOString().slice(0, 10)} * "Food cost"`,
    inventoryPostings,
    "  Expenses:FoodCost",
  ].join("\n");
}

function App() {
  const [input, setInput] = React.useState(`
main.bean	93	Balance failed for Assets:Inventory:Fresh:Carrots: expected 0.2 CARR0TS_KG != accumulated 0 CARR0TS_KG (0.2 too little)
main.bean	94	Balance failed for Assets:Inventory:Fresh:Cucumber: expected 0.3 CUCUMBER_KG != accumulated 1.2 CUCUMBER_KG (0.9 too much)
main.bean	95	Balance failed for Assets:Inventory:Fresh:Asparagus: expected 0 ASPARAGUS_KG != accumulated 0.8 ASPARAGUS_KG (0.8 too much)
main.bean	96	Balance failed for Assets:Inventory:Fresh:Ginger: expected 0.4 GINGER_KG != accumulated 0.9 GINGER_KG (0.5 too much)
main.bean	97	Balance failed for Assets:Inventory:Fresh:MushroomShimejiWhite: expected 0.5 MUSHROOMSHIMEJI_PACK != accumulated 2 MUSHROOMSHIMEJI_PACK (1.5 too much)
main.bean	98	Balance failed for Assets:Inventory:Fresh:BigRedChili: expected 0.2 BIGREDCHILI_KG != accumulated 0.5 BIGREDCHILI_KG (0.3 too much)
main.bean	99	Balance failed for Assets:Inventory:Fresh:BabyBokChoy: expected 0.2 BABYBOKCHOY_KG != accumulated 0.5 BABYBOKCHOY_KG (0.3 too much)
main.bean	100	Balance failed for Assets:Inventory:Fresh:Daikon: expected 0.7 DAIKON_KG != accumulated 1 DAIKON_KG (0.3 too much)
main.bean	101	Balance failed for Assets:Inventory:Fresh:Spinach: expected 0.7 SPINACH_KG != accumulated 0.5 SPINACH_KG (0.2 too little)
`);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>
            Input
            <textarea
              value={input}
              onChange={(v) => setInput(v.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Output
            <textarea
              value={assertionErrorToPaddingTransaction(input)}
            ></textarea>
          </label>
        </div>
      </header>
    </div>
  );
}

export default App;
