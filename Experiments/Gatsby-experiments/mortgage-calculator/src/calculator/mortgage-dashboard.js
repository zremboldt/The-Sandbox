import React, { useState } from 'react';
import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';
import styled from 'react-emotion'
import { css } from 'react-emotion'


const colors = {
  primary: {
    100: () => '#F0F4FE',
    300: () => '#95AEED',
    500: () => '#6175DE',
    700: () => '#3547A4',
    900: () => '#1F2C6D',
  },
  neutral: {
    100: () => '#F8F9FA',
    200: () => '#E1E7EC',
    300: () => '#D5DDE5',
    400: () => '#CCD4DB',
    500: () => '#AEBECD',
    600: () => '#929FB1',
    700: () => '#6E7A8A',
    800: () => '#404B5A',
    900: () => '#202833',
  }
}


const defaultOverpayment = { month: '1', year: '0', amount: '0' };

const SectionContainer = styled.div`
  margin: 120px 0;
`

const Label = styled.label`
  
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 4px 14px;
  border: 1px solid ${colors.primary[500]};
  border-radius: 5px;
`




export default () => {
  const [initial, setInitial] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('25');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const { monthlyPayment, payments } = calculate(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments
  );

  return (
    <div>
      {/* <nav className="navbar navbar-default">
        <div className="navbar-header">
          <div className="navbar-brand">Mortgage Overpayment Calculator</div>
        </div>
      </nav> */}

      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">

          <SectionContainer>
            <h2>Initial</h2>
            <div>
              <Label>Amount</Label>
              <Input
                maxLength={7}
                value={initial}
                onChange={e => setInitial(e.target.value)}
              />
            </div>
            <div>
              <label>Years</label>
              <Input
                type="number"
                maxLength={2}
                value={years}
                onChange={e => setYears(e.target.value)}
              />
            </div>
            <div>
              <label>Rate</label>
              <Input
                type="number"
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value)}
              />
            </div>
          </SectionContainer>


          <SectionContainer>
            <h2>Overpayment</h2>
            <div>
              <label>Monthly</label>
              <input
                type="number"
                maxLength={5}
                value={monthlyOverpayment}
                onChange={e => setMonthlyOverpayment(e.target.value)}
              />
            </div>

            <div>
              <label>Year</label>
              <label>Month</label>
              <label>Amount</label>
            </div>

            {overpayments.map(({ year, month, amount }, i) => (
              <div key={i}>
                <input
                  type="number"
                  min="0"
                  max={years}
                  value={year}
                  name="year"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  name="month"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="text"
                  value={amount}
                  name="amount"
                  onChange={updateOverpayment(i)}
                />

                {i === overpayments.length - 1 ? (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments([...overpayments, defaultOverpayment])
                    }
                  >
                    +
                  </button>
                ) : (
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        setOverpayments(overpayments.filter((_, j) => j !== i))
                      }
                    >
                      X
                  </button>
                  )}
              </div>
            ))}
          </SectionContainer>


          <SectionContainer>
            <h2>
              Monthly Payment
              <span className="money">
                {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
              </span>
            </h2>
            <Chart payments={payments} />
          </SectionContainer>

        </div>
        <Table className="col-sm-4" payments={payments} />
      </div>
    </div>
  );
};



// input,
// select,
// label {
//   width: 70px;
//   margin-right: 5px;
// }

// th,
// td {
//   padding: 0 7px;
//   text-align: right;
// }

// .money {
//   padding-left: 1rem;
//   color: #428bca;
// }

// tbody,
// tfoot tr:first-child {
//   border-top: #428bca solid 1px;
// }

// .line {
//   fill: none;
//   stroke: #428bca;
//   stroke-width: 1.5px;
// }

// .baseline {
//   stroke-dasharray: 4, 4;
// }

// input {
//   width: 100%;
// }