export  const absenceByYear= {
    Today : [
      {
        type : 'first year',
        title : 'Première année',
        value : 20
    },
    {
        type : 'second year',
        title : 'Deuxième année',
        value : 1
    },
    {
        type : 'third year',
        title : 'Troisième année',
        value : 3
    },
    ],
    Yesterday : [
      {
        type : 'first year',
        value : 2
    },
    {
        type : 'second year',
        value : 20
    },
    {
        type : 'third year',
        value : 10
    },
    ],
    'Last Week' : [
      {
        type : 'first year',
        value : 40
    },
    {
        type : 'second year',
        value : 20
    },
    {
        type : 'third year',
        value : 30
    },
    ],
    'Last Month' : [
      {
        type : 'first year',
        value : 100
    },
    {
        type : 'second year',
        value : 50
    },
    {
        type : 'third year',
        value : 30
    },
    ],
    'All Time' : [
      {
        type : 'first year',
        value : 120
    },
    {
        type : 'second year',
        value : 70
    },
    {
        type : 'third year',
        value : 50
    },
    ],

   
  }

export const styleByYear = {
    'first year' : {
    
    style:'bg-blue-500 dark:bg-blue-300 text-blue-50 dark:text-blue-700',
   
    stroke:'stroke-blue-500 dark:stroke-blue-300',
  
  },
  'second year' : {
    style:'bg-purple-400 dark:bg-purple-300 text-purple-50 dark:text-purple-700',
    stroke:'stroke-purple-400 dark:stroke-purple-300',
  },
  'third year' : {
    style:'bg-cyan-400 dark:bg-cyan-300 text-cyan-50 dark:text-cyan-700',
    stroke:'stroke-cyan-400 dark:stroke-cyan-300',
  }
  }

export const  absenceType = {
    Today : [
        {type:'absence',value:10},
        {type:'retard',value:16},
    ],
    Yesterday : [
        {type:'absence',value:10},
        {type:'retard',value:50},
    ],
    'Last Week' : [
        {type:'absence',value:100},
        {type:'retard',value:44},
    ],
    'Last Month' : [
        {type:'absence',value:140},
        {type:'retard',value:88},
    ],
    'All Time' : [
        {type:'absence',value:200},
        {type:'retard',value:160},
    ],
   
}

export  const styleAbsenceType = {
    absence : {
    
    style:'bg-red-500 dark:bg-red-300 text-red-50 dark:text-red-700',
   
    stroke:'stroke-red-500 dark:stroke-red-300',
 
  },
  retard : {
    style:'bg-orange-400 dark:bg-orange-300 text-orange-50 dark:text-orange-700',
    stroke:'stroke-orange-400 dark:stroke-orange-300',
  }
  }


