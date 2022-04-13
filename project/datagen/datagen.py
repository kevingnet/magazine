#!/usr/bin/python

import os
import pandas as pd
import string
import itertools
import random
from collections import defaultdict 
from itertools import combinations
from faker import Faker


fake = Faker();

def get_substat():
    return 3

def get_constat():
    return 8

def get_category():
    return random.sample(range(5,10), 1);

def get_rating():
    return random.sample(range(4,6), 1);
    
def get_publisher():
    return random.sample(range(4,100), 1);
    
def get_subscriber():
    return random.sample(range(4,100), 1);
    
def get_content():
    return random.sample(range(4,100), 1);
   
   
#for comb in range(2):
for comb in range(50000):
    sta = get_constat();
    cat = get_category()[0];
    rat = get_rating()[0];
    pub = get_publisher()[0];
    record = '1,{},{},{},{},"{}"'.format(cat,rat,sta,pub,fake.text());
    print(record);

"""

   
#for comb in range(2):
for comb in range(50000):
    sta = get_substat();
    sub = get_subscriber()[0];
    con = get_content()[0];
    record = '{},{},{}'.format(sta,con,con);
    print(record);


   
#for comb in range(2):
for comb in range(50000):
    sta = get_constat();
    cat = get_category()[0];
    rat = get_rating()[0];
    pub = get_publisher()[0];
    record = '1,{},{},{},{},{}'.format(cat,rat,sta,pub,fake.text());
    print(record);

      
#for comb in range(2):
for comb in range(150000):
    #rdata = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(14));
    fname = fake.first_name();
    lname = fake.last_name();
    name = "{} {}".format(fname,lname);
    username = "{}{}".format(fname,lname);
    email = "{}@{}.com".format(username,fake.domain_name());
    pwd = 'password';
    token = 'TOKENTOKENTOKENTOKENTOKENTOKEN';
    
    record = '"{}","{}","{}","{}","{}",5'.format(name,username,email,pwd,token);
    print(record);
    
#for comb in range(2):
for comb in range(1000000):
    rdataf = ''.join(random.choice(string.ascii_lowercase) for _ in range(6));
    rdatal = ''.join(random.choice(string.ascii_uppercase) for _ in range(6));
    rdata = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(14));
    name = "{} {}".format(rdataf,rdatal);
    username = "{}_{}".format(rdataf,rdatal);
    email = "{}@{}.com".format(username,fake.domain_name());
    pwd = 'password';
    token = 'TOKENTOKENTOKENTOKENTOKENTOKEN';
    
    record = '"{}","{}","{}","{}","{}",5'.format(name,username,email,pwd,token);
    print(record);
    
    


categ
5	Comedy	2022-04-05 10:46:10	2022-04-05 10:46:10
6	Drama	2022-04-05 10:46:10	2022-04-05 10:46:10
7	Fantasy	2022-04-05 10:46:10	2022-04-05 10:46:10
8	Suspense	2022-04-05 10:46:10	2022-04-05 10:46:10
9	Romance	2022-04-05 14:45:35	2022-04-05 14:45:35
10	Horror	2022-04-05 14:45:35	2022-04-05 14:45:35
11	Experimental	2022-04-05 14:45:35	2022-04-05 14:45:35
12	Historical	2022-04-05 14:45:35	2022-04-05 14:45:35
13	Crime	2022-04-05 14:45:35	2022-04-05 14:45:35
14	Animation	2022-04-05 14:45:35	2022-04-05 14:45:35
15	Science	2022-04-05 14:45:35	2022-04-05 14:45:35
16	Fiction Thriller	2022-04-05 14:45:35	2022-04-05 14:45:35
17	Western	2022-04-05 14:45:35	2022-04-05 14:45:35
18	Other	2022-04-05 14:45:35	2022-04-05 14:45:35

contentstat 8
5	Deleted	2022-04-05 10:46:10	2022-04-05 10:46:10
6	Disabled	2022-04-05 10:46:10	2022-04-05 10:46:10
7	InProgress	2022-04-05 10:46:10	2022-04-05 10:46:10
8	Published	2022-04-05 10:46:10	2022-04-05 10:46:10

rating 4 5 6
4	All	2022-04-05 10:46:10	2022-04-05 10:46:10
5	Mature	2022-04-05 10:46:10	2022-04-05 10:46:10
6	Teen	2022-04-05 10:46:10	2022-04-05 10:46:10

subsstat 3
3	Allowed	2022-04-05 10:46:10	2022-04-05 10:46:10
4	Pending Payment	2022-04-05 10:46:10	2022-04-05 10:46:10


http://ec2-54-193-249-61.us-west-1.compute.amazonaws.com
header = "INSERT INTO magazine.`Users` (name,username,email,password,token,idRole) VALUES";
footer = "('Invalid Dude','InvalidDude','invalid@invaliddns.org','000','000',5);"
#print(header)	 



('Kevin Guerra','kevingnet','kevingnet@gmail.com','123456','123456',8),
data = pd.DataFrame({"A" : ["John","Deep","Julia","Kate","Sandy"], 
                     "MonthSales" : [25,30,35,40,45]})


"""
