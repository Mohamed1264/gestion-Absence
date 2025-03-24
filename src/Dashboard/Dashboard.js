import StartCards from './StartCards';
import BarChart from '../Charts/BarChart';
import QuickActions from './QiuckActions';
import MostAbsence from './MostAbsence';
import DonutCHart from '../Charts/DonutChart';
import { useEffect, useState } from 'react';
import { absenceByYear,styleByYear ,styleAbsenceType , absenceType,absenceByFiliere} from '../Data/AbsenceData';
import { dashboardCardsData } from '../Data/CardsData';
import TimeFilter from '../Components/TimeFilter';
import Container from '../Components/Container';
import { ToastContainer } from 'react-toastify';
import { successNotify } from '../Components/Toast';


export default function Dashboard (){
  const [absence,setAbsence] = useState('Today')
  const [absencebyFields,setAbsenceByFields] = useState('Today')
  useEffect(()=>{
    const message = localStorage.getItem('toastMessage')
    console.log(message);
    
    if(message){
      successNotify(message)
      setTimeout(() => {
        localStorage.removeItem('toastMessage')
      }, 3000);
      
    }
  })
  return (
         <div className='select-none max-w-6xl mx-auto space-y-7 '>
          <ToastContainer pauseOnHover={false} closeButton={false} />
            <QuickActions />

            <div className=" grid grid-cols-2 lg:grid-cols-4  gap-5 ">
                <StartCards dataCards={dashboardCardsData}/>
            </div>
            <Container containerTitle={'Absence'}>
                <TimeFilter selected={absence} setNewTimeRange={setAbsence} />
                <div className="flex flex-col gap-4 md:flex-row items-center justify-around transition-all duration-700 mt-4">
                    <DonutCHart  style={styleAbsenceType} data={absenceType[absence]}/>
                    <DonutCHart  style={styleByYear} data={absenceByYear[absence]}/>
                </div>
            </Container>

            <Container containerTitle={'Absence by Filiere'}>
              <TimeFilter selected={absencebyFields} setNewTimeRange={setAbsenceByFields}/>
              <BarChart data={absenceByFiliere[absencebyFields]}/>
            </Container>
             

            {/* <MostAbsence /> */}

            {/* <AbsentStudentsRanking /> */}
           
           
      </div>        
  );
};      