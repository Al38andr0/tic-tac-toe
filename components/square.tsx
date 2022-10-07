import React, {MouseEventHandler} from "react";
import {SquareStatus} from "../types/types";

type Props = {
  handleClick: MouseEventHandler
  status: SquareStatus;
}
export const Component = ({handleClick, status}: Props) => {
  return (
    <div className='square' onClick={handleClick}>
      {status && <h1 className={status}>{status}</h1>}
    </div>
  )
}
