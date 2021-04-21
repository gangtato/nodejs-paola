### PAOLA SERVER
### create by: Aldi Leonardo William

##### Running Project on project root terminal: 
#
>**npm run go**
### 
**1. route access api GET Method contact:**
route: api/contacts?q=aldi&p=0895800132436
example: 
- localhost:3000/api/contacts (defaults)
- localhost:3000/api/q=aldi (search by name)
- localhost:3000/api/p=0895800132436 (search by phone)

**2. route access api POST Method contact:**
route: api/contacts
params: 
- name => string, *required*
- phoneNumber => string, *required*
- address => string, *required*
- picture => file image, *required*

example:
- localhost:3000/api/contacts

**3. route access api PUT Method contact:**
route: api/contacts/<id>
params:
- id => objectID, *required*
- name => string, 
- phoneNumber => string,
- address => string,
- picture => file image

example:
- localhost:3000/api/contacts/607fe08b0699e32580e83880

**4. route access api DELETE Method contact:**
route: api/contact/:id
params:
- id => objectID, *required*

example:
- localhost:3000/api/contacts/607fe08b0699e32580e83880
       