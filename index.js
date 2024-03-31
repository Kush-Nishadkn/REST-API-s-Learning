const express=require("express");
const app=express();
const port=8080;

const path=require("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'           uuidv4();

 const methodOverride = require('method-override');
 app.use(methodOverride('_method'));



let posts=[
    {
        id:uuidv4(),
        username:"Kush Kumar",
        content:"LoveCoding"
    },
    {
        id:uuidv4(),
        username:"Vishal Kumar",
        content:"Hardwork is the key to Success"
    },
    {
        id:uuidv4(),
        username:"Rajesh Kumar",
        content:"i got Selected by first InternShip"
    },
];


app.use(express.urlencoded ({extended: true}));

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


app.get("/posts",(req,res)  =>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
  
    // res.send("post request working"); 
    let id=uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts"); 
});
// post request checking 
app.get("/posts/:id",(req,res)=>{ 
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id ===p.id);
    console.log(post); 
    res.render("show.ejs",{post});
    // let {username,content}=req.body;
  
    // res.send("post request working");  
    // posts.push({username,content});
    // res.redirect("/posts"); 
});

// giving id and edit post
app.patch("/posts/:id",(req,res) =>{
    let {id}=req.params;
    // console.log(id);
    let newContent=req.body.content;
    console.log(newContent);
    let post=posts.find((p)=>id ===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

// edit posts
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params; 
    let post=posts.find((p)=>id ===p.id);
    res.render("edit.ejs",{post});

});



// delete the posts

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params; 
     posts=posts.filter((p)=>id ===p.id);
    
     res.redirect("/posts");
    
});

app.listen(port,()=>{
    console.log(`listening to port :  ${port}`)

});