const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const namelist = ["student1","student2","student3","student4","student5","student6","student7","student8","student9","student10",
                    "student11","student12","student13","student14","student15","student16","student17","student18","student19","student20"]
const data_to_add = [
    {student_id: 10004001, average_grade: 0, full_name:"student1", grades:[], term:0},
    {student_id: 10004002, average_grade: 0, full_name:"student2", grades:[], term:0},
    {student_id: 10004003, average_grade: 0, full_name:"student3", grades:[], term:0},
    {student_id: 10004004, average_grade: 0, full_name:"student4", grades:[], term:0},
    {student_id: 10004005, average_grade: 0, full_name:"student5", grades:[], term:0},
    {student_id: 10004006, average_grade: 0, full_name:"student6", grades:[], term:0},
    {student_id: 10004007, average_grade: 0, full_name:"student7", grades:[], term:0},
    {student_id: 10004008, average_grade: 0, full_name:"student8", grades:[], term:0},
    {student_id: 10004009, average_grade: 0, full_name:"student9", grades:[], term:0},
    {student_id: 10004010, average_grade: 0, full_name:"student10", grades:[], term:0},
    {student_id: 10004011, average_grade: 0, full_name:"student11", grades:[], term:0},
    {student_id: 10004012, average_grade: 0, full_name:"student12", grades:[], term:0},
    {student_id: 10004013, average_grade: 0, full_name:"student13", grades:[], term:0},
    {student_id: 10004014, average_grade: 0, full_name:"student14", grades:[], term:0},
    {student_id: 10004015, average_grade: 0, full_name:"student15", grades:[], term:0},
    {student_id: 10004016, average_grade: 0, full_name:"student16", grades:[], term:0},
    {student_id: 10004017, average_grade: 0, full_name:"student17", grades:[], term:0},
    {student_id: 10004018, average_grade: 0, full_name:"student18", grades:[], term:0},
    {student_id: 10004019, average_grade: 0, full_name:"student19", grades:[], term:0},
    {student_id: 10004020, average_grade: 0, full_name:"student20", grades:[], term:0},  
]

async function main(){
    
    const client = new MongoClient(url);

    try{
        await client.connect();
        await Setup(client,data_to_add);
        await Generating_grade(client,namelist);
        await display(client);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }

}
main().catch(console.error)

async function Setup(client, listing){
    const data = await client.db("sutd").collection("students").insertMany(listing);
    console.log(`${data.insertedCount} new listings created with the following ids:`);
    console.log(data.insertedIds);

}
async function Generating_grade(client,namelist){
    let count = 1;
    for(let i=0; i<namelist.length; i++){
        const gradelist =[];
        let term = 0;


        for (let j =0; j<8; j++){
            const a = Math.floor(Math.random() * 101);
            const b = Math.floor(Math.random() * 101);
            const c = Math.floor(Math.random() * 101);
            const d = Math.floor(Math.random() * 101);  //generating grades and calculate avg at the same time
            gradelist.push(a);
            gradelist.push(b);
            gradelist.push(c);
            gradelist.push(d);
            term++;
            
        }
        var avg = cal_avg(gradelist);
        var myquery = { full_name:namelist[i] };
        var newvalues = { $set: {grades: gradelist, term:term ,average_grade:avg} };
            //updating

        const result = await client.db("sutd").collection("students").updateOne(myquery,newvalues);
        console.log("Generating grades and calculate avg for student"+count);
        count = count+1;


    }

}
function cal_avg(list){
    let sum = 0;
    for(let i=0; i< list.length; i++){
        sum = sum + list[i];

    }
    avg = sum/list.length;
    return avg

}
async function display(client){
    const data = await client.db("sutd").collection("students").find({}).sort({average_grade:-1}).toArray();
    data.forEach(element => {
        console.log(element);
        
    });

}