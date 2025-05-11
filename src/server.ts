import http, { ServerResponse } from 'http';
import dotenv from 'dotenv';
import {usersDB} from './database';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = http.createServer((req:any, res:ServerResponse) => {
    console.log(req.url, ' ', req.method, ' ', req.url.split("/").length);

    const id: string = req.url.split("/")[3];
    const getUsers = async () => {
        try {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(usersDB));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server Error" }));
        }
    }

    const getByIdUsers = async (id:string) => {
        try {
            if (uuidValidate(id)) {
                const user = usersDB.find((user) => user.id === id);
            if (!user) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "User not found" }));
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(user));
                res.end();
            }
            } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "not uuid" }));
            res.end();
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server error" }));
        }
    }

    const postUser = async () => {
        try {
            let body = "";
            const parsePost = async () =>{
                req.on("data", (chunk: any) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                   body = JSON.parse(body);
                });
            }
            await parsePost();

            let bodyNew=JSON.parse(body);

            if (bodyNew.username && bodyNew.age && bodyNew.hobbies) {
                let obj: any = {};
                obj['username']=bodyNew.username;
                obj['age']=bodyNew.age;
                obj['hobbies']=bodyNew.hobbies;
                obj['id']=uuidv4();
                usersDB.push(obj);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end();
            } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing required fields" }));
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server Error" }));
        }
    }
    const putUser = async () => {
        let body = "";
            const parsePost = async () =>{
                req.on("data", (chunk: any) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                   body = JSON.parse(body);
                });
            }
            await parsePost();

        let bodyNew=JSON.parse(body);
        console.log(bodyNew);
        try {
            if (uuidValidate(id)) {
            const user = usersDB.find((user) => user.id === id);
                if (!user) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ message: "User not found" }));
                    res.end();
                } else {
                    user['username']=bodyNew.username;
                    user['age']=bodyNew.age;
                    user['hobbies']=bodyNew.hobbies;                   
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(user));
                    res.end();
                }
            } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "not uuid" }));
            res.end();
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server error" }));
        }        
    }

    const deleteUser = async (id:string) => {
        try {
            if (uuidValidate(id)) {
            const user = usersDB.find((user) => user.id === id);
            const index = usersDB.findIndex((user) => user.id === id);
            if (!user) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "User not found" }));
                res.end();
            } else {
                usersDB.splice(index, 1);
                res.writeHead(204, { "Content-Type": "application/json" });
                res.write(JSON.stringify(user));
                res.end();
            }
            } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "not uuid" }));
            res.end();
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server error" }));
        }
    }

    if (req.method === 'GET'){

        if (req.url === '/api/users' || req.url === '/api/users/'){
            getUsers();
        } else if(req.url.split("/")[1]==='api' && req.url.split("/")[2]==='users' && req.url.split("/")[3]!=='' && !req.url.split("/")[4]){
            getByIdUsers(id);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Page not found" }));
        }

    } else if (req.method === 'POST'){
        postUser();
    } else if (req.method === 'PUT'){
        if(req.url.split("/")[1]==='api' && req.url.split("/")[2]==='users' && req.url.split("/")[3]!=='' && !req.url.split("/")[4]){
            putUser();
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Page not found" }));
        }
    } else if (req.method === 'DELETE'){
        if(req.url.split("/")[1]==='api' && req.url.split("/")[2]==='users' && req.url.split("/")[3]!=='' && !req.url.split("/")[4]){
            deleteUser(id);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Page not found" }));
        }
        
    }

})

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})