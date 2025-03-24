import { Users,UserX,School,UserCog ,UserPen ,GraduationCap , PencilRuler ,Presentation,CalendarFold  } from "lucide-react"

const icon_size = 28

export const  groupProfileCardsData = [
    [ {
         title:'Total Students',
         nbr: 21,
         icon : <Users size={icon_size}/>,
         style : 'text-sky-700 bg-sky-300 '
         
       },
     {
       title:'Total Absence ',
       nbr: 20,
       icon : <UserX size={icon_size}/>,
       style : 'text-gray-700 bg-gray-300 '
      
     }],
    
     [{
       title:'Today Absence',
       nbr: 4,
       icon : <UserX size={icon_size}/>,
      style: 'text-red-700 bg-red-300 '
    
     },  
     
     {
       title:'Yesterday Absence',
       nbr: 0,
       icon : <UserX size={icon_size}/>,
        style :   'text-yellow-700 bg-yellow-300 '
     }],
     
    
   ]

export const  filiereProfileCardsData = [
    [
      {
        title:'Total Groups',
        nbr: 21,
        icon : <School size={icon_size}/>,
         style: 'text-lime-700 bg-lime-300'
      
        
      },
      {
      title:'Total Absence ',
      nbr: 20,
      icon : <UserX size={icon_size}/>,
      style: 'text-gray-700 bg-gray-300'
   

     
    }
    ],
    [{
      title:'Today Absence',
      nbr: 4,
      icon : <UserX size={icon_size}/>,
       style: 'text-red-700 bg-red-300'
      
   
    },
    
    {
      title:'Yesterday Absence',
      nbr: 0,
      icon : <UserX size={icon_size}/>,
       style: 'text-yellow-700 bg-yellow-300'
      
      
    }],
    
   
  ]


export const  dashboardCardsData = [
   
   [ {
      title:' Stagiaires',
      nbr: 2000,
      icon : <GraduationCap size={icon_size}/>,
      style :'bg-sky-300  text-sky-700 ',
     
    },
    {
      title:' Absence',
      nbr: 100,
      icon : <UserX size={icon_size}/>,
      style :'bg-red-300  text-red-700 ',
     
    }
  ],
   [ {
      title:' Filieres',
      nbr: 30,
      icon : <PencilRuler size={icon_size}/>,
      style :'bg-indigo-300  text-blue-700 ',
      
    },
    {
      title:' Groupes',
      nbr: 90,
      icon : <Presentation size={icon_size}/>,
      style :'bg-lime-300  text-lime-700 ',
     
    }],
    [{
      title:' Salles',
      nbr: 30,
      icon : <School size={icon_size}/>,
      style :'bg-purple-300  text-purple-700 ',
      
    },
    {
      title:' Emplois du temps',
      nbr: 120,
      icon : <CalendarFold size={icon_size}/>,
      style :'bg-teal-300  text-teal-700 ',
     
    }
    ]
    
   
  ]