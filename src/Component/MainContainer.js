import React from 'react'
import ContentData from "../db/contentdata.json"

const MainContainer = () => {
  return (
    <main>
       {ContentData.map((props, index) => <div key={index} className='showproject'><span className="material-symbols-outlined">{props.icon}</span> <br/> {props.title}</div>)} 
    </main>
  )
}

export default MainContainer
