interface Contact{
    id:any;
    name:string;
    email:string;
    phone:string;
    dob:string;
    languages:string[];
    balance:number;
    photo:string[];
}
let editingId:number=0;
const form=document.getElementById("form1") as HTMLFormElement;
const nameInput =document.getElementById("name") as HTMLInputElement;
const emailInput =document.getElementById("email") as HTMLInputElement;
const phoneInput =document.getElementById("phone") as HTMLInputElement;
const dobInput =document.getElementById("date") as HTMLInputElement;
const balanceInput =document.getElementById("balance") as HTMLInputElement;
const selectElement =document.getElementById("multiselect") as HTMLSelectElement;

form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    const name=nameInput.value.trim();
    const email=emailInput.value.trim();
    const phone=phoneInput.value.trim();
    const dob=dobInput.value.trim();
    const balance=parseFloat(balanceInput.value.trim());
    const selectedOption=Array.from(selectElement.selectedOptions).map(option => option.value);
    var profilePhotoFile=(document.getElementById("fileInput") as HTMLInputElement).files?.[0];
    let base64String :string="";
    if (profilePhotoFile)
    {
        base64String=await convertToBase64(profilePhotoFile as File);
    }
    if (editingId !=0)
    {
        const contact:Contact={id:editingId,name:name,email:email,phone:phone,dob:dob,languages:selectedOption,balance:balance,photo:[base64String]

        };
        updateContact(editingId,contact);
    }
    else{
        const  contact:Contact={id:undefined,
            name:name,
            email:email,phone:phone,dob:dob, languages:selectedOption,balance:balance,photo:[base64String]
        };
     addContact(contact);
    }
    form.reset();

});
document.addEventListener('DOMContentLoaded',function()
{
    const form=document.getElementById('form1') as HTMLFormElement;
    renderContacts();
})

function addnewContact(){
    editingId=0;
    form.reset();
}

//Function to convert file to base64 string
async function convertToBase64(file:File):Promise<string> {
    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onloadend=()=>resolve(reader.result as string);
        reader.onerror=reject;
        reader.readAsDataURL(file);
    });
    
}
async function exportToCSV() {
    const exportData=await fetchContacts();
    var output="";
    exportData.forEach(element => {
        output+=element.name+","+element.email+","+element.phone+","+element.dob+","+element.languages.join("-")+","+element.balance+"\n";
        
    });
    const blob=new Blob([output],{type:'text/csv'});
    const url =URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.setAttribute('href',url);
    link.setAttribute('download','contacts.csv');
    document.body.removeChild(link);
    link.click();
    document.body.removeChild(link);
}
async function renderContacts() {
    try{
        const tableBody=document.getElementById('contactTableBody') as HTMLTableSectionElement;
        const contacts =await fetchContacts();
        tableBody.innerHTML='';
        contacts.forEach((contact)=>{
            const row=document.createElement('tr');
            row.innerHTML=`
            <td> ${contact.name} </td>
            <td> ${contact.email} </td>
            <td> ${contact.phone} </td>
            <td> ${contact.dob.split('T')[0].split('-').reverse().join('/')} </td>
            <td> ${contact.languages.join(', ')} </td>
            <td> ${contact.balance} </td>
            <td><img src="${contact.photo[0]}" style =" width:100px;height:auto;" alt="Photo"></td>
            <td>
            <button onclick="editContact('${contact.id}')">Edit</button>
            <button onclick="deleteContact('${contact.id}')">Delete</button>
            </td>
            `;
            tableBody.appendChild(row);
        })
    }catch(error)
    {
        console.error('Error fetching contaccts:',error);
    }
    
}
const url='http://localhost:5229';

async function editContact(id:string)
{
    editingId=parseInt(id);
    const contaccts=await fetchContacts();
    const contact =contaccts.find(contact=>contact.id==editingId);
    if (contact)
    {
        (document.getElementById('name') as HTMLInputElement).value=contact.name;
        nameInput.value=contact.name;
        emailInput.value=contact.email;
        phoneInput.value=contact.phone;
        const dobData=new Date(contact.dob);
        const formattedDOB=dobData.toLocaleDateString("es-CL").split("-");
        const format=formattedDOB[2]+'-'+formattedDOB[1]+"-"+formattedDOB[0];
        dobInput.value=format;
        //multi select element
        if (contact.languages.length>0){
            //set the value of slect element to first languaage in array
            selectElement.value=contact.languages[0];
            //if there are multiple language you may want to select optionns
            for (let i=1;i<contact.languages.length;i++)
            {
                //assuming each language option has unique value
                const languaageOption =selectElement.querySelector(`option[value="${contact.languages[i]}"]`) as HTMLOptionElement | null;
                if (languaageOption)
                {
                    languaageOption.selected=true;

                }
            }
        }
        else{
            //if no languages are specified you may wnat to set a default option or handle it differently
            selectElement.value=""; //or some default value
        }
        balanceInput.value=contact.balance.toString();
    }
}
//   const url='http://localhost:5229';
    async function fetchContacts():Promise<Contact[]> {
        const apiUrl=`${url}/api/contacts`;
        const response =await fetch (apiUrl);
        if (!response.ok)
        {
             throw new Error ('Failed to fetcch contacts');
        }
        return await response.json();
        
    }
    
    async function addContact(contact:Contact):Promise<void> {
        const response =await fetch(`${url}/api/contacts`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(contact)
        });
        if (!response.ok)
        {
            throw new Error('Failed to add contact');
        }
        renderContacts();
    }


async function updateContact(id:number,contact:Contact):Promise<void> {
    const response=await fetch (`${url}/api/Contacts/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(contact)
    });
    if (!response.ok)
    {
        throw  new Error('failed to update contact');
    }
    renderContacts();
    
}
async function deleteContact(id:number):Promise<void> {
    const response=await fetch(`${url}/api/Contacts/${id}`,{
        method:'DELETE'
    });
    if (!response.ok)
        {
            throw  new Error('failed to delete contact');
        }
        renderContacts();
    
}