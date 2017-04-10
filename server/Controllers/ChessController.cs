using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    public class ChessController : Controller
    {[Produces("text/html")]
    public string Get() 
    {
        return "<html><body>Hello World</body></html>";
    // var path = "../index.html";
    // var response = new HttpResponseMessage();
    // response.Content =  new StringContent(File.ReadAllText(path));
    // response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
    // return response;

    }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            Console.WriteLine(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

    }
}
