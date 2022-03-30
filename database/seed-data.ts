
interface SeedData{
    entries:SeedEntry[];
}

interface SeedEntry{
    description:string;
    createAt:number;
    status:string;
}

export const seedData:SeedData = {
    entries:[
        {
            description:'Pendiente: lorem10asfdsfds fdsfdsf',
            status:'pending',
            createAt:Date.now(),
        },
        {
            description:'En Progreso: lorem10asfdsfds fdsfdsf',
            status:'in-progress',
            createAt:Date.now()-100000,
        },
        {
            description:'Terminadas: lorem10asfdsfds fdsfdsf',
            status:'finished',
            createAt:Date.now()-100000000,
        },
    ]
}