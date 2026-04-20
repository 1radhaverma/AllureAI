using AllureAi_API.Domain.Contracts;

namespace AllureAi_API.Services
{
    public interface IAuthServices
    {
        Task<AuthResponseDto> RegisterAsync(RegisterUserDto dto);
        Task<AuthResponseDto> LoginAsync(LoginUserDto dto);
        Task<AuthResponseDto> OAuthLoginAsync(OAuthLoginDto dto);
    }
}
