using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using ContextAPI.Model;

namespace ContextAPI.Controller
{
        [Route("api/[controller]")]
        [ApiController]
    public class ContactsController:ControllerBase
    {
        private static List<Contacts> _Contacts = new List<Contacts>
        {
            // Add more Contacts here if needed
            new Contacts { ID = 1, Name = "Ravi", Email = "wYUeh@example.com", Phone = "1234567890",
             DOB = new DateTime(1999,11,17), Languages = new string[] { "Tamil", "English" }, Balance = 100.5,  
                Photo = new string[]
                {
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAE0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                } },
            new Contacts { ID = 2, Name = "Chandran", Email = "wYUeh@example.com", Phone = "1234567890",DOB = new DateTime(1999,11,17),Languages = new string[] { "Tamil", "English"}, Balance = 20.5,Photo = new string[]
                {
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAE0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                } },
            new Contacts { ID = 3, Name = "Baskaran", Email = "wYUeh@example.com", Phone = "1234567890",DOB = new DateTime(1999,11,16), Languages = new string[] {"Tamil", "English"}, Balance = 100.5,Photo = new string[]
                {
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAE0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                } },
        };
    
    [HttpGet]
    public IActionResult GetContacts()
    {
        return Ok(_Contacts);
    }
    //GET :api/Contacts/1
    [HttpGet("{id}")]
    public IActionResult GetMedicine (int id)
    {
        var medicine=_Contacts.Find(m=>m.ID==id);
        if (medicine == null)
        {
            return NotFound();
        }
        return Ok (medicine);
    }
    [HttpPost]
    public IActionResult PostMedicine([FromBody] Contacts medicine)
    {
        medicine.ID=_Contacts.Count+1;
        _Contacts.Add(medicine);
        //you ,ight want to return createdataction or another appropiate response
        return Ok();
    }
    [HttpPut("{id}")]
    public IActionResult Putmedicinbe(int id,[FromBody]Contacts medicine)
    {
        var index=_Contacts.FindIndex(m=>m.ID==id);
        if (index<0)
        {
            return NotFound();
        }
        _Contacts[index]=medicine;
        //you might wnat to return nocontent or another appropiate response
        return Ok();
    }
    [HttpDelete("{id}")]
    public IActionResult  DeleteContact(int id)
    {
        var medicine=_Contacts.Find(m=>m.ID==id);
        if (medicine==null)
        {
            return NotFound();
        }
        _Contacts.Remove(medicine);
        //you might want to return Nocontent or another appropiate response
        return Ok();
    }
}
}