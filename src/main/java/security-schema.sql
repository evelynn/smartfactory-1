-- User Schema
drop table users if exists cascade;
create table users(
	username varchar_ignorecase(50) not null primary key,
    password varchar_ignorecase(50) not null,
    enabled boolean not null);
drop table authorities if exists cascade;
create table authorities (
    username varchar_ignorecase(50) not null,
    authority varchar_ignorecase(50) not null,
    constraint fk_authorities_users foreign key(username) references users(username));
create unique index ix_auth_username on authorities (username,authority);

-- Group Authorities
drop table groups if exists cascade;
create table groups (
  id bigint generated by default as identity(start with 0) primary key, 
  group_name varchar_ignorecase(50) not null);
  
drop table group_authorities if exists cascade;
create table group_authorities (
  group_id bigint not null, 
  authority varchar(50) not null, 
  constraint fk_group_authorities_group foreign key(group_id) references groups(id));

drop table group_members if exists cascade;
create table group_members (
  id bigint generated by default as identity(start with 0) primary key, 
  username varchar(50) not null, 
  group_id bigint not null, 
  constraint fk_group_members_group foreign key(group_id) references groups(id));
  
-- Persistent Login (Remember-Me) Schema  
drop table persistent_logins if exists cascade;
create table persistent_logins (
  username varchar(64) not null, 
  series varchar(64) primary key,
  token varchar(64) not null, 
  last_used timestamp not null);
  
-- ACL Schema
drop table acl_sid if exists cascade;
create table acl_sid (
  id bigint generated by default as identity(start with 100) not null primary key,
  principal boolean not null,
  sid varchar_ignorecase(100) not null,
  constraint unique_uk_1 unique(sid,principal) );
  
drop table acl_class if exists cascade;
create table acl_class (
  id bigint generated by default as identity(start with 100) not null primary key, 
  class varchar_ignorecase(100) not null, 
  constraint unique_uk_2 unique(class) );
  
drop table acl_object_identity if exists cascade;
create table acl_object_identity (
  id bigint generated by default as identity(start with 100) not null primary key, 
  object_id_class bigint not null, 
  object_id_identity bigint not null, 
  parent_object bigint, 
  owner_sid bigint, 
  entries_inheriting boolean not null, 
  constraint unique_uk_3 unique(object_id_class,object_id_identity), 
  constraint foreign_fk_1 foreign key(parent_object)references acl_object_identity(id), 
  constraint foreign_fk_2 foreign key(object_id_class)references acl_class(id), 
  constraint foreign_fk_3 foreign key(owner_sid)references acl_sid(id) );
  
drop table acl_entry if exists cascade;
create table acl_entry ( 
  id bigint generated by default as identity(start with 100) not null primary key, 
  acl_object_identity bigint not null,ace_order int not null,sid bigint not null, 
  mask integer not null,granting boolean not null,audit_success boolean not null, 
  audit_failure boolean not null,constraint unique_uk_4 unique(acl_object_identity,ace_order), 
  constraint foreign_fk_4 foreign key(acl_object_identity) references acl_object_identity(id), 
  constraint foreign_fk_5 foreign key(sid) references acl_sid(id) );
