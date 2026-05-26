

type currentkmSectionProps = {
  current: number
}

export function CurrentKmSection({ current }: currentkmSectionProps) {


  return(
    <section className='currentKm'>
      <span>{current} km</span>

      
    </section>
  )
}