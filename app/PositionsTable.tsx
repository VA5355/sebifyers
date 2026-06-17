/* PositionsTable.tsx
This matches bottom section:

Account Manager
Trade


Positions
Orders
Holdings


Table
*/
import React from 'react'

const columns = [
  'Symbol',
  'Product',
  'Buy/Sell',
  'Qty',
  'Avg Price',
  'LTP',
  'Realized P&L',
  'Unrealized P&L'
]

export default function PositionsTable () {
  return (
    <div
      className='
border
rounded-xl
bg-white
overflow-visible
'
    > {/** overflow-hidden */}
      <div
        className='
p-4
font-bold
border-b
'
      >
        Positions
      </div>
        {/** overflow-x-auto */}
      <div
        className='

'
      >
        <table
          className='
min-w-[900px]
w-full
text-sm
'
        >
          <thead
            className='
bg-slate-100
'
          >
            <tr>
              {columns.map(c => (
                <th
                  key={c}
                  className='
p-3
text-left
'
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr
              className='
border-t
'
            >
              <td className='p-3'>MARJIN</td>

              <td>BUY</td>

              <td>90</td>

              <td>617.58</td>

              <td>0</td>

              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
