import React, { useEffect, useState } from 'react'

import {
  X,
  CreditCard,
  Loader2,
  BadgeCheck,
  UserRound,
  Send
} from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  close: () => void
}

export default function ProcessAccountModal ({ open, close }: Props) {
  const [status, setStatus] = useState<'loading' | 'virtual'>('loading')
  const [closedView, setClosedView] = useState(false)
  const [virtualId, setVirtualId] = useState('')

  /**
   * Initial payment check simulation
   */
  useEffect(() => {
    if (open) {
      setStatus('loading')
      setClosedView(false);
      const timer = setTimeout(() => {
        setStatus('virtual')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [open])

  const submitVirtualId = () => {
    if (!virtualId.trim()) return

    /**
     * hide form
     */
    setStatus('loading')

    /**
     * here you can call API
     *
     * await createVirtualAccount()
     *
     */

    setTimeout(() => {
      setStatus('virtual')
    }, 3000)
  }

  if (!open) return null

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
        y: -30
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.9
      }}
      className={`
       ${closedView ? '': 'fixed'} 
      inset-0
      z-50
      flex
      items-center
      justify-center
      px-4
      `}
    >
      {/* background */}

      <div
        className={`
          
         ${closedView ? '': 'absolute'} 
        inset-0
        bg-black/40
        backdrop-blur-sm
       `}
      />

      {/* modal */}

      <div
        className='
        relative
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-2xl
        overflow-hidden
        '
      >
        {/* HEADER */}

        <div
          className='
        flex
        items-center
        justify-between
        px-5
        py-4
        border-b
        '
        >
          <div
            className='
          flex
          items-center
          gap-2
          '
          >
            <CreditCard size={22} className='text-blue-600' />

            <span
              className='
            font-semibold
            '
            >
              Store Notify
            </span>
          </div>

          <button
            onClick={() => {
              setClosedView(true)
            }}
            className='
hover:bg-gray-100
rounded-full
p-2
transition
'
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}

        <div
          className='
p-8
text-center
'
        >
          <AnimatePresence mode='wait'>
            {closedView && (
              <motion.div
                key='closed'
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className='
flex
flex-col
items-center
justify-center
py-8
'
              >
                <BadgeCheck
                  size={60}
                  className='
text-green-500
'
                />

                <h2
                  className='
mt-5
font-bold
text-xl
'
                >
                  No Pending Payments Found
                </h2>

                <p
                  className='
mt-2
text-gray-500
text-sm
'
                >
                  Your account is already up to date.
                </p>
              </motion.div>
            )}

            {!closedView && status === 'loading' && (
              <motion.div
                key='loading'
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
              >
                <Loader2
                  size={45}
                  className='
mx-auto
text-blue-600
animate-spin
'
                />

                <h2
                  className='
mt-5
font-bold
text-lg
'
                >
                  Processing Virtual Account ...
                </h2>

                <p
                  className='
mt-3
text-sm
text-gray-500
'
                >
                  Please wait while we fetch your payment details.
                </p>
              </motion.div>
            )}

            {!closedView && status === 'virtual' && (
              <motion.div
                key='virtual'
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
              >
                <BadgeCheck
                  size={48}
                  className='
mx-auto
text-green-500
'
                />

                <h2
                  className='
mt-4
font-bold
'
                >
                  No pending payments found
                </h2>

                <div
                  className='
mt-5
'
                >
                  <span
                    className='
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
text-xs
font-semibold
'
                  >
                    Virtual ID
                  </span>

                  <input
                    value={virtualId}
                    onChange={e => setVirtualId(e.target.value)}
                    placeholder='Enter Virtual Trading ID'
                    className='
mt-4
w-full
border
rounded-lg
px-4
py-3
'
                  />

                  <button
                    onClick={submitVirtualId}
                    className='
mt-4
w-full
bg-blue-600
text-white
rounded-lg
py-3
'
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* FOOTER */}

        <div
          className='
        border-t
        px-5
        py-4
        text-center
        font-semibold
        text-blue-600
        '
        >
          Secure by Razorpay
        </div>
      </div>
    </motion.div>
  )
}
