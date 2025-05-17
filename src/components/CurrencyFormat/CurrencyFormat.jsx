import numeral from "numeral"

function CurrencyFormat({ amount }) {
  const FormattedAmount = numeral(amount).format('$0,0.00')
  console.log(`numeral(amount) is ${numeral(amount)
    }`);
  console.log(`FormattedAmount => ${FormattedAmount}`);

  return (
    <div>
      {FormattedAmount}
    </div>
  )
}

export default CurrencyFormat