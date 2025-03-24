export const   AMconfig = {
    name : 'absence Manager',
    searchBy : ['matricule','fullName'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    links:{
      edit:'editUser'
    },
    moreInfo : false,
    action : true,
    columns : [
      {colName : 'Matricule',accessor : 'matricule'},
      {colName : 'Full Name',accessor : 'fullName'},
      {colName : 'Age',accessor : 'age'},
      {colName : 'Gender',accessor : 'gender'},
    ],
    key :'matricule'

}

export const Tconfig = {
    name : 'teacher',
    searchBy : ['matricule','fullName'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    links:{
      edit:'editUser'
    },
    moreInfo : true,
    action : true,
    columns :  [
    {colName : 'Matricule',accessor : 'matricule'},
    {colName : 'Full Name',accessor : 'fullName'},
    {colName : 'Gender',accessor : 'gender'},
    {colName : 'Age',accessor : 'age'},
    {colName : 'Today`s Absences',accessor : 'todaysAbsences'},
    { colName : 'Total Groups',accessor : 'totalGroups'},
    
    ],
     key :'matricule'
  }

 export const Sconfig = {
    name : 'student',
    searchBy : ['cef','fullName'],
    filterBy : ['gender','group','age','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'studentProfile',
      edit:'editStudent'
    },
    moreInfo : false,
    action : true,
    columns :  [
      {colName : 'CEF',accessor : 'cef'},
      {colName : 'Full Name',accessor : 'fullName'},
      {colName : 'Age',accessor : 'age'},
      {colName:'Gender',accessor:'gender'},
     { colName : 'Group',accessor : 'group'},
     { colName : 'Total Absence',accessor : 'totalAbsence'},
     
     
    ],
     key :'cef'
  }

 export const Gconfig = {
    name : 'group',
    searchBy : ['libel'],
    filterBy : ['filiere','year','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'groupProfile',
      edit:'editGroup'
    },
    moreInfo : true,
    action : true,
    columns: [
          {colName:'Libel',accessor : 'libel'},
          {colName:'Filiere',accessor : 'filiere'},
          {colName:'Year',accessor : 'year'},
          {colName:'Number students',accessor : 'numberStudents'},
          {colName:'Total Absence',accessor : 'totalAbsence'},
          {colName:'Today Absence',accessor : 'todayAbsence'},
          
        
        ],
         key :'idGroup'

  }

export  const Fconfig = {
    name : 'filiere',
    searchBy : ['libel'],
    filterBy : ['niveau','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'filiereProfile',
      edit:'editFiliere'
    },
    moreInfo : false,
    action : true,
    columns :  [
          
          {colName:'Libel',accessor : 'libel'},
          {colName:'Niveau',accessor : 'niveau'},
          {colName:'Number Groups',accessor : 'numberGroup'},
          {colName:'Total Absence',accessor : 'totalAbsence'},
        ],
         key :'idFiliere'
  }

  export  const Rconfig = {
    name : 'room',
    searchBy : ['roomName'],
    filterBy : false,
    resetPassword : false,
    dropDown : true,
    profile : false,
    links:{
      schedule : 'roomSchedule',
      edit:'editRoom'
    },
    moreInfo : true,
    action : true,
    columns :  [
          
          {colName:'Room Name',accessor : 'roomName'},
          {colName:'IS Empty Now',accessor : 'isEmpty'},

        ],
         key :'idRoom'
  }
    