import type { NextPage } from 'next'
import {useEffect, useState} from "react";
import {Component as SquareComponent} from "../components/square";
import {Conditions, Square, Result, Status, SquareStatus} from "../types/types";

const Home: NextPage = () => {
  const baseConditions: Conditions[] = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ]

  const baseGrid: Square[] = Array.from(Array(9).keys(), (item, index) => ({
    id: index + 1,
    status: null
  }))

  const [status, setStatus] = useState<Status>('X')
  const [grid, setGrid] = useState<Square[]>(baseGrid)
  const [progress, setProgress] = useState<Conditions[]>(baseConditions)
  const [result, setResult] = useState<Result>(null)
  const [count, setCount] = useState<number>(0)


  const handleClick = (square: Square, status: SquareStatus) => {
    if (square.status || !!result) {
      return
    }
    setCount(state => state + 1)
    setStatus(state => state === 'O' ? 'X' : 'O')
    setGrid(state => state.map(s => s.id === square.id ? { ...s, status: !s.status ? status : s.status } : s))
    setProgress((state: Conditions[]) => state.reduce((a: Conditions[], c) => {
        const index = c.indexOf(square.id)
        if (status && index !== -1) {
          c[index] = status
        }
        return [...a, c]
      }, [])
    )
  }

  useEffect(() => {
    progress.forEach(element => {
      const toString = element.join("").toString()

      if (toString === 'XXX') {
        setResult('Winner: X')
      }
      if (toString === 'OOO') {
        setResult('Winner: O')
      }
    })
    if (count === 9) {
      setResult('Tie')
    }
  }, [count, progress])


  const reset = () => {
    setGrid(baseGrid)
    setStatus('X')
    setProgress(baseConditions)
    setCount(0)
    setResult(null)
  }
  return (
    <>
      <div className='header'>
        <div className={'status'}>{!result ? status === 'X' ? 'Next player: X' : 'Next player: O' : result === 'Tie' ? 'Tie' : result}</div>
        <button className={'reset'} onClick={reset} type='button'>Reset</button>
      </div>
      <div className={'container'}>
        <div className={'grid'}>
          {grid.map((square) =>
            <SquareComponent
              handleClick={() => handleClick(square, status)}
              status={square.status}
              key={square.id}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
