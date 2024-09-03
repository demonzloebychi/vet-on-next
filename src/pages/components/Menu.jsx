import axios from "axios";
import React, {useEffect, useState} from "react";
import Link from 'next/link'


export default function Menu(){



  return(
    <>
        <ul className="menu">
            <li>
                <Link href='/'>Главная</Link>
            </li>
            <li>
                <Link href='/doctors'>Доктора</Link>
            </li>
            <li>
                <Link href='/blog'>Блог</Link>
            </li>
        </ul>
    </>
  
  )
}