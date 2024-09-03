//кнопка назад
import axios from "axios";
import React, {useEffect, useState} from "react";
import Link from 'next/link'
import Router from 'next/router'

export default function BackButton(){



  return(
    <>
               <div onClick={() => Router.back()}>Go Back</div>
      
    </>
  
  )
}