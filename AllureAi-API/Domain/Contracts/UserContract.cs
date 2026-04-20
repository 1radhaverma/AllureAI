namespace AllureAi_API.Domain.Contracts
{
    public class RegisterUserDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginUserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
    }

    // Payload the frontend sends after a successful Google/Apple OAuth sign-in.
    // The backend trusts the provider-verified email, upserts the user, and issues its own JWT.
    public class OAuthLoginDto
    {
        public string Provider { get; set; } = string.Empty; // "google" or "apple"
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string ProviderUserId { get; set; } = string.Empty;
    }
}
