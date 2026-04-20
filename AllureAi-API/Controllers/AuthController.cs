using AllureAi_API.Domain.Contracts;
using AllureAi_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AllureAi_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AuthController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        // POST /api/auth/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            try
            {
                var result = await _authServices.RegisterAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST /api/auth/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDto dto)
        {
            try
            {
                var result = await _authServices.LoginAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // POST /api/auth/oauth
        // Bridge endpoint: the frontend does Google/Apple OAuth via Supabase,
        // then sends the user profile here so the backend can issue ITS OWN JWT
        // tied to the user record in the Azure SQL database.
        [HttpPost("oauth")]
        [AllowAnonymous]
        public async Task<IActionResult> OAuth([FromBody] OAuthLoginDto dto)
        {
            try
            {
                var result = await _authServices.OAuthLoginAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET /api/auth/me  — requires a valid JWT in the Authorization header
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
                        ?? User.FindFirst("email")?.Value;
            var fullName = User.FindFirst("fullName")?.Value;
            return Ok(new { email, fullName });
        }
    }
}
