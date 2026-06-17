/*MarketWatch.tsx
This is the right side panel.

Desktop:

----------------
Pledge to trade

Symbol Last Chg

BANK

357.95

-77.70

Range bar
----------------
Mobile:

moves below workspace.
*/
import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function MarketWatch () {
  return (
    <aside
      className='
border
rounded-xl
bg-white
p-4
h-fit
'
    >
      <div
        className='
flex
justify-between
font-semibold
'
      >
        Pledge to trade
        <ChevronDown size={18} />
      </div>

      <div
        className='
grid
grid-cols-3
text-xs
mt-5
text-gray-500
'
      >
        <span>Symbol</span>

        <span>Last</span>

        <span>Chg</span>
      </div>

      <div
        className='
mt-8
'
      >
        <h3
          className='
font-bold
'
        >
          BANK
        </h3>

        <p
          className='
text-xs
text-gray-500
'
        >
          NSE
        </p>

        <div
          className='
flex
items-center
gap-3
mt-3
'
        >
          <h1
            className='
text-3xl
font-bold
'
          >
          {/** 357.95 */}  
          </h1>

          <span
            className='
text-red-500
'
          >
          {/**   -77.70 */}
          </span>
        </div>

        <div
          className='
mt-8
'
        >
          <div
            className='
h-2
bg-red-400
rounded-full
'
          />

          <div
            className='
flex justify-between text-xs mt-2
'
          >
           {/** 340 469.50 */} 
          </div>
        </div>
      </div>
    </aside>
  )
}
