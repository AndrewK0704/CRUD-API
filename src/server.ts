import http, { ServerResponse } from 'http';
import dotenv from 'dotenv';
import {usersDB} from './database';
import { validate as uuidValidate } from 'uuid';

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