const express = require("express");
const {PrismaClient} = require("@prisma/client")

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post("/add", (req,res)=>{
    const title = req.body.title;
    const desc = req.body.description;
    const resText = insertTodo(title,desc);
    return res.json({
        message: resText
    })
})

app.get("/todos", async (req,res)=>{
    const todos = await getAllTodos()
    return res.json({
        "Todos:":todos
    })
})

app.delete("/todo",async (req,res)=>{
    let id = req.query.id;
    try{
        id = Number(id);
    }catch(e)
    {
        console.log(e.message);
        return res.json({
            message: "Please enter valid id"
        });
    }
    const response = await deleteTodo(id);
    return res.json({
        "message:":response
    })
});

app.get("/todo",async (req,res)=>{
    let id = req.query.id;
    console.log("ID: "+id);
    try{
        id = Number(id);
    }catch(e)
    {
        console.log(e.message);
        return res.json({
            message: "Please enter valid id"
        });
    }
    const todo = await getTodo(id);
    if(todo)
    {
        return res.json({
            "Todo:":todo
        }) 
    }
    return res.json({
        message: "No Todos found!"
    })
})

async function getAllTodos()
{
    const todos = await prisma.todos.findMany();
    return todos;
}

async function getTodo(id)
{
    const todo = await prisma.todos.findUnique({
        where: {
            id: Number(id)
        }
    });
    console.log(todo);
    return todo;
}

async function deleteTodo(id)
{
    const msg = await prisma.todos.delete({
        where: {
            id: Number(id)
        }
    })
    
    return msg;
}

async function insertTodo(title,description)
{
    console.log("Insert called")
    const res = await prisma.todos.create({
        data: {
            title,
            description
        }
    });
    console.log(res);
    console.log("Inserted");
    return "Hello";
}

app.listen(3000,()=>{
    console.log("Server Running!")
})
