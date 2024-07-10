import ExpensesList from '../expenses/ExpensesList'


const MainMyExpenses = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
         <div className='flex flex-col w-screen h-[500px] xl:h-[600px] 2xl:-h-[750px] 3xl:h-[912px]'>
            <div className='w-full'>
               <ExpensesList/>
            </div>
         </div>
    </div>
  )
}

export default MainMyExpenses