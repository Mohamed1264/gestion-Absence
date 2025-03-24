export const   AMconfig = {
    name : 'absence Manager',
    searchBy : ['matricule','name'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    seeAtt:false,
    permission:false,
    links:{
      edit:'editUser'
    },
    teacherPopUp : false
  }

export const Tconfig = {
    name : 'teacher',
    searchBy : ['matricule','name'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    seeAtt : false,
        permission:false,

    links:{
      edit:'editUser'
    },
    teacherPopUp : false
  }

 export const Sconfig = {
    name : 'student',
    searchBy : ['cef','name'],
    filterBy : ['gender','group','age','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    seeAtt : false,
        permission:false,

    links:{
      profile : 'studentProfile',
      edit:'editStudent'
    },
    teacherPopUp : false
  }

 export const Gconfig = {
    name : 'group',
    searchBy : ['libel'],
    filterBy : ['filiere','year','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    seeAtt:true,
    permission:true,

    links:{
      profile : 'groupProfile',
      edit:'editGroup'
    },
    teacherPopUp : true
  }

export  const Fconfig = {
    name : 'filiere',
    searchBy : ['libel'],
    filterBy : ['niveau','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    seeAtt : false,
        permission:false,

    links:{
      profile : 'filiereProfile',
      edit:'editFiliere'
    },
    teacherPopUp : false
  }
    