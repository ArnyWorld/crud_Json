const express = require('express');
const res = require('express/lib/response');

const app = express();
const PORT = 3000;

app.use(express.json());

const service = require('./src/services');

app.get('/',(request, response)=>{
    try{
        response.json({
            state:true,
            message: "list users",
            body:service.getUsers()
        })
    }catch(error){
        res.status(500).send('Hubo un error');
    }
})

app.get('/:id',(request, response)=>{
    
    //let id = request.params.id;
    try{
     let {params:{id}} = request;

            let user = service.getUser(id)
            if(user){
                response.json({
                    state:true,
                    message: 'User selected',
                    body:user
                })       
            }else{
                response.json({
                    state:false,
                    message: 'User not found'
                })
            }
    }catch(error){
        response.status(500).json({
            state:false,
            message: 'Error'   
        })
    }
})

app.post('/create',(request, response)=>{
    //let newUser = body.request;
    try{

        let {body: newUser} = request;
        if(Object.entries(newUser).length != 0){
            let user = service.createUser(newUser);
            response.status(201).json({
                state:true,
                message: 'User created successfully',
                body:user
            })
        }else{
            response.json({
                state:false,
                message: 'Empty Fields'
            })
        }
   
    }catch(error){
        response.status(500).json({
            state:true,
            message: 'Errror'
        })
    }
})

app.put('/:id',(request, response)=>{
    
    try{
        let {params:{id}} = request;
        if(id){    
            let {body:userModified} = request
            let user = service.modifyUser(id, userModified);
            if(user){
                response.status(201).json({
                    state:true,
                    message: 'User modified',
                    body:user
                })
            }else{
                response.json({
                    state:false,
                    message: 'User not found'
                })
            }
        }else{
            response.status(404).json({
                state:false,
                message: 'Enter your ID'   
            })    
        }
    }catch(error){
        response.status(500).json({
            state:false,
            message: 'Error'   
        })
    }
    })
    
    app.delete('/:id', (request, response)=>{
    try{
        let {params:{id}} = request;
        if(id){
            let user = service.deleteUser(id);
                if(user){
                    response.json({
                        state:true,
                        message: 'User deleted',
                        body:user
                    })    
                }else{
                    response.json({
                        state:false,
                        message: 'User not found'
                    })
                }
        }
        else{
            response.json({
                state:false,
                message: 'Enter your ID'
            })
        }

    }catch(error){
        response.status(500).json({
            state:false,
            message: 'Error'   
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);

})
