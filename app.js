const express = require("express")

module.exports = app =>{
  app.use(express.static(__dirname+"/"))
  app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/register.html")
  }) 
  
  app.get("/login", (req,res)=>{
    res.sendFile(__dirname+"/login.html")
  })

  app.get("/home", (req, res)=>{
    res.sendFile(__dirname+"/home.html")
  })

  app.get("/profile", (req,res)=>{
    res.sendFile(__dirname+"/profile.html")
  })

  app.get("/profile/update", (req,res)=>{
    res.sendFile(__dirname+"/updateProfile.html")
  })
}
