using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace server.Controllers
{
    [Route("api/[controller]")]
    public class ChessController : Controller{

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            string fileName = "./savedGames/" + id +".json";

            string result = @"";
            try{
                result = System.IO.File.ReadAllText(fileName);
             }
             catch{
                return null;
             }
             return result;
            
        }
        
        // POST api/values
        [HttpPost]
        public int Post([FromBody]JToken body)
        {
            
            //Generate random file number.
            Random rnd = new Random();
            int gameNo = rnd.Next(1, 99999);
            string fileName = @"./savedGames/" +gameNo + @".json";

            //Check file is unique
            while(System.IO.File.Exists(fileName)){
                gameNo = rnd.Next(1, 99999);
                fileName = @"./savedGames/" +gameNo + @".json";
            }

            //write game to file
            System.IO.File.WriteAllText(fileName, body.ToString());

            return gameNo;
        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

    }
}
