import React from 'react'
import { useEffect, useState } from 'react'

const DirectoryItem = ({ name, organization, category }) => {
  const [array, setArray] = useState(false);
  const [checked, setChecked] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!checked) {
      // console.log(category.Value[0])
      let arr = []
      Object.keys(category.Value).forEach(function (key, index) {
        arr.push(category.Value[key].Label)
      })
      setCategories(arr)
      // console.log(categories)
      // console.log(arr)
      setChecked(true)
    }
  }, [checked, category.Value])

  return (
    // *** LINK TO MEMBER PAGE
    // <div className='pb-4 pt-2 border-b-2 text-[#102647]'>
    //     <h5 className='text-xl leading-normal'>ACREE, TIFFANY</h5>
    //     <p className='text-lg leading-none'>Structure Home Warranty</p>
    //     <p className='text-lg leading-none'>Warranty Insurance</p>
    // </div>
    <div className='pb-4 pt-2 border-b-2 text-[#102647]'>
      {/* // Member Name */}
      <h5 className='text-xl leading-normal'>{name}</h5>
      {/* // Company Name */}
      <p className='text-lg leading-none'>{organization}</p>
      {/* // Category */}
      {/* {category && categories.map((c) => (
        <p className='text-lg leading-none'>{c}</p>
      ))
      } */}
    </div>
  )
}

export default DirectoryItem