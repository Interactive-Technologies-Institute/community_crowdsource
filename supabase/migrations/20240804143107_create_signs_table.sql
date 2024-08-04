create table signs (
    id serial primary key,
    annotated boolean not null,
    annotation text,
    annotation_array integer[] not null,
    created_at timestamp not null,
    is_annotated integer not null,
    last_changed timestamp not null,
    name varchar(255) not null,
    selected boolean not null,
    theme text[] not null,
    video text not null,
    written_annotation text[] 
);