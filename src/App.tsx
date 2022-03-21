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
    .map((line) => {
      const match = line.match(
        /Balance failed for (.*?): expected .*?(\w+) \(([\.\d]+) too much/
      );
      if (!match) {
        return "";
      }
      const [accountName, commodity, quantity] = match.slice(1);

      const out = `  ${accountName}  -${quantity} ${commodity} {}`;

      console.log(out);
      return out;
    })
    .filter((l) => !!l)
    .join("\n");

  return [
    `${new Date().toISOString().slice(0, 10)} * "Food cost"`,
    inventoryPostings,
    '  Expenses:FoodCost'
  ].join("\n");
}

function App() {
  const [input, setInput] = React.useState(`
main.bean	32	Balance failed for Assets:Inventory:Fresh: expected 0.1 EDAMAME_KG != accumulated 1.0 EDAMAME_KG (0.9 too much)
main.bean	33	Balance failed for Assets:Inventory:Fresh: expected 0.7 MUSHROOM_OYSTER_KG != accumulated 1.0 MUSHROOM_OYSTER_KG (0.3 too much)
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
