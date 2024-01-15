import React from 'react'
import truncatedText from '../lib/trancate';

interface FavoriteProps {
  token: string;
  onLookUp(): void
  onDelete(): void
}

const Favorite = ({ token, onLookUp, onDelete }: FavoriteProps) => {
  return (
    <div className="w-full h-full dashboard-block relative border border-opacity-10 dashboard-block--gradient dashboard-block--nopadding">
      <div className="w-full h-full flex flex-col"><div className="flex items-center gap-5 px-7 py-3">
        <div className="text-white w-full text-left hover:text-active cursor-pointer relative z-10">
          <a href="https://etherscan.io/address/0xEEc49df361419c1D69977Ecdb315AED61c65855f" target="_blank">{truncatedText(token)}</a>
        </div>
        <div className="flex items-center ml-auto gap-2 relative z-10">
          <button onClick={onLookUp}>
            <svg fill="none" stroke="#23CEE5" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
              </path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
          <button onClick={onDelete}>
            <svg fill="none" stroke="red" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Favorite