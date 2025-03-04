using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContextAPI.Model
{
    public class Contacts
    {
        public int ID{get;set;}
        public string Name{get;set;}
        public string Email{get;set;}
        public string Phone{get;set;}
        public DateTime  DOB{get;set;}
        public string [] Languages{get;set;}
        public double Balance{get;set;}
        public string [] Photo{get;set;}
    }
}