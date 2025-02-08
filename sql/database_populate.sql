
/* Create Users */

CREATE OR REPLACE FUNCTION create_user(username text, userRole text, pw text) RETURNS void AS $$
    DECLARE userId uuid := uuid_generate_v4();
    DECLARE hashedPw varchar := crypt(pw, gen_salt('bf')) ;
BEGIN
    INSERT INTO "Users" VALUES (userId, username, userRole, CURRENT_TIMESTAMP);
    INSERT INTO "Auth" VALUES (userId, hashedPw, 'not used');
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