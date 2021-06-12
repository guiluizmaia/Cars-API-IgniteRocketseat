import { getConnection } from 'typeorm';
import {v4} from 'uuid';
import {hash} from 'bcrypt';

import createConnection from "../index";

async function create(){
    const connection = await createConnection("localhost");

    const id = v4();
    const pass = await hash("admin", 8);

    await connection.query(
        `
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
                values('${id}', 'admin', 'admin@rentx.com.br', '${pass}', true, 'now()', 'XXXXXXX')
        `
    )

    await connection.close();
}

create().then(() => console.log('User admin created!'));