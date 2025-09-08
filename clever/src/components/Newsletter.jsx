import React from 'react'

const Newsletter = () => {
    const formhandler = (e)=>{
        e.preventDefault()
    }
  return (
    <div className=' text-center py-5 gap-4 space-y-3'>
        <h1 className=' text-2xl text-black font-medium'>Subscribe now & get 20% off</h1>
        <p className=' font-light text-gray-700 '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In deserunt inventore autem nemo cupiditate ullam.</p>

        <form action="" onSubmit={formhandler}>
            <input type="email" name="mail" id="mail" className=' w-[25vw] h-[6vh] shadow' placeholder=' Enter your E-mail' />
            <button type="submit" className=' w-[8vw] bg-black text-white h-[6vh]'>Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter   