namespace DadJokes.Web
{
    public class JokesResponse
    {
        public List<Joke> ShortJokes { get; set; } = new List<Joke>();

        public List<Joke> MediumJokes { get; set; } = new List<Joke>();

        public List<Joke> LongJokes { get; set; } = new List<Joke>();
    }
}
