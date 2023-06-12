import express from 'express';

const app = express();
app.use(express.json());

let tasks = [];

function validate(task){
    if(isNaN(task.id))
        return false;

    if(tasks.some(i=> i.id == task.id))
        return false;

    if(isNaN(task.priority))
        return false;

    if(task.priority < 1 || task.priority > 5)
        return false;

    return true;
}
app.post('/tasks', (req, res, next) => {
    if(validate(req.body)){
        tasks.push(req.body);
        res.send(tasks)
    }
    else{
        res.send("somthing is wrong")
    }
    
})

app.put("/tasks/:id",(req, res, next) => {

    if(validate(req.body)){

        tasks.forEach((element, index) => {
            if(element.id === tasks.id) {
                tasks[index] = req.body;
            }
        });

        res.send(tasks)
    }
    else{
        res.send("somthing is wrong")
    }

    
    res.send(req.body)
})

app.get('/tasks/:id', (req, res, next) => {
    res.send(tasks.find((i)=>i.id=req.params.id))
})

app.get('/tasks', (req, res, next) => {
    
    res.send(tasks)
})

app.delete('/tasks/:id', (req, res, next) => {
    
    tasks = tasks.filter((i)=>{
        return i.id != req.params.id;
    })
    res.send(tasks)
})

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);

