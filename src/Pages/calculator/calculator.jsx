import React from 'react'
import Navigation from '../../components/navigation/navigation.component'

const Calculator = () => {
   return (
      <div data-test='component-calculator' >
         <Navigation />
         <div>
            <form action="">
               <label >Moc instalacji</label>
               <input type="number" />
            </form>
            <label >rodzaj klienta</label>
            <select id='client' name='klient'>
               <option value="client">rodzaj klienta</option>
               <option value="ind8%">indywidualny 8%</option>
               <option value="ind23%">indywidualny 23%</option>
               <option value="company23%">firma 23%</option>
               <option value="5">rolnik 8%</option>
               <option value="6">rolnik 23%</option>
            </select>
         </div>
      </div>
   )
}

export default Calculator
