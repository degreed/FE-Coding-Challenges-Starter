using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DadJokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokesController : ControllerBase
    {

        public JokesController()
        {

        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(JokesResponse))]
        public IActionResult Search(string term)
        {
            // NOTE: this code should be replaced with a way to search for dad jokes utilizing https://icanhazdadjoke.com/

            var fakeJokes = new JokesResponse
            {
                ShortJokes = new List<Joke> { new Joke { Id = "short-1", Text = $"a fake short joke with term={(string.IsNullOrEmpty(term) ? "empty" : term)}" } },
                MediumJokes = new List<Joke> { new Joke { Id = "medium-1", Text = $"a fake joke of slightly longer length to make it a medium joke with term={(string.IsNullOrEmpty(term) ? "empty" : term)}" } },
                LongJokes = new List<Joke> { new Joke { Id = "long-1", Text = $"a fake joke of really long length with lots of extra words that don't really do anything beside turn it into a long joke with term={(string.IsNullOrEmpty(term) ? "empty" : term)}" } },
            };

            return Ok(fakeJokes);
        }

        [HttpGet("random")]
        [ProducesResponseType(200, Type =typeof(Joke))]
        public IActionResult GetRandom()
        {
            // NOTE: this code should be replaced with a way to get a random dad joke utilizing https://icanhazdadjoke.com/

            var fakeJoke = new Joke
            {
                Id = "random-1",
                Text = "A not so random joke."
            };

            return Ok(fakeJoke);
        }
    }
}
