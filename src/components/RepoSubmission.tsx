import React, { FC, useState } from 'react'

const RepoSubmission: FC = ()  => {
  const [buttonPlaceHolder, setButtonPlaceHolder] = useState("Submit repo?")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmissionInProcess, setIsSubmissionInProcess] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [input, setInput] = useState("")
  const saveToDataBase = (repoUrl: string):void => {
    setIsSubmissionInProcess(true)

    // todo: import the summission function here instead
    setTimeout(() => {

      setIsSubmissionInProcess(false)
      setSubmitted(true)
      setButtonPlaceHolder("Close")
      console.log("Repo url: ",repoUrl)
      console.log("Data Submitted")

    }, 2000);
  }

  const submitButtonHandler = ():void => {
    if(!isFormOpen && !submitted){
      setButtonPlaceHolder("Submit now")
      return setIsFormOpen(true) 
    }

    if(isFormOpen && !submitted){
      saveToDataBase(input)
      console.log(input)
    }
    if(submitted){
      setButtonPlaceHolder("Submit repo?")
      setSubmitted(false)
      return setIsFormOpen(false)
    }
  
  }

  //Listening outside focus
  document.querySelector(".App")?.addEventListener("click", (e)=> {
      if(isSubmissionInProcess) return

      if(!document.querySelector(".submission-form")?.contains(e.target as unknown as Node) ){
        setIsFormOpen(false)
        setSubmitted(false)
        setButtonPlaceHolder("Submit repo?")
      }
  })


  return (
    <div className='fixed bottom-[40px] right-[40px] flex items-end flex-col gap-[10px] submission-form'>
      {isFormOpen}
        { isFormOpen && !isSubmissionInProcess && !submitted &&
          <div className='bg-white p-[15px] rounded-md min-w-[300px] shadow-xl'>
            <h6 className=' text-[18px] mb-[8px] text-gray-700 font-medium '>Suggest Repository</h6>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Repository URL</p>
            <input onChange={(e)=> setInput(e.target.value)} className='bg-gray-200 py-[4px] w-full px-[10px] rounded-md outline-yellow-300 text-gray-500 text-[12px]' type="text" placeholder='https://github.com/open-sauced' />
          </div>
        }
        {
          isSubmissionInProcess && 
          <div className='bg-white p-[15px] rounded-md min-w-[300px] '>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Submission in process ...</p>
          </div>
        }
        {
          submitted && !isSubmissionInProcess &&
          <div className='bg-white p-[15px] rounded-md min-w-[300px]'>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Submission succeeded!</p>
          </div>
        }
        <button disabled={isSubmissionInProcess} onClick={submitButtonHandler} className='bg-saucyRed p-[10px] text-[12px] shadow-lg rounded-md text-white font-bold transform transition-all hover:bg-orange-700' > {buttonPlaceHolder} </button>
    </div>
  )
}

export default RepoSubmission