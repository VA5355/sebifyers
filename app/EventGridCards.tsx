// EventGridCards.tsx

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type Task = {
  id: number;
  text: string;
  checked: boolean;
  shaking: boolean;
  deleting: boolean;
};

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    text: "Fyers Securities",
    checked: false,
    shaking: false,
    deleting: false,
  },
  {
    id: 2,
    text: "ICICI Direct",
    checked: false,
    shaking: false,
    deleting: false,
  },
];

export default function EventGridCards({brokers  } : { brokers:any }) {
//  Correct Version
const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
const [loggedBrokers, setLoggedBrokers] = useState<any[]>(() => {
        const matchedBrokers: any[] = [];
    brokers.forEach((b: any, indx: number) => {
        const task = tasks.at(indx);
        if (task?.text !== undefined) {
            if (task.text.toUpperCase().indexOf(b) > -1) {
                matchedBrokers.push(b);
                task.checked = true;
            }
        }
    });
    console.log(` matched brokers ${matchedBrokers} `)
    return matchedBrokers;
});

  const [inputValue, setInputValue] = useState("");
  const holdTimers = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    return () => {
      Object.values(holdTimers.current).forEach(clearTimeout);
    };
  }, []);

  // -----------------------------
  // ADD NEW TASK
  // -----------------------------
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    const text = inputValue.trim();

    if (!text) return;

    const newTask: Task = {
      id: Date.now(),
      text,
      checked: false,
      shaking: false,
      deleting: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  // -----------------------------
  // TOGGLE CHECK
  // -----------------------------
  const toggleCheck = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              checked: !task.checked,
            }
          : task
      )
    );
  };

  // -----------------------------
  // START HOLD DELETE
  // -----------------------------
  const startHoldDelete = (id: number) => {
    // Start shaking immediately
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              shaking: true,
            }
          : task
      )
    );

    // Delete after 1 second
    holdTimers.current[id] = setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                deleting: true,
                shaking: false,
              }
            : task
        )
      );

      setTimeout(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }, 250);
    }, 1000);
  };
  //CHECK MARK LOGGED BROKER 
  const checkLoggedBroker = (brk:any )=> {
       let checked =false;
         loggedBrokers.forEach((lg:string) => {
              if(brk.toUpperCase().indexOf(lg) > -1 ){
       checked =true;

              }
         } )
        return   checked || loggedBrokers.find((bkVal, bkind) => {  return bkVal.indexOf(brk ) > -1; }) !==undefined;
  }
  // -----------------------------
  // CANCEL HOLD DELETE
  // -----------------------------
  const cancelHoldDelete = (id: number) => {
    if (holdTimers.current[id]) {
      clearTimeout(holdTimers.current[id]);
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              shaking: false,
            }
          : task
      )
    );
  };

  return (
    <div className="w-full">
      {/* ================================================= */}
      {/* RESPONSIVE GRID */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-1   xl:grid-cols-1
          gap-4
        "
      > {/*      md:col-span-1*/}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`
              group relative cursor-pointer
          
              transition-all duration-300
              ${task.deleting ? "scale-110 opacity-0 h-0 overflow-hidden" : ""}
            `}
          >
            {/* ================================================= */}
            {/* CARD */}
            {/* ================================================= */}

            <label
              className={`
                block rounded-2xl overflow-hidden
                border border-gray-200
                bg-white
                shadow-sm
                hover:shadow-lg
                transition-all duration-300
              `}
              onMouseDown={() => startHoldDelete(task.id)}
              onMouseUp={() => cancelHoldDelete(task.id)}
              onMouseLeave={() => cancelHoldDelete(task.id)}
              onTouchStart={() => startHoldDelete(task.id)}
              onTouchEnd={() => cancelHoldDelete(task.id)}
            >
              {/* Hidden checkbox */}
              <input
                type="checkbox"
                checked={checkLoggedBroker( task.text)}
                onChange={() => toggleCheck(task.id)}
                className="hidden"
              />

              {/* ================================================= */}
              {/* CARD BODY */}
              {/* ================================================= */}

              <div
                className={`
                  relative min-h-[90px]
                  px-5 py-5
                  flex items-center justify-between
                  transition-all duration-300
                  bg-gray-50 hover:bg-white
                  border-b-2 border-transparent
                  
                  ${
                    checkLoggedBroker( task.text)
                      ? "text-green-500 border-green-500"
                      : "text-gray-700"
                  }

                  ${task.shaking ? "animate-[shake_0.1s_infinite]" : ""}
                `}
              >
                {/* Gradient bottom line */}
                <div
                  className={`
                    absolute bottom-0 left-0 h-[2px]
                    bg-gradient-to-r from-red-400 to-red-600
                    transition-all duration-300
                    ${task.shaking ? "w-full" : "w-0"}
                  `}
                />

                {/* Text */}
                <div
                  className="
                    pr-12
                    text-sm sm:text-base
                    font-medium
                    break-words
                  "
                >
                  {task.text}
                </div>

                {/* Important button */}
                <button
                  type="button"
                  className={`
                    absolute right-4 top-1/2
                    -translate-y-1/2

                    h-10 w-10
                    rounded-full

                    flex items-center justify-center

                    transition-all duration-300

                    ${
                     checkLoggedBroker( task.text)
                        ? "opacity-100 scale-100 text-green-500"
                        : "opacity-0 scale-0"
                    }
                  `}
                >
                  <Check size={22} />
                </button>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* ================================================= */}
      {/* ADD TASK FORM */}
      {/* ================================================= */}

      <form onSubmit={addTask} className="mt-5">
        <input
          type="text"
          value={inputValue}
          placeholder="+ add new broker"
          onChange={(e) => setInputValue(e.target.value)}
          className="
            w-full
            rounded-xl
            border border-gray-300
            px-4 py-3
            text-sm sm:text-base
            outline-none
            transition-all duration-300
            focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-200
          "
        />
      </form>

      {/* ================================================= */}
      {/* SHAKE KEYFRAMES */}
      {/* ================================================= */}

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            100% { transform: translateX(-2px); }
          }
        `}
      </style>
    </div>
  );
}
