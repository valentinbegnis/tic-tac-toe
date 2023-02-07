import { Slot } from './Slot'

export function Board ({ board, updateBoard }) {
  return (
    <section className='game'>
      {
        board.map((slot, index) => {
          return (
            <Slot
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {slot}
            </Slot>
          )
        })
      }
    </section>
  )
}
