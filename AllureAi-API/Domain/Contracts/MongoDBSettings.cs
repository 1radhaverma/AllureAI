namespace AllureAi_API.Domain.Contracts
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string ProductsCollectionName { get; set; } = string.Empty;
        public string UsersCollectionName { get; set; } = string.Empty;

    }
}
