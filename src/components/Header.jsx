import NewBudget from "./NewBudget";
import BudgetControl from "./BudgetControl";

const Header = ({
  spends,
  setSpends,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidBudget ?
        (
          <BudgetControl
            spends={spends}
            setSpends={setSpends}
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        ) : (
          <NewBudget
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        )
      }
    </header>
  );
};

export default Header;