export const absenceByFiliere = {
  Today: [
   
    {
      label: 'Gestion d`entreprise',
      shortCut: 'GE',
      value: 15,
      groups: [
        { label: 'GS101', value: 8 },
        { label: 'GS201', value: 7 },
      ],
    },
    {
      label: 'Infrastructure Digital',
      shortCut: 'ID',
      value: 20,
      groups: [
        { label: 'ID101', value: 7 },
        { label: 'ID201', value: 5 },
        { label: 'ID202', value: 8 },
      ],
    },
    {
      label: 'Genie Civil',
      shortCut: 'GC',
      value: 10,
      groups: [
        { label: 'GC201', value: 1 },
        { label: 'GC203', value: 4 },
        { label: 'GC204', value: 5 },
      ],
    },
  ],
  Yesterday: [
    {
      label: 'Developement Digital',
      shortCut: 'DD',
      value: 10,
      groups: [
        { label: 'DEV101', value: 6 },
        { label: 'DEV102', value: 2 },
        { label: 'DEVOWFS201', value: 2 },
      ],
    },
    {
      label: 'Gestion d`entreprise',
      shortCut: 'GE',
      value: 5,
      groups: [
        { label: 'GS101', value: 2 },
        { label: 'GS201', value: 3 },
      ],
    },
    {
      label: 'Infrastructure Digital',
      shortCut: 'ID',
      value: 20,
      groups: [
        { label: 'ID101', value: 7 },
        { label: 'ID201', value: 5 },
        { label: 'ID202', value: 8 },
      ],
    },
    {
      label: 'Genie Civil',
      shortCut: 'GC',
      value: 10,
      groups: [
        { label: 'GC201', value: 1 },
        { label: 'GC203', value: 4 },
        { label: 'GC204', value: 5 },
      ],
    },
  ],
  'Last Week': [
    {
      label: 'Developement Digital',
      shortCut: 'DD',
      value: 5,
      groups: [
        { label: 'DEV101', value: 2 },
        { label: 'DEV102', value: 2 },
        { label: 'DEVOWFS201', value: 1 },
      ],
    },
    {
      label: 'Gestion d`entreprise',
      shortCut: 'GE',
      value: 15,
      groups: [
        { label: 'GS101', value: 8 },
        { label: 'GS201', value: 7 },
      ],
    },
    {
      label: 'Infrastructure Digital',
      shortCut: 'ID',
      value: 20,
      groups: [
        { label: 'ID101', value: 7 },
        { label: 'ID201', value: 5 },
        { label: 'ID202', value: 8 },
      ],
    },
    {
      label: 'Genie Civil',
      shortCut: 'GC',
      value: 10,
      groups: [
        { label: 'GC201', value: 1 },
        { label: 'GC203', value: 4 },
        { label: 'GC204', value: 5 },
      ],
    },
  ],
  'Last Month': [
    {
      label: 'Developement Digital',
      shortCut: 'DD',
      value: 5,
      groups: [
        { label: 'DEV101', value: 2 },
        { label: 'DEV102', value: 2 },
        { label: 'DEVOWFS201', value: 1 },
      ],
    },
    {
      label: 'Gestion d`entreprise',
      shortCut: 'GE',
      value: 15,
      groups: [
        { label: 'GS101', value: 8 },
        { label: 'GS201', value: 7 },
      ],
    },
    {
      label: 'Infrastructure Digital',
      shortCut: 'ID',
      value: 20,
      groups: [
        { label: 'ID101', value: 7 },
        { label: 'ID201', value: 5 },
        { label: 'ID202', value: 8 },
      ],
    },
    {
      label: 'Genie Civil',
      shortCut: 'GC',
      value: 10,
      groups: [
        { label: 'GC201', value: 1 },
        { label: 'GC203', value: 4 },
        { label: 'GC204', value: 5 },
      ],
    },
  ],
  'All Time': [
    {
      label: 'Developement Digital',
      shortCut: 'DD',
      value: 5,
      groups: [
        { label: 'DEV101', value: 2 },
        { label: 'DEV102', value: 2 },
        { label: 'DEVOWFS201', value: 1 },
      ],
    },
    {
      label: 'Gestion d`entreprise',
      shortCut: 'GE',
      value: 15,
      groups: [
        { label: 'GS101', value: 8 },
        { label: 'GS201', value: 7 },
      ],
    },
    {
      label: 'Infrastructure Digital',
      shortCut: 'ID',
      value: 20,
      groups: [
        { label: 'ID101', value: 7 },
        { label: 'ID201', value: 5 },
        { label: 'ID202', value: 8 },
      ],
    },
    {
      label: 'Genie Civil',
      shortCut: 'GC',
      value: 10,
      groups: [
        { label: 'GC201', value: 1 },
        { label: 'GC203', value: 4 },
        { label: 'GC204', value: 5 },
      ],
    },
  ],
};

export const absenceDataByGender= {
    'All Time' : [
        {
            name : 'Male',
            retard :20,
            absence : 20
        },
        {
            name : 'Female',
            retard :30,
            absence : 8
        },
    ],
    'Today':[
        {
            name : 'Male',
            retard :6,
            absence : 1
        },
        {
            name : 'Female',
            retard :2,
            absence : 0
        },
    ],
    'Yesterday':[
        {
            name : 'Male',
            retard :0,
            absence : 1
        },
        {
            name : 'Female',
            retard :1,
            absence : 3
        },
    ],
    'Last Week':[
        {
            name : 'Male',
            retard :7,
            absence : 5
        },
        {
            name : 'Female',
            retard :8,
            absence : 4
        },
    ],
    'Last Month':[
        {
            name : 'Male',
            retard :5,
            absence : 8
        },
        {
            name : 'Female',
            retard :0,
            absence : 0
        },
    ]
    
}