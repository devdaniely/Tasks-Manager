
/* Create Users */

CREATE OR REPLACE FUNCTION create_user(userName text, userRole text, pw text) RETURNS void AS $$

    DECLARE hashedPw varchar := crypt(pw, gen_salt('bf')) ;
    BEGIN
        -- Insert into Users and return the generated UUID
        WITH new_user AS (
            INSERT INTO Users (username, role, created_at) 
            VALUES (userName, userRole, NOW())
            RETURNING id
        )
        -- Insert into Auth using the same UUID
        INSERT INTO Auth (id, hash_pw, salt)
        VALUES ((SELECT id FROM new_user), hashedPw, 'not used');
    END;
$$ LANGUAGE plpgsql;


DO $$ BEGIN
    PERFORM "create_user"('daniel', 'admin', 'password');
    PERFORM "create_user"('ari', 'admin', 'password1');
    PERFORM "create_user"('hairy', 'user', 'password2');
    PERFORM "create_user"('rom', 'user', 'password3');
    PERFORM "create_user"('hermyone', 'user', 'password4');
    PERFORM "create_user"('dumbledork', 'user', 'password5');
END $$;

/* Create Tasks */